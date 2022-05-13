// 参考博客：http://www.demodashi.com/demo/13031.html
var canvas = document.getElementById('canvas');
var width = 400;
var height = 400;
var ctx = canvas.getContext('2d');
var lineNums = 50;
var innerLineNums = 75;
var process = 10;
var activeProcess = 0;
var moveDotProcess = 0;
var deg1 = (Math.PI * 12) / (9 * lineNums);
var colorLineNums = process / 2
var radius = 82;
var angle = deg1 * process / 2;
var duration = 2000;
var colorArr = ['#2196F3', '#9C27B0', '#F44336'];
var tickColorArr = []
var tickColor = '#9b9db7'
var timer
 //色彩段数与彩色刻度条保持一致,线条无间隔,所以段数 * 2
var gradient = ctx.createLinearGradient(0, 0, (radius + 45) * 2, 0);
gradient.addColorStop("0", colorArr[2]);
gradient.addColorStop("0.5", colorArr[1]);
gradient.addColorStop("1.0", colorArr[0]);

function drawInner() {
  ctx.save(); 
  for (var i = 0; i <= innerLineNums; i++) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(155,157,183,1)';               
      ctx.moveTo(radius, 0);
      ctx.lineTo(radius - 2, 0);
      ctx.stroke();
      //每个点的弧度,360°弧度为2π,即旋转弧度为 2π / 75
      ctx.rotate(2*Math.PI / innerLineNums);
  }                      
  ctx.restore();

  //lineNums 灰色长刻度条数量
  ctx.save(); 
  for (var i = 0; i <= lineNums; i++) {
    var is_on = (((i - 1) / lineNums) * 100 < activeProcess - 1);
    var color = getTickColor(is_on, i);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.moveTo(radius + 8, 0);
    ctx.lineTo(radius + 35, 0);
    ctx.stroke();
    //每个点的弧度,360°弧度为2π,即旋转弧度为 2π / 75
    ctx.rotate(2*Math.PI / innerLineNums);
  }                      
  ctx.restore();

  // 内环刻度线
  ctx.save();
  for (var i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = tickColor;
      ctx.moveTo(radius, 0);
      ctx.lineTo(radius - 4, 0);
      ctx.stroke();

      //每10个点分一个刻度,共5个刻度,旋转角度为deg1 * 10
      ctx.rotate(deg1 * 10);
  }
  ctx.restore();

  //内环刻度上面数字
  ctx.save();
  ctx.rotate(Math.PI / 2);
  for (i = 0; i < 6; i++) {
      ctx.fillStyle = 'rgba(165,180,198, .4)';
      ctx.font = '10px Microsoft yahei';
      ctx.textAlign = 'center';
      ctx.fillText(20 * i, 0, -65);
      ctx.rotate(deg1 * 10);
  }
  ctx.restore();

  //内环文字
  ctx.save();
  ctx.rotate(210 * Math.PI / 180);
  ctx.fillStyle = '#000';
  ctx.font = '44px Microsoft yahei';
  ctx.textAlign = 'center';
  ctx.textBaseLine = 'top';
  ctx.fillText(process, 0, 10);
  var width = ctx.measureText(process).width;

  ctx.fillStyle = '#000';
  ctx.font = '20px Microsoft yahei';
  ctx.fillText('分', width / 2 + 10, 10);
  ctx.restore();
}

function drawLine() {
  //外环渐变线
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = gradient;
  ctx.arc(0, 0, radius + 45, 0, activeProcess / 2 * deg1, false);
  ctx.stroke();
  ctx.restore();
}

