$(document).ready(function() {  
  var boxTemplate =  $('.box-container').find('.box').prop('outerHTML');
  function setupView(num){
    $('#set_box').val(num);
    $('.box-container').empty();
    for (var i = 0; i < num; i++) {
       $('.box-container').append(boxTemplate);
    }
  };
  
  $('#btn_play').click(function(){
    setupView($('#set_box').val());
    start(0);
  });
  
  $('#btn_stop').click(function(){
    console.log(intervalIds);
    for(var i=0; i<intervalIds.length; i++){
      clearInterval(i);
    }
  });
  
  var intervalIds = [];
  
  function start(inx){
    if(inx<$('.box-container').find('.box').length){
      setTimeout(function(){
        var ant = new animateTheNumber($('.box:eq('+inx+')').find('span'), 700+inx*1000, 700+inx*100, 700, 1000);
        intervalIds.push(ant.start());
        inx++;
        start(inx);
      },500);
    }
  };
  
  setupView(3);
  start(0);
  
  function updateNumber(obj, fn, sn) {
    $(obj).text(addComma(fn) + ' / ' + addComma(sn));
  }

  function animateTheNumber(updateObj, total, destNum, startNum, animateDuration) {
    var frames = 20,
            setAnimateDuration = Math.round(+animateDuration / frames),
            incN = Math.round(+destNum / frames);
    if (incN < 1) {
      incN = 1;
    }
    updateNumber(updateObj, startNum, total);
    this.start = function() {
      var animatePoints = setInterval(function() {
        if (startNum > Number(destNum)) {
          startNum = Number(destNum);
          updateNumber(updateObj, startNum, total);
          clearInterval(animatePoints);
          console.log('clear->'+Number(animatePoints));
        } else {
          incPoints();
        }
      }, setAnimateDuration);
      function incPoints() {
        startNum = startNum + incN;
        updateNumber(updateObj, startNum, total);
      }
      return animatePoints;
    };
  }

  function addComma(takeNumber) {
    var rst = takeNumber.toString();
    var p = 0;
    var splice = function(text, insertAt, rem, s) {
      return (text.slice(0, insertAt) + s + text.slice(insertAt + Math.abs(rem)));
    };
    for (var i = (rst.length); i > 0; i--) {
      p++;
      if (p === 3 && i > 1) {
        rst = splice(rst, (i - 1), 0, ',');
        p = 0;
      }
    }
    return rst;
  }
});
