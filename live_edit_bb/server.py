from flask import Flask, render_template, url_for, request, session
import json
app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/items")
def items():
    items = [{'id':1, 'name':'item1', 'value':'test'}, {'id':2, 'name':'item2', 'value':'test'}, {'id':3, 'name':'item3', 'value':'test'}]
    return json.dumps(items)

@app.route("/items/<id>")
def item(id):
    return "fetch item " + id

if __name__ == '__main__':
    app.debug = True
    app.secret_key = "veryverysecret"
    app.run()