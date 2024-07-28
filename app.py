from flask import Flask, render_template, Response
from flask_cors import CORS
from attention_functions import generate_frames


app = Flask(__name__)
CORS(app)

@app.route('/video')
def video():
    return Response(generate_frames(), mimetype='text/event-stream')

if __name__ == "__main__":
    app.run(debug=True)
