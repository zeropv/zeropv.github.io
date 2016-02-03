(function($){
  $.fn.carousel = function() {	
	var $rightArrow = $('.carousel-arrow-right');
	var $leftArrow = $('.carousel-arrow-left');
	var $carouselList = $('.carousel-list');
	var currentPosition = 0;
	var positionOffset = 665;
	
	var itemsCount = $carouselList.find('li').length;
	minOffset=0;
	maxOffset = - (positionOffset*(itemsCount-1));

	
	$rightArrow.click(function() {
		// debugger;
		if (currentPosition > maxOffset){
			currentPosition -=positionOffset;
			$carouselList.animate({
				left: currentPosition + 'px'
			},500);
		};	
	});
	
	$leftArrow.click(function(){
		if (currentPosition < minOffset){
			currentPosition +=positionOffset;
			$carouselList.animate({
			left: currentPosition + 'px'
			},500);
		};
	});
  }
})(jQuery);