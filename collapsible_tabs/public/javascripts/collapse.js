(function($){
	$.fn.makeCollapsable = function() {
		function setTopHeight(){
			$('#scrollable_top').height($(window).height() - $('#bottom_container').height() - 10);
		}

		function collapse($container, $tabs){
			if($container.is(":visible"))
				$container.slideDown('slow');
			else
				$container.slideUp('slow');

			$tabs.toggle();

			setTopHeight();

			$('#scrollable_top').jScrollPane();
		}

		$(window).resize(
			function(){
				setTopHeight();
			}
		)

		setTopHeight();

		return this.each(
			function(){
				var $this = $(this);
				var $button = $this.find('#action_button');
				var $container = $this.find('#bottom_container');
				var $tabs = $this.find('#collapsable');

				$button.click(
					function(){
						collapse($container, $tabs);
						setTopHeight();
					}
				)
			}
		)
	}
})(jQuery);