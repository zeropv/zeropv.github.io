var data={
    "Вопрос №1":{
      "Вариант ответа №1":{},
      "Вариант ответа №2":{},
      "Вариант ответа №3":{},
    },
    "Вопрос №2":{
      "Вариант ответа №4":{},
      "Вариант ответа №5":{},
      "Вариант ответа №6":{},
    },
    "Вопрос №3":{
      "Вариант ответа №7":{},
      "Вариант ответа №8":{},
      "Вариант ответа №9":{},
    }
}

function isObjectEmpty(myObj){
  for (key in myObj){
    return false;
  }
  return true;
}
function createTree(myContainer, myObj){
  
  if (isObjectEmpty(myObj)) return; //выход из функц
  var ul = document.createElement('ul');
  myContainer.appendChild(ul);
  for (var key in myObj){
    var li = document.createElement('li');
    var text = document.createTextNode(key);
    li.appendChild(text);
    ul.appendChild(li);
    if ( typeof myObj[key] == 'object' && !isObjectEmpty(myObj[key])){
        createTree(li, myObj[key]);  
    }
  }
}


var titleBox = document.createElement('div');
titleBox.className='titleBox';
var title = document.createTextNode("Тест по программированию:");
titleBox.appendChild(title);
document.body.appendChild(titleBox);


var container = document.getElementById('container');
container.className ='questBox';


var form = document.createElement("FORM");
    form.setAttribute("action", "#");


createTree(container,data);

var lis = container.getElementsByTagName('li');
var index = 0;
// console.log(lis.length);
// debugger;
for (var i = 0; i<lis.length; i++){
  var childCount=lis[i].getElementsByTagName('li').length;
  
  if (childCount) {
    index++;
    lis[i].innerHTML = index + '. ' + lis[i].innerHTML;
  } else {
    var x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");
    x.setAttribute("class", "check");

    lis[i].insertBefore(x,lis[i].firstChild);
  }

}

var btnSubmit = document.createElement("INPUT");
    btnSubmit.setAttribute("type", "submit");
    btnSubmit.setAttribute("class", "btnSubmit");
    btnSubmit.setAttribute("value", "Проверить мои результаты")
   
 var submitBox = document.createElement('div');
  submitBox.className='submitBox';
  submitBox.appendChild(btnSubmit);
  
  form.appendChild(container);
  form.appendChild(submitBox);
 
document.body.appendChild(form);