

function IsNumeric(input)
{
    return (input - 0) == input && (''+input).trim().length > 0;
}
function pow (a,b) {
var result=1;
	for (var i = 1; i <= b; i++){
		// debugger;
		result *= a;
	}
	console.log ('The result of num POW exp is:', result);
}
alert ('first part of homework...');
var num, exp;
console.log(IsNumeric(12));
do{
	num = prompt ('Enter the Number:');
}
while(!IsNumeric(num));
	
do{
	exp = prompt ('Enter the Exponent:');
}
while(!IsNumeric(num));
pow (num, exp);
