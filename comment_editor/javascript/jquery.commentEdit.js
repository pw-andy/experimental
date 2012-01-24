(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jQuery', 'Underscore', 'Backbone'], factory);
	} else {
		factory(jQuery, _, Backbone);
	}
}(function($, _, Backbone) {


	$.fn.commentEdit = function() {
		var PROPS = "commentEdit";
		var NO_ITEMS_TEXT = "Click to add comments...";
		var ITEMS_TEXT = " comments...";
		var keys = {
				Tab: 9,
				Esc: 27,
				Enter: 13,
				UpArrow: 38
			};
		var componentId = 0
		
		function extractComments($this) {
			var comments = [];
			var id = 0;
			$('li', $this).each(function() {
				var text = $(this).html();
				var comment = {
					'text': text,
					'label': $('<span class="label">' + text + '</span>'),
					'input': $('<input class="add-comment" value="' + text + '" />'),
					'id': id
				}
				id++;
				comment.label.click(function(event) {
					var $this = $(this);
					var parent = $this.parent();
					$this.remove();
					parent.append(comment.input);
					comment.input.focus();
				});
				comment.input.keydown(function(event) {
					if (event.which == keys.Esc) {
						var $this = $(this);
						var parent = $this.parent();
						$this.remove();
						parent.append(comment.label);
						comment.label.html(comment.input.val());
					}
				});
				comments.push(comment);
			});
			$this.html('');
			$this.data(PROPS).comments = comments;
		}

		function buildLabel($this) {
			var text, container, label;
			if ($this.data(PROPS).comments.length == 0) {
				text = NO_ITEMS_TEXT;
			} else {
				text = $this.data(PROPS).comments.length + ITEMS_TEXT;
			}
			$this.append('<div class="content"><span class="label">'+text+'</span></div>');
			container = $('div.content', $this);
			label = $('span.label', $this);
			$this.data(PROPS).container = container;
			$this.data(PROPS).labelc = label;
		}

		function buildPopup($this) {
			var div = $("<div class='tooltip' style='display: none'></div>");
			var list = $("<ul></ul>");
			div.append(list);
			var componentId = $this.data(PROPS).componentId;
			$.each($this.data(PROPS).comments, function(i, item) {
				var li = $('<li id="c' + componentId + 'i' + i + '"></li>');
				list.append(li);
				li.append(item.label);
			});
			$this.append(div);
			$this.data(PROPS).popup = div;
		}

		function bindEvents($this) {
			var hideFunction;
			var $input;
			var $label;

			$this.data(PROPS).container.tooltip();
			var api = $this.data(PROPS).container.data("tooltip");
			hideFunction = api.hide;
			$label = $this.data(PROPS).labelc;

			function restore() {
				$input.remove();
				$label.show();
			}

			$label.click(function(event) {
				api.hide = function() {};
				api.show();
				$label.hide().after('<input class="add-comment" type="text" />');
				$input = $('input.add-comment', $this);
				$input.focus();

				function makeListItemEditable(comment) {
					console.log('makeListItemEditable ' + comment.id + ' ' + comment.text);
					var parent = comment.label.parent();
					comment.label.remove();
					parent.append(comment.input);
					comment.input.focus();

					function reset() {
						comment.input.remove();
						comment.label.html(comment.input.val());
						parent.append(comment.label);
					}

					comment.input.keydown(function(event) {
						if (event.which == keys.Esc) {
							reset();
						}
						if (event.which == keys.UpArrow) {
							reset();
							if (comment.id != 0) {
								makeListItemEditable($this.data(PROPS).comments[comment.id - 1]);
							} else {
								api.hide = hideFunction;
							}
						}
					});	
				}

				$input.keydown(function(event) {
					if (event.which == keys.Esc) {
						restore();
						api.hide = hideFunction;
						api.hide();
					} 
					if (event.which == keys.Enter) {//Enter
						$('ul', $this).append('<li>' + $input.val() + "</li>");
						$input.val('');
						hideFunction();
						api.show();
						$input.text('');
					}
					if (event.which == keys.UpArrow) {//Up arrow
						// Allow editing of previous items
						var items = $this.data(PROPS).comments;
						var lastcomment = items[items.length-1];
						makeListItemEditable(lastcomment);
					}
				});
				$input.blur(function(event) {
					restore();
				})
			});
		}

		function editList($this, index) {
			//Fixme
		}

		return this.each(function() {
			var $this = $(this);
			$this.data(PROPS, {'componentId': componentId});
			componentId++;
			extractComments($this);
			buildLabel($this);
			buildPopup($this);
			bindEvents($this);
		});
	}
}));