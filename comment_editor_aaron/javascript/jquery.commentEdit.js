(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jQuery', 'Underscore', 'Backbone'], factory);
	} else {
		factory(jQuery, _, Backbone);
	}
}(function($, _, Backbone) {
	$.fn.commentEdit = function() {
		var PROPS = "commentEdit";
		var NO_ITEMS_TEXT = "Click to add comment(s) ...";
		var ITEMS_TEXT = " Comment(s)";
		var NEW_ITEM_TEXT = "<span style='font-style: italic;'>Add Comment</span>";
		var keys = {
				Tab: 9,
				Esc: 27,
				Enter: 13,
				UpArrow: 38,
				DownArrow: 40
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

			var new_comment = {
				'text': NEW_ITEM_TEXT,
				'label': $('<span class="label">' + NEW_ITEM_TEXT + '</span>'),
				'input': $('<input class="add-comment" value="" />'),
				'id': id
			}

			new_comment.label.click(function(event) {
				var $this = $(this);
				var parent = $this.parent();
				$this.remove();
				parent.append(new_comment.input);
				new_comment.input.focus();
			});

			new_comment.input.keydown(function(event) {
				if (event.which == keys.Esc) {
					var $this = $(this);
					var parent = $this.parent();
					$this.remove();
					parent.append(new_comment.label);

					if('' == new_comment.input.val()){
						new_comment.label.html(NEW_ITEM_TEXT);
					} else {
						new_comment.label.html(new_comment.input.val());
					}
				} else if (event.which == keys.UpArrow){
					alert('up');
				} else if (event.which == keys.DownArrow){
					alert('down');
				}
			});

			comments.push(new_comment);

			$this.html('');
			$this.data(PROPS).comments = comments;
		}

		function buildLabel($this) {
			var text, container, label, arrow;
			
			if ($this.data(PROPS).comments.length == 0) {
				text = NO_ITEMS_TEXT;
			} else {
				text = $this.data(PROPS).comments.length - 1 + ITEMS_TEXT;
			}
			
			var comment_div, text_span, arrow_span;

			comment_div = $('<div class="content"></div>');
			text_span = $('<span class="summary">'+text+'</span>');
			arrow_span = $('<span class="arrow">da</span>');

			text_span.append(arrow_span);
			comment_div.append(text_span);

			$this.append(comment_div);

			container = $('div.content', $this);
			label = $('span.summary', $this);
			arrow = $('span.arrow', $this);

			$this.data(PROPS).container = container;
			$this.data(PROPS).labelc = label;
			$this.data(PROPS).arrow = arrow;
		}

		function buildComments($this) {
			var div = $("<div class='' style='display: none'></div>");
			var list = $("<ul></ul>");

			div.append(list);

			var componentId = $this.data(PROPS).componentId;
			var item_label;

			$.each($this.data(PROPS).comments, function(i, item) {
				var li = $('<li id="c' + componentId + 'i' + i + '"></li>');
				list.append(li);
				li.append(item.label);
			});

			$this.append(div);
			$this.data(PROPS).editor = div;
		}

		function bindEvents($this) {
			var $label;

			$label = $this.data(PROPS).labelc;

			$label.click(function(event) {

				$edit_div = $this.data(PROPS).editor;
				$arrow_div = $this.data(PROPS).arrow;
				
				if($edit_div.is(':visible')){
					$arrow_div.html("da");
					$edit_div.toggle();
				} else {
					$arrow_div.html("ua");
					$edit_div.toggle();
				}
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
			buildComments($this);
			bindEvents($this);
		});
	}
}));