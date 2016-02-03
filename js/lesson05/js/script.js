var timer = { 
	minsElem : document.querySelector('.mins'),
	secsElem : document.querySelector('.secs'),
	msecsElem : document.querySelector('.msecs'),
	timerCount : document.querySelector('.timer-count'),
	roundElemBox:document.querySelector('.round-box'),
	
	startBtnElem : document.getElementById('start-btn'),
	stopBtnElem : document.getElementById('stop-btn'),
	clearBtnElem : document.getElementById('clear-btn'),
	roundBtnElem : document.getElementById('round-btn'),

	timerId: null,
	hours: 0,  
	mins: 0,
	secs: 0,
	msecs: 0,
	round:0,
	getTimerString:function(){
		var myHours, myMins,mySecs,myMsecs;
		(timer.hours < 10) ? (myHours = '0'+ timer.hours):(myHours = timer.hours);
		(timer.mins < 10) ? (myMins = '0' + timer.mins):(myMins = timer.mins);
		(timer.secs < 10) ? (mySecs = '0' + timer.secs):(mySecs = timer.secs);
		(timer.msecs < 10) ? (myMsecs = '0' + timer.msecs):(myMsecs = timer.msecs);
		return (myHours + ':'+ myMins + ':' + mySecs + ':' + myMsecs + '0');
	},
	run: function(){
			timer.msecs++;
			if (timer.msecs >= 100) {timer.secs++; timer.msecs = 0};
			if (timer.secs >= 60) {timer.mins++; timer.secs = 0};
			if (timer.mins >= 60) {timer.hours++; timer.mins = 0};
			timer.renderTimer();
		},
	
	renderTimer: function(){
		
		timer.timerCount.innerHTML = timer.getTimerString();
	},
	startTimer: function(){
		var self = this;
		// debugger
		timer.timerId = setInterval(timer.run,10);
		this.disabled = true;
	},
	stopTimer: function(){
		timer.startBtnElem.disabled = false;
		clearInterval(timer.timerId);
	},
	clearTimer: function(){
		with (timer){
			hours=0;
			mins=0;
			secs=0;
			msecs=0;
			roundElemBox.innerHTML='';
			renderTimer();
		}
	},

	roundTimer: function(){
		timer.round++;
		timer.roundElemBox.innerHTML+='<div>round ' + timer.round +' : '+ timer.getTimerString() + '</div>';


	}
};

timer.startBtnElem.addEventListener('click', timer.startTimer);
timer.stopBtnElem.addEventListener('click', timer.stopTimer);
timer.clearBtnElem.addEventListener('click', timer.clearTimer);
timer.roundBtnElem.addEventListener('click', timer.roundTimer);