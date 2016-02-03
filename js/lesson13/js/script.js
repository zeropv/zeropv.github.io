$(function(){
'use strict';
var dataList=[
  { 
    qTitle:"Вопрос 1",
    qId:1,
    answerList:[
      { 
        aTitle:"answer text 1",
        isCorrect:1,
        aId:1
      },
      {

        aTitle:"answer text 2",
        isCorrect:0,
        aId:2
      },
      { 
        aTitle:"answer text 3",
        isCorrect:0,
        aId:3
      }
    ]
  },
  { 
    qTitle:"Вопрос 2",
    qId:2,
    answerList:[
      { 
        aTitle:"answer text 4",
        isCorrect:1,
        aId:4
      },
      {
        aTitle:"answer text 5",
        isCorrect:0,
        aId:5
      },
      { 
        aTitle:"answer text 6",
        isCorrect:0,
        aId:6
      }
    ]
  },
  { 
    qTitle:"Вопрос 3",
    qId:3,
    answerList:[
      { 
        aTitle:"answer text 7",
        isCorrect:1,
        aId:7
      },
      {

        aTitle:"answer text 8",
        isCorrect:0,
        aId:8
      },
      { 
        aTitle:"answer text 9",
        isCorrect:0,
        aId:9
      }
    ]
  }
  ];

var dataListStr = JSON.stringify( dataList );
localStorage.setItem( "test", dataListStr );

// and retrieving it

var localDataStr = localStorage.getItem( "test" );
var objDataList = JSON.parse( localDataStr );

var $htmlBlock = $('#template1').html();
var htmlContent = tmpl( $htmlBlock,{data:dataList} );

var $qForm = $( '#testform' );
$qForm.prepend( htmlContent );


var $checkbx = $('input:checkbox');
$checkbx.on( 'click', function(){
    $( this ).parent().siblings().find( 'input:checkbox' ).attr( 'disabled',this.checked );

})
function checkResults() {
var checkboxCount = 0;
var answerList = [];
var rightAnswer = 0;
var invalidAnswer = 0;
var flag = true;

function showModal(){
     var $body = $('body');
    var $modalEl = $('<div>');
    $modalEl.attr('class','modal')
    var totalAnswer = rightAnswer + invalidAnswer;
    var modalContent = 
      '<div class="modal-inner"><p>Total answers = ' + totalAnswer + '</p>'+
      '<p>Correct answer is '+rightAnswer+'</p>'+
      '<p>Incorrect answer is '+invalidAnswer+'</p>'+
      '</div>';
    $modalEl.html(modalContent);
    $modalEl.on('click',function(){
      $('input:checkbox').prop('checked',false).prop('disabled',false);
      $(this).remove();
    })

    $body.prepend($modalEl);
  }

  for (var i = 0; i < dataList.length; i++){
    for (var j = 0; j < dataList[i].answerList.length; j++){
         //console.log ('answer[',i,',',j,']:',dataList[i].answerList[j].isCorrect);
         //console.log ($checkbx.eq(checkboxCount).is(':checked'));
        if ( (dataList[i].answerList[j].isCorrect)  == ($checkbx.eq(checkboxCount).is(':checked')) ){
            answerList.push(1);            
          } else {
            answerList.push(0);
            flag = false;
          }
        checkboxCount++;
    }
    (flag) ? rightAnswer++:invalidAnswer++;
  }
  
showModal();

}
$( '#checkBtn' ).on( 'click',checkResults );
});