import os
import serial
import time

import sys

BAUD_RATE = 57600

class Polargraph():
  """
  This is a crude model of a drawing machine. It includes it's drawing state
  as well as the state of the communications lines to the machine and the
  queue of commands going to it.
  """

  def __init__(self):
    self.time_started = time.time()

  serial_port = None
  file = None

  # State
  ready = False
  file_position = 0
  total_lines = 0¡

  def start_serial_comms(self, comm_port, baud_rate=57600):
    """
    Attempts to connect this machine to it's comm_port. It starts two
    threads, one for reading that is attached to the 'received_log'
    list, and one thread for writing that is attached to the main outgoing
    command queue.
    :param comm_port: The name of the comm port
    :param baud_rate: The speed to open the serial connection at
    :return:
    """
    try:
      self.serial_port = serial.Serial(comm_port, baudrate=baud_rate)
      print "Connected successfully to %s (%s)." % (comm_port, serial)
      return True

    except Exception as e:
      print("Oh there was an exception loading the port %s: %s" %(comm_port, e))
      print e.message
      self.serial_port = None
      return False

  def load_file(self, filename):
    """
    Checks that the file exists, opens it and counts the lines in it.
    :param filename:
    :return:
    """

    if os.path.isfile(filename):
      print "Found %s!" % os.path.abspath(filename)
      self.file = open(filename, 'r')

      # Lets have a quick review of this file
      lines = 0
      for lines, l in enumerate(self.file):
        pass
      self.total_lines = lines + 1
      print "This file has %s lines." % self.total_lines

      # reset the file position
      self.file.seek(0)
    else:
      self.file = None
      print "File %s couldn't be found!" % os.path.abspath(filename)

  def read_line(self):
    l = self.serial_port.readline().strip()
    print "received: {:s}".format(l)
    if l.startswith("READY"):
      # if it's changing from not ready to ready, then it's just finished a command
      if not self.ready and self.file_position > 0:  # ie it's not the first one
        time_ran = time.time() - self.time_started
        time_per_command = time_ran / (self.file_position)
        time_projected = self.total_lines * time_per_command
        time_left = time_projected - time_ran

        m, s = divmod(time_left, 60)
        h, m = divmod(m, 60)
        d, h = divmod(h, 24)

        print "Ran {:d} commands in {:0.2f} seconds: " \
          "at {:0.2f} seconds per command, we'll finish in {:02d}:{:02d}:{:02d})".format(self.file_position,
          time_ran,
          time_per_command,
          int(h), int(m), int(s))

        self.ready = True

  def write_line(self):
    if self.ready and self.file:
      l = self.file.readline().strip()
      self.file_position += 1
      print "Command {}/{}: {} ({:.0%})".format(self.file_position, self.total_lines, l, (float(self.file_position) / float(self.total_lines)))
      self.serial_port.write(l + "\n")
      self.ready = False

  def commands_queued(self):
    return self.total_lines - self.file_position

  def close(self):
    print "Finished sending {:d} commands in {:0.2f}".format(self.total_lines, time.time() - self.time_started)
    self.file.close()
