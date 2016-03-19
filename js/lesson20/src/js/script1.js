$(document).ready(function(){

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
		};
    	allPanels.parent().find('.active').removeClass('active');
		allPanels.slideUp();
		$(this).toggleClass("active");
		$(this).parent().next().slideDown();
        return false;
  });

function getSkills(){
  
  var skills = _.uniq(_.flatten(_.map(data,'skills')));
  return skills.sort();
};

function getNames(){
    var names = _.map(_.sortBy(data,'friends'),'name');
    return names;
}

function getFriends(){

    var friends = _.uniq(_.map(_.flatten(_.map(data,'friends')),'name'));
    return friends.sort();
}
console.log('skills are:',getSkills());
console.log('names are:',getNames());
console.log('friends are:',getFriends());
});