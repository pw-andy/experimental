var Img = Backbone.Model.extend({
	rename: function() {
		this.set({name: "renamed" + this.id});
		this.save();
	}
});

var ImgList = Backbone.Collection.extend({
	model: Img,
	url: '/images',
});

var ImgView = Backbone.View.extend({
	tagName: 'li',
	events: {
		'click span.rename': 'rename'
	},
	initialize: function() {
		_.bindAll(this, 'render', 'unrender', 'remove', 'rename');
		this.model.bind('destroy', this.unrender);
		this.model.bind('change', this.render)
	},
	render: function() {
		$(this.el).html('<span>' + this.model.get('name') + ' : ' + this.model.id + ' <span class="rename" style="cursor:pointer;">[rename]</span></span>');
		return this;
	},
	unrender: function() {
		$(this.el).remove();
	},
	rename: function() {
		this.model.rename();
	}
});

var ImgView2 = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, 'render', 'unrender', 'remove');
		this.model.bind('destroy', this.unrender);
		this.model.bind('change', this.render);
		this.parent_element = "#file_" + this.model.id;
	},
	render: function() {
		if ($(this.parent_element).length != 0) {
			$(this.parent_element).html($("#template-download-content").tmpl(this.model.toJSON()));
		} else {
			/*
			This handles the case where a new image has been uploaded. The fileupload widget creates
			a li that the view content should be put into. Unfortunately, the fileupload event that
			fires when an upload is complete fires before the li has been created. Thus we need to
			wait for it to appear before inserting the content.
			*/
			var self = this;
			$(this.parent_element).livequery(function() {
				$(self.parent_element).html($("#template-download-content").tmpl(self.model.toJSON()));
			});
		}
	},
	unrender: function() {
		$(this.parent_element).remove();
	}
})

var ImgListView = Backbone.View.extend({
	el: $('#backbone'),
	initialize: function() {
		_.bindAll(this, 'render', 'addItem');
		this.collection = new ImgList();
		var self = this;

		this.collection.fetch({success: function() {
			var fu = $('#fileupload').data('fileupload');
			fu._adjustMaxNumberOfFiles(-self.collection.models.length);
			fu._renderDownload(self.collection.toJSON())
				.appendTo($('#fileupload .files'))
				.fadeIn(function() {
					$(this).show();
				});
			self.render();
		}});
		this.collection.bind('add', this.addItem);
		this.collection.bind('remove', this.removeItem);
	},
	render: function() {
		var self = this;
		$(this.el).append("<ul></ul>");
		_(this.collection.models).each(function(item){
			this.addItem(item);
		}, this);
	},
	addItem: function(item) {
		var imgView = new ImgView({
			model: item
		});
		$('ul', this.el).append(imgView.render().el);
		var imgView2 = new ImgView2({
			model: item
		});
		imgView2.render();
	},
	removeItem: function(item) {
		item.destroy();
	}
});

var imgListView = new ImgListView();

function deleteImage(id) {
	if(confirm('Are you sure?')) {
		imgListView.collection.remove(imgListView.collection.get(id));
	}
}

$(document).ready(function() {
	$('#fileupload').fileupload({
		'dropZone': $('#media'),
		'url': '/images',
		'autoUpload': true,
		'sequentialUploads': true,
		'acceptFileTypes': /(\.|\/)(gif|jpe?g|png)$/i
	});

	$('#fileupload').bind('fileuploaddone', function(e, data) {
		for (i in data.result) {
			var image = data.result[0];
			var img = new Img(image);
			imgListView.collection.add(img);
		}
	});
});