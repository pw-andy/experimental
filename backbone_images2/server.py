from flask import Flask, render_template, url_for, request, session
import json
app = Flask(__name__)

@app.before_first_request
def init():
	session.permanent = True
	session['next_id'] = 1
	session['image'] = {
		"id": session['next_id'],
		"thumbnail_url":"http://i.imgur.com/RW2k9.jpg",
		"delete_url":"http://i.imgur.com/RW2k9.jpg",
		"small_url":"http://i.imgur.com/RW2k9.jpg",
		"orderIndex":1,
		"delete_type":"DELETE",
		"name": "default" + str(session['next_id']),
		"type":"",
		"url":"/images/" + str(session['next_id']),
		"size":43340
	}
	session['images'] = [session['image']]
	session.modified = True

@app.route("/")
def index():
	return render_template('index.html')

@app.route("/images", methods=['GET'])
def images_get():
	return json.dumps(session['images'])

@app.route("/images", methods=['POST'])
def images_post():
	i = request.files["files[]"]
	new_images = []
	new_image = session['image'].copy();
	session['next_id']+=1
	new_image["id"] = session['next_id']
	new_image["name"] = i.filename + str(session['next_id'])
	new_image["url"] = "/images/" + str(session['next_id'])
	session['images'].append(new_image)
	session.modified = True
	new_images.append(new_image)
	return json.dumps(new_images)

@app.route("/images/<id>", methods=['DELETE'])
def images_delete(id):
	id = int(id)
	to_remove = None
	for img in session['images']:
		if img["id"] == id:
			to_remove = img
			break

	if to_remove:
		session['images'].remove(to_remove)
		session.modified = True
	
	return ""

@app.route("/images/<id>", methods=['PUT'])
def images_update(id):
	id = int(id)
	for img in session['images']:
		if img["id"] == id:
			img["name"] = request.json["name"]
			session.modified = True
	
	return "";

if __name__ == '__main__':
	app.debug = True
	app.secret_key = "veryverysecret"
	app.run()