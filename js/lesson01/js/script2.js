alert ('second part of homework');
var n = 5;
var names = [];
var isRegistered = false;
var msg, str;
for (var i=0; i<n; i++){
	msg="Input name #"+ (i+1);
	str = prompt(msg);
	names.push(str);
}
var userName;
userName = prompt("Log in:");
i=0;
while ((i<n) && (!isRegistered)){
	// debugger;
	isRegistered = (names[i] == userName);
	i++; 

}
if (isRegistered) {
	msg = userName.toUpperCase() + ", you have been succesfull loggining...";
	alert (msg);
} else{
	msg = userName.toUpperCase() + ", you are not registered! Access denied.";
	alert (msg);
}