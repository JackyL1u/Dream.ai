from flask import Flask 

from flask_cors import CORS 

from flask_socketio import SocketIO, join_room 

app = Flask(__name__) 

cors = CORS(app) 

sio = SocketIO(app, cors_allowed_origins='*', async_mode='eventlet') 

@app.route('/', methods=['GET']) 
def index(): 
    return "Server is up" 

@sio.on('message') 
def print_message(message): 
    print(message, flush=True)
    sio.emit('message', message, room=message.get("uuid")) 


@sio.on('connect') 
def connect(auth): 
    if auth is not None: 
        uuid = auth.get("uuid") 
        join_room(uuid)

if __name__ == '__main__': 
    try: 
        sio.run(app, host='0.0.0.0', port=5001) 
    except (Exception,): 
        sio.run(app, host='0.0.0.0', port=5001, allow_unsafe_werkzeug=True) 