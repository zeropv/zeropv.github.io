
$(document).ready(function() {
	$(".fancybox").fancybox();
	
	$('.jcarousel1')
    	.jcarousel({
    		wrap: 'both'
    	})
    	.jcarouselAutoscroll({
            interval: 3000,
            target: '+=1',
            autostart: true
        });
    
    // Controls
    $('.jcarousel-prev')
    	.jcarouselControl({
        	target: '-=1'
    	});
    $('.jcarousel-next')
    	.jcarouselControl({
        	target: '+=1'
    	});
    $('.jcarousel-end')
    	.jcarouselControl({
        	target: '+=6',
        	event: 'mouseover'
    	});
	$('.jcarousel-pagination')
		.jcarouselPagination({
        	item: function(page) {
            	return '<a href="#' + page + '">' + page + '</a>';
        	}
    	});
	

	$('select').wSelect();
	$('#demo, #demo-multi')
		.change(function() {
        	console.log($(this).val());
        });
	$('#demo').val('AU').change(); // should see in console
    $('#demo').val('PL').wSelect('change'); // should see the selected option change to three
    $('#demo').append('<option value="US" data-icon="img/wselect/US.png">United States of America</option>').wSelect('reset');
    $('#demo').val('CA').change();
        
  	$('input.checkbox-test9').wCheck({theme: 'square-inset red', selector: 'square-dot-red', highlightLabel: true});
    $('input.checkbox-test10').wCheck({theme: 'square-inset green', selector: 'square-dot-green', highlightLabel: true});
    $('input.checkbox-test11').wCheck({theme: 'square-inset blue', selector: 'square-dot-blue', highlightLabel: true});
    $('input.checkbox-test12').wCheck({theme: 'square-inset yellow', selector: 'square-dot-yellow', highlightLabel: true});  

});




