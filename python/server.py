from flask import (
  Flask,
  render_template,
  jsonify
)

from controller import Polargraph

polargraph = Polargraph()
polargraph.start_serial_comms(comm_port="/dev/ttyACM0")

# Create the application instance
app = Flask(__name__, template_folder="templates")

@app.after_request
def apply_caching(response):
  response.headers["X-Frame-Options"] = "SAMEORIGIN"
  return response

# Create a URL route in our application for "/"
@app.route('/')
def home():
  return jsonify({ 'data': 'ok' })

@app.route('/pen-down')
def pen_down():
  polargraph.serial_port.write("C14,END\n")
  return jsonify({ 'data': 'ok' })

@app.route('/pen-down')
def pen_down():
  polargraph.serial_port.write("C13,END\n")
  return jsonify({ 'data': 'ok' })

# If we're running in stand alone mode, run the application
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
