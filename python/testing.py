import sys
from controller import Polargraph

def main():
  # Assemble a Polargraph object, load a file, open the comms port.
  print "OK COOL"
  polargraph = Polargraph()
  print(polargraph.ready)

if __name__ == "__main__":
  print len(sys.argv)
  main()
