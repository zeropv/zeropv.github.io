$(function(){

$('.fancybox').fancybox();

var myCarousels = $('.jcarousel').jcarousel();
// debugger
		myCarousels.each(function(key,value){
			console.log(key);
			$(value).jcarousel('scroll', '+=' + key);
			// var instance = $(value).data('jcarousel');
			// instance.scroll('+=1');
		});

		
		
        $('[data-jcarousel]').each(function() {
            var el = $(this);
            el.jcarousel(el.data());
        });

 

var words = ['Sport and Activity',
		   'Wellness and Health',
		   'Extreme Sports and Expeditions',
		   'Games',
		   'Culture and Education',
		   'Relaxation',
		   'Traveling'];

var search;
function getImages(search){
	if (!(search)){
		search = words[_.random(0,6)];
	}
	$.ajax({
		type: "GET",
		url: "http://api.pixplorer.co.uk/image?amount=7&word="+ search +"&size=l",
		dataType: "json",
		cache: false,
		success: function(data){
			// console.log(data);
			
			var htmlTemplate = $('#ideas-template').html();
			var content = _.template(htmlTemplate);

			var imgArr = _.flatten(_.map([data],'images'));
			// console.log(imgArr);
			 
			$('.grid-item').remove();
			 
			_.forEach(imgArr,function(value,key){
			 	// debugger		 
			 	$('.grid').after(content(value));
			});
			
			var $grid = $('.grid');
 			$grid.imagesLoaded().progress( function() {
 			$grid.isotop({
	  			itemSelector: '.grid-item',
	  			layoutMode: 'fitRows'
	  			// percentPosition: true
	  			// columnWidth: '.grid-sizer'
			});
 });  

			
		},
		error: function(){console.log('ajax query error')}
	});
}

$( '.btn-search' ).on( 'click', function ( e ) {
        e.preventDefault();
        var query = $( '.input-search' );
        getImages( encodeURIComponent(query.val()));
        // query.val( '' );
 		} 
 );
$('.input-search' ).on( 'keypress', function ( e ) {
        // e.preventDefault();
         if (!e) e = window.event;
    		var keyCode = e.keyCode || e.which;
    		if (keyCode == '13'){
      			// Enter pressed
	        // var query = $(this);
	        getImages( encodeURIComponent($(this).val()));
      		return false;
    		}
        // query.val( '' );
 		} 
 );



var timerId = setInterval(function(){
	getImages($('.input-search').val());
	},100000);
 getImages();
});