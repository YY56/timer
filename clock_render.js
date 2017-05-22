var WINDOW_WIDTH = 2024;
var WINDOW_HEIGHT = 768;
var R = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2016,9,2,12,0,0)
// const endTime = new Date();
// endTime.setTime(endTime.getTime()+3600*1000) 
var curShowTimeSeconds = 0;

var BALLs =[];
var COLOR = ['#FFEB3B','#009688','#CDDC39','#FF9800','#9C27B0','#2196F3','#00BCD4','#795548','#9E9E9E','#E91E63']





window.onload = function () {
	//获取画布id
	var canvas = document.getElementById('canvas');
	//获取画布上下文
	var context = canvas.getContext('2d');

	WINDOW_WIDTH = document.body.clientWidth;
	WINDOW_HEIGHT = document.documentElement.clientHeight;

	MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
	R = Math.round(WINDOW_WIDTH*4/5/185)-1;
	MARGIN_TOP = Math.round(WINDOW_HEIGHT/5)







	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getCurShowTimeSeconds()

	setInterval(function(){
		render(context);
		update()
	},50)

	

}

function getCurShowTimeSeconds(){
	var curTime = new Date();
	// var ret = endTime.getTime() - curTime.getTime();
	// ret = Math.round(ret/1000)
	// return ret>=0?ret :0;
	// var ret = curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
	// return ret;
	var ret = curTime.getTime() - endTime.getTime();
	ret = Math.round(ret/1000)

	return ret;
	

}
function update(){
	var nextShowTimeSconds = getCurShowTimeSeconds();

	var nextDays=parseInt(nextShowTimeSconds/(24*3600))  

	var nextHours = parseInt((nextShowTimeSconds-nextDays*(24*3600))/3600);
	var nextMinutes = parseInt((nextShowTimeSconds-3600*nextHours-nextDays*(24*3600))/60);
	var nextSeconds = parseInt(nextShowTimeSconds%60);

	// var curHours = parseInt(curShowTimeSeconds/3600);
	// var curMinutes = parseInt((curShowTimeSeconds-3600*curHours)/60);
	// var curSeconds = parseInt(curShowTimeSeconds%60);


   var curDays=parseInt(curShowTimeSeconds/(24*3600))  
   var curHours=parseInt((curShowTimeSeconds-curDays*(24*3600))/3600)    
   var curMinutes=parseInt((curShowTimeSeconds-3600*curHours-curDays*(24*3600))/60)  
   var curSeconds=parseInt(curShowTimeSeconds%60)


	if (nextSeconds!=curSeconds) {

		if (parseInt(nextDays/100)!=parseInt(curDays/100)) {

			addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(nextDays/100))
		}
		if (parseInt(nextDays%100/10)!=parseInt(curDays%100/10)) {

			addBalls(MARGIN_LEFT+15*(R+1),MARGIN_TOP,parseInt(nextDays%100/10))
		}
		if (parseInt(nextDays%10)!=parseInt(curDays%10)) {

			addBalls(MARGIN_LEFT+30*(R+1),MARGIN_TOP,parseInt(nextDays%10))
		}


		if (parseInt(nextHours/10)!=parseInt(curHours/10)) {

			addBalls(MARGIN_LEFT+75*(R+1),MARGIN_TOP,parseInt(nextHours/10))

		}
		if (parseInt(nextHours%10)!=parseInt(curHours%10)) {
			addBalls(MARGIN_LEFT+90*(R+1),MARGIN_TOP,parseInt(nextHours%10))

		}
		if (parseInt(nextMinutes/10)!=parseInt(curMinutes/10)) {
			addBalls(MARGIN_LEFT+115*(R+1),MARGIN_TOP,parseInt(nextMinutes/10))

		}
		if (parseInt(nextMinutes%10)!=parseInt(curMinutes%10)) {
			addBalls(MARGIN_LEFT+130*(R+1),MARGIN_TOP,parseInt(nextMinutes%10))

		}
		if (parseInt(nextSeconds/10)!=parseInt(curSeconds/10)) {
			addBalls(MARGIN_LEFT+155*(R+1),MARGIN_TOP,parseInt(nextSeconds/10))

		}
		if (parseInt(nextSeconds%10)!=parseInt(curSeconds%10)) {
			addBalls(MARGIN_LEFT+170*(R+1),MARGIN_TOP,parseInt(nextSeconds%10))

		}
		curShowTimeSeconds = nextShowTimeSconds
	}
	updateBalls()



}

