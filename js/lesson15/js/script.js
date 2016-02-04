function GoogleCallback (func, data) {
    window[func](data);
}
$(function(){

var $searcher = $('.searcher');
var $tmplHtml = $('#results').html();
var $resultOutput = $('.results-box');
var ajaxQuery = function (k){
	var $text = $('#search-input');

	var url ='http://ajax.googleapis.com/ajax/services/search/web';
	var query = '&q=' + encodeURIComponent('test');
	// var query='';
	// var key = '&key=' + 'ABQIAAAACKQaiZJrS0bhr9YARgDqUxQBCBLUIYB7IF2WaNrkYqF0tBovNBQFDtM_KNtb3xQxWff2mI5hipc3lg';
	// var key='';
	 // var myUrl = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0' + key + query +'&callback=GoogleCallback&context=?';
	 // var myUrl = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&key=ABQIAAAACKQaiZJrS0bhr9YARgDqUxQBCBLUIYB7IF2WaNrkYqF0tBovNBQFDtM_KNtb3xQxWff2mI5hipc3lg&rsz=8&start=0&q=test&callback=?context=?';
	
	var url = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&key=ABQIAAAACKQaiZJrS0bhr9YARgDqUxQBCBLUIYB7IF2WaNrkYqF0tBovNBQFDtM_KNtb3xQxWff2mI5hipc3lg&rsz=8&start=' + k*8 + '&q='+ encodeURIComponent($text.val()) + '&callback=GoogleCallback&context=?';
		$.ajax({
			url: url,
			dataType: "jsonp",
			// data:{q:'test'},
			success: function(data) {
				console.log(data);
				data.results.forEach(function(obj){
					var $resultRow = tmpl($tmplHtml,obj);
					$resultOutput.append($resultRow);

				});
			}
			
		});	
};

$searcher.submit(function(e) {
    e.preventDefault();
    ajaxQuery(0);
});

})