# I'm importing numpy just to make sure dependencies will work


import json
import numpy

# Recieve a message from the nodejs parent process
# and parse the json to a dictionary


def recieve():
    data = input()
    return json.loads(data)

# Parse 'data' to json and send to the parent process


def emit(data):
    print(json.dumps(data))


message = recieve()
message['text'] = message['text'].upper()
emit(message)
