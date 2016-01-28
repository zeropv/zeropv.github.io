$(function(){


function switchTab(e){
	var index = $(this).index();
	$tabContent.hide();
	$tabButtons.removeClass('active');
	$tabContent.eq(index).show();
	$tabButtons.eq(index).addClass('active');
	console.log($(this).index());
	return false;
};
function showTips(){
	var $tipDiv = $(this).next('.tip');
	$tipDiv.remove();
	$(this).after('<span class="tip">' + $(this).attr("title") + '</span>');
	$tipDiv = $(this).next('.tip');
	$tipDiv.stop(true,true).animate({opacity:"1"},1000);
};
function hideTips(){
	var $tipDiv = $(this).next('.tip');
	$tipDiv.stop(true).animate({opacity:"0"},"slow");
	$tipDiv.remove();
}
function btnShowHelp(){
	$('input[type=text]').each(hideTips);
	$('input[type=text]').each(showTips);
}
	var $tabButtons = $('.tab');
	var $tabContent = $('.tab_content');
	var $inputText = $('input[type=text]');
	$tabContent.hide();
	$tabContent.first().show();
	$tabButtons.first().addClass('active');
	$tabButtons.on('click',switchTab);
	$inputText.hover(showTips,hideTips);
	$("button").click(btnShowHelp);

})