function drawEndPoint(beginX, beginY) {  
  // 终点
  ctx.save();
  ctx.rotate(activeProcess / 2 * deg1);
  ctx.beginPath();
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.arc(radius + 45, 0, 5, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(246, 5, 51, 1)";
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = 'rgba(246, 5, 51, 1)';
  ctx.arc(radius + 45, 0, 3, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.restore();
}

function drawMoveDot() {
  ctx.save();
  ctx.beginPath();
  ctx.rotate(moveDotProcess / 2 * deg1);
  ctx.fillStyle = 'rgb(3 169 244 / 30%)';
  ctx.arc(radius, 0, 5, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.restore();
}

function render(percent) {
  ctx.restore();
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(150*Math.PI/180);
  drawInner();
  drawLine();
  drawMoveDot();
  drawEndPoint();
  ctx.restore();
}

function start() {
  var lastUpdate = +new Date();
  var start = activeProcess;
  var end = process;
  var speed = (end - start) / duration;
  var isend = false
  tickColorArr = gradientColorArray();
  var update = function () {
    var now = +new Date();
    var elapsed = now - lastUpdate;
    moveDotProcess += elapsed * speed;
    lastUpdate = now;
    if (isend || activeProcess > process) {
      isend = true
    } else {
      activeProcess += elapsed * speed;
    }
    render();
    requestFrame(update);
  };
  requestFrame(update);
}
start()

function getTickColor(is_on, index) {
  var _index = index < 1 ? 1 : index;
  if (is_on) {
    if (tickColorArr && tickColorArr.length > 0) {
      return tickColorArr[_index-1];
    } else {
      return 'red';
    }
  } else {
    return tickColor;
  }
}

function gradientColorArray () {
  var list = []
  for(var i = 0; i < colorArr.length - 1; i++) {
    var next = colorArr[i + 1];
    var cur = colorArr[i];
    var colorStep = 12;
    list = list.concat(new gradientColor(cur, next, colorStep));
  }
  // console.log('------list', list, list.length);
  return list;
}

function gradientColor(startColor,endColor,step){
  startRGB = colorRgb(startColor);//转换为rgb数组模式
  startR = startRGB[0];
  startG = startRGB[1];
  startB = startRGB[2];
  
  endRGB = colorRgb(endColor);
  endR = endRGB[0];
  endG = endRGB[1];
  endB = endRGB[2];

  sR = (endR-startR)/step;//总差值
  sG = (endG-startG)/step;
  sB = (endB-startB)/step;

  var colorArr = [];
  for(var i=0;i<step;i++){
  //计算每一步的hex值 
     var hex = colorHex('rgb('+parseInt((sR*i+startR))+','+parseInt((sG*i+startG))+','+parseInt((sB*i+startB))+')');
     colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function colorRgb(sColor){
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  var sColor = sColor.toLowerCase();
  if(sColor && reg.test(sColor)){
     if(sColor.length === 4){
         var sColorNew = "#";
         for(var i=1; i<4; i+=1){
             sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
         }
         sColor = sColorNew;
     }
     //处理六位的颜色值
     var sColorChange = [];
     for(var i=1; i<7; i+=2){
         sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
     }
     return sColorChange;
  }else{
     return sColor;
  }
};
// 将rgb表示方式转换为hex表示方式
function colorHex(rgb){
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if(/^(rgb|RGB)/.test(_this)){
     var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g,"").split(",");
     var strHex = "#";
     for(var i=0; i<aColor.length; i++){
         var hex = Number(aColor[i]).toString(16);
         hex = hex<10 ? 0+''+hex :hex;// 保证每个rgb的值为2位
         if(hex === "0"){
             hex += hex;
         }
         strHex += hex;
     }
     if(strHex.length !== 7){
         strHex = _this;
     }
     return strHex;
  }else if(reg.test(_this)){
     var aNum = _this.replace(/#/,"").split("");
     if(aNum.length === 6){
         return _this;
     }else if(aNum.length === 3){
         var numHex = "#";
         for(var i=0; i<aNum.length; i+=1){
             numHex += (aNum[i]+aNum[i]);
         }
         return numHex;
     }
  }else{
     return _this;
  }
}

function requestFrame(f) {
  var anim = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function (callback, element) {
      window.setTimeout(function () {
        callback(+new Date);
      }, 1000 / 60);
    };
  timer = anim(f);
}

document.getElementById("clearBtn").addEventListener("click", function(){
  window.cancelAnimationFrame(timer);
  activeProcess = 0
  start()
});