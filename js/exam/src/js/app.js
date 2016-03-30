$(function(){


var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true,
  columnWidth: '.grid-sizer'
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});  

var search;
function getImages(search){
	$.ajax({
		type: "GET",
		url: "http://api.pixplorer.co.uk/image?amount=17&word="+ search +"&size=l",
		dataType: "json",
		success: function(data){
			console.log(data);
			// var htmlTemplate = $('#ideas-template').html();
			var imgArr = _.flatten(_.map([data],'images'));
			console.log(imgArr);
			 $('.grid-item').remove();
			 var content = _.template('<div class="grid-item">'+
			 	'<img src="<%= imageurl %>">'+
			 	'</div>');

			 _.forEach(imgArr,function(value,key){
			 	
			 	$('.grid-sizer').after(content(value));
			 });

			
		},
		error: function(){console.log('ajax query error')}
	});
}
 $( '.btn-search' ).on( 'click', function ( e ) {
        e.preventDefault();
        var query = $( '.input-search' );
        getImages( encodeURIComponent( query.val() ) );
        query.val( '' );
    } );

getImages(search);
});