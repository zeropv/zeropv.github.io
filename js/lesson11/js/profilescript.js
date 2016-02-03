$(function(){
	var html = $('#profile').html();
	var info = {
		userfullname: 'Наливанный Павел Викторович',
		fotopath: 'img/foto1.jpg',
		ocupation: 'Инженер по техническому обслуживанию',
		phone: '+38063222333223',
		motivation: ['закрепить практические навыки в верстке',
		 	'сменить род деятельности',
		 	'иметь возможность работать в IT-сфере',
		 	'увеличить свой доход'],
		socialnets: [
		 	{
		 		netName:'Facebook',
		 		profilePath:'fb.com/paul.nalivanniy'
		 	},
		 	{
		 		netName:'ВКонтакте',
		 		profilePath:'vk.com/zeropv'
		 	}
		]
		
	};
	var content = tmpl (html, info);
	// debugger
	$('body').append(content);

})