function updateBalls(){
	
	for(var i = 0;i<BALLs.length;i++){
		BALLs[i].x +=BALLs[i].vx;
		BALLs[i].y +=BALLs[i].vy;
		BALLs[i].vy +=BALLs[i].g;

		if (BALLs[i].y >= WINDOW_HEIGHT-R) {
			BALLs[i].y = WINDOW_HEIGHT-R;
			BALLs[i].vy = -BALLs[i].vy*0.7;

		}

	}
	var cnt = 0;
	for(var i = 0;i<BALLs.length;i++){
		if (BALLs[i].x-R>0 && BALLs[i].x+R<WINDOW_WIDTH) {
			BALLs[cnt++]=BALLs[i];
		}

	}

	while(BALLs.length>Math.min( 500,cnt)){
		BALLs.pop()
	}


}
function addBalls(x,y,num){
	for(var i =0; i<digit[num].length;i++){
		for(var j =0; j<digit[num][i].length;j++){
			if (digit[num][i][j] == 1) {
				var aball = {
					x:x+j*2*(R+1)+(R+1),
					y:y+i*2*(R+1)+(R+1),
					g:1.5+Math.random()*4,
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*5,
					vy:-6,
					color:COLOR[Math.floor(Math.random()*COLOR.length)],
				}
				BALLs.push(aball)

				

			}
		}
	}
	



}

function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)

	// var hours = parseInt(curShowTimeSeconds/3600);
	// var minutes = parseInt((curShowTimeSeconds-3600*hours)/60);
	// var seconds = parseInt(curShowTimeSeconds%60);

    

    var days=parseInt(curShowTimeSeconds/(24*3600))  
    var hours=parseInt((curShowTimeSeconds-days*(24*3600))/3600)    
    var minutes=parseInt((curShowTimeSeconds-3600*hours-days*(24*3600))/60)  
    var seconds=parseInt(curShowTimeSeconds%60)

 
    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(days/100),cxt)
    renderDigit( MARGIN_LEFT+15*(R+1) , MARGIN_TOP , parseInt(days%100/10),cxt)
    renderDigit( MARGIN_LEFT+30*(R+1) , MARGIN_TOP , parseInt(days%10),cxt)
    renderDigit( MARGIN_LEFT+45*(R+1) , MARGIN_TOP , 11,cxt)


	renderDigit( MARGIN_LEFT+75*(R+1) , MARGIN_TOP , parseInt(hours/10),cxt)
	renderDigit( MARGIN_LEFT+90*(R+1) , MARGIN_TOP , parseInt(hours%10),cxt)
	renderDigit( MARGIN_LEFT+105*(R+1) , MARGIN_TOP , 10,cxt)

	renderDigit( MARGIN_LEFT+115*(R+1) , MARGIN_TOP , parseInt(minutes/10),cxt)
	renderDigit( MARGIN_LEFT+130*(R+1) , MARGIN_TOP , parseInt(minutes%10),cxt)
	renderDigit( MARGIN_LEFT+145*(R+1) , MARGIN_TOP , 10,cxt)

	renderDigit( MARGIN_LEFT+155*(R+1) , MARGIN_TOP , parseInt(seconds/10),cxt)
	renderDigit( MARGIN_LEFT+170*(R+1) , MARGIN_TOP , parseInt(seconds%10),cxt)

	


	for(var i = 0;i<BALLs.length;i++){
		cxt.fillStyle = BALLs[i].color;
		cxt.beginPath();
		cxt.arc(BALLs[i].x,BALLs[i].y,R,0,2*Math.PI)

		cxt.closePath();
		cxt.fill()

	}


}

function renderDigit( x, y, num ,cxt){
	cxt.fillStyle = 'rgb(0,102,153)';

	for(var i =0; i<digit[num].length;i++){
		for(var j =0; j<digit[num][i].length;j++){
			if (digit[num][i][j] == 1) {
				cxt.beginPath();
				cxt.arc(x+j*2*(R+1)+(R+1),y+i*2*(R+1)+(R+1),R,0,2*Math.PI)
				cxt.closePath();
				cxt.fill()

				

			}
		}
	}

}










