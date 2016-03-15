$(document).ready(function(){

	console.log('script1.js');
	// debugger
    var carousel = $('.jcarousel');
    carousel.jcarousel({
    		wrap: 'circular'
    	}).jcarouselAutoscroll({
            interval: 10000,
            target: '+=1',
            autostart: true
        });
$('.jcarousel-pagination')
	.jcarouselPagination({
        item: function(page) {
            console.log(page);
            return '<a href="#' + page + '">' + page + '</a>';
        }
    })
	.on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
    .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
    .jcarouselPagination();
  



    
  var allPanels = $('.accordion > dd').hide();
    
  $('.accordion > dt > a').click(function() {
    // debugger
    
    if ($(this).is(".active")){
    	$(this).toggleClass("active");
    	allPanels.slideUp();
    	return false;	

		}
    	allPanels.parent().find('.active').removeClass('active');
		allPanels.slideUp();
		$(this).toggleClass("active");
		$(this).parent().next().slideDown();

    // $(this).addClass('active');
    return false;
  });



});