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

@app.route("/inspection")
def section():
    items1 = [{'id':1, 'name':'item1', 'value':'test'}, {'id':2, 'name':'item2', 'value':'test'}, {'id':3, 'name':'item3', 'value':'test'}]
    items2 = [{'id':4, 'name':'item4', 'value':'test'}, {'id':5, 'name':'item5', 'value':'test'}, {'id':6, 'name':'item6', 'value':'test'}]
    sections = [{'name': 'Section1', 'id':1, 'items': items1}, {'name': 'Section2', 'id':2, 'items':items2}]
    inspection = {'id':1, 'name': 'Inspection1', 'sections':sections}
    return json.dumps(inspection);

if __name__ == '__main__':
    app.debug = True
    app.secret_key = "veryverysecret"
    app.run()