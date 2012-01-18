Backbone.sync = function(method, model, options) {
	options.success();
}

var Img = Backbone.Model.extend({
	defaults: {
		id: 22512371,
		thumbnail_url: 'http://i.imgur.com/RW2k9.jpg',
		delete_url: 'http://i.imgur.com/RW2k9.jpg',
		small_url: 'http://i.imgur.com/RW2k9.jpg',
		orderIndex: 0,
		delete_type: 'DELETE',
		name: '',
		type: '',
		url: 'http://i.imgur.com/RW2k9.jpg',
		size: 43340
	}
});

var ImgList = Backbone.Collection.extend({
	model: Img
});

var ImgView = Backbone.View.extend({
	tagName: 'li',
	initialize: function() {
		_.bindAll(this, 'render', 'unrender', 'remove');
		this.model.bind('destroy', this.unrender);
	},
	render: function() {
		$(this.el).html('<span>' + this.model.get('url') + ' : ' + this.model.id + '</span>');
		return this;
	},
	unrender: function() {
		$(this.el).remove();
	}
});

var ImgListView = Backbone.View.extend({
	el: $('#backbone'),
	initialize: function() {
		_.bindAll(this, 'render', 'addItem');
		this.collection = new ImgList();
		this.collection.bind('add', this.addItem);
		this.collection.bind('remove', this.removeItem);
		this.render();
	},
	render: function() {
		$(this.el).append("<ul></ul>");
	},
	addItem: function(item) {
		var imgView = new ImgView({
			model: item
		});
		$('ul', this.el).append(imgView.render().el);
	},
	removeItem: function(item) {
		item.destroy();
	}
});

var imgListView = new ImgListView();

function deleteImage(id) {
	if(confirm('Are you sure?')) {
		$('#file_' + id).remove();
		imgListView.collection.remove(imgListView.collection.get(id));
	}
}

$(document).ready(function() {
	//var data = {"images":[{"id":22512370,"thumbnail_url":"http://i.imgur.com/RW2k9.jpg","delete_url":"http://i.imgur.com/RW2k9.jpg","small_url":"http://i.imgur.com/RW2k9.jpg","orderIndex":0,"delete_type":"DELETE","name":"","type":"","url":"http://i.imgur.com/RW2k9.jpg","size":43340}]};
	$('#fileupload').fileupload({
		'dropZone': $('#media'),
		'url': '/uploadimg',
		'autoUpload': true,
		'sequentialUploads': true,
		'acceptFileTypes': /(\.|\/)(gif|jpe?g|png)$/i
	});

	$('#fileupload').bind('fileuploaddone', function(e, data) {
		for (i in data.result) {
			var image = data.result[0];
			var img = new Img({'id': image.id});
			imgListView.collection.add(img);
		}
	});

	$.getJSON('/imgjson', function(files) {
		var fu = $('#fileupload').data('fileupload');
		fu._adjustMaxNumberOfFiles(-files.images.length);
		for (i in files.images) {
			var image = files.images[i];
			var img = new Img({'id': image.id});
			imgListView.collection.add(img);
		}
		fu._renderDownload(files.images)
			.appendTo($('#fileupload .files'))
			.fadeIn(function() {
				$(this).show();
			});
	});
});