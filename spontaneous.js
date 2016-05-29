var vimg = document.getElementById("vimg")

var players = []
var playersc = []
var pivots = []
var makeLv1 = function(){
    var x=100;
    var y=150;
    while (y < 700){
	while (x < 750){
	    var temp = document.createElementNS("http://www.w3.org/2000/svg","circle")
	
	    temp.setAttribute("cx", x);
	    temp.setAttribute("cy", y);
	    temp.setAttribute("r", 6);
	    temp.setAttribute("fill","#9ffd1c");
	    temp.setAttribute("stroke","black");

	    vimg.appendChild(temp);
	    pivots.push(temp)
	    x+= 200;
	    }
	y+=200;
	x=100;
    }
   players.push(player(10, 50, 50, 1, 0, "#ff00e7", 125));
   players.push(player(10,750, 650, -1, 0, "#01fffc", 125));
   playersc.push(players[0]);
   playersc.push(players[1]);    
}

var makeLv2 = function(){
    var x = 250;
    var y = 350;
    for(i = 0; i < 2; i++){
    var temp = document.createElementNS("http://www.w3.org/2000/svg","circle")
    temp.setAttribute("cx", x);
    temp.setAttribute("cy", y);
    temp.setAttribute("r", 6);
    temp.setAttribute("fill","#9ffd1c");
    temp.setAttribute("stroke","black");
    vimg.appendChild(temp);
    pivots.push(temp);
    x+=300;
    }
   players.push(player(10, 50, 150, 1, 0, "#ff00e7", 300));
   players.push(player(10,750, 550, -1, 0, "#01fffc", 300));
   playersc.push(players[0]);
   playersc.push(players[1]);    
}

var makeLv3 = function(){
    var hex = [ [200,100], [600,100], [100,350],[400,350],[700,350],[200,600],[600,600]]
    for(i=0;i<hex.length;i++){
    var temp = document.createElementNS("http://www.w3.org/2000/svg","circle")
    temp.setAttribute("cx", hex[i][0]);
    temp.setAttribute("cy", hex[i][1]);
    temp.setAttribute("r", 6);
    temp.setAttribute("fill","#9ffd1c");
    temp.setAttribute("stroke","black");
    vimg.appendChild(temp);
    pivots.push(temp);
    }
   players.push(player(10, 50, 50, 1, 0, "#ff00e7", 200));
   players.push(player(10,750, 650, -1, 0, "#01fffc", 200));
   playersc.push(players[0]);
   playersc.push(players[1]);  
}

var makeLv4 = function(){
    var x = 50;
    var y = 50;
    for(i = 0; i < 15; i ++){
    var temp = document.createElementNS("http://www.w3.org/2000/svg","circle")
    temp.setAttribute("cx", x);
    temp.setAttribute("cy", y);
    temp.setAttribute("r", 6);
    temp.setAttribute("fill","#9ffd1c");
    temp.setAttribute("stroke","black");
    vimg.appendChild(temp);
    pivots.push(temp);
    x+=50
    }
    x = 50;
    y = 650;
    for(i = 0; i < 15; i ++){
    var temp = document.createElementNS("http://www.w3.org/2000/svg","circle")
    temp.setAttribute("cx", x);
    temp.setAttribute("cy", y);
    temp.setAttribute("r", 6);
    temp.setAttribute("fill","#9ffd1c");
    temp.setAttribute("stroke","black");
    vimg.appendChild(temp);
    pivots.push(temp);
    x+=50
    }
    x = 50;
    y = 100;
    for(i = 0; i < 11; i++){
    var temp = document.createElementNS("http://www.w3.org/2000/svg","circle")
    temp.setAttribute("cx", x);
    temp.setAttribute("cy", y);
    temp.setAttribute("r", 6);
    temp.setAttribute("fill","#9ffd1c");
    temp.setAttribute("stroke","black");
    vimg.appendChild(temp);
    pivots.push(temp);
    y+=50
    
    }

    x = 750;
    y = 100;
    for(i = 0; i < 11; i++){
    var temp = document.createElementNS("http://www.w3.org/2000/svg","circle")
    temp.setAttribute("cx", x);
    temp.setAttribute("cy", y);
    temp.setAttribute("r", 6);
    temp.setAttribute("fill","#9ffd1c");
    temp.setAttribute("stroke","black");
    vimg.appendChild(temp);
    pivots.push(temp);
    y+=50
    
    }
   players.push(player(10, 100, 100, 1, 0, "#ff00e7", 75));
   players.push(player(10, 650, 600, -1, 0, "#01fffc", 75));
   playersc.push(players[0]);
   playersc.push(players[1]);  

}

var makeLevel = function(){
    var rand = Math.random()*10%4;
    if(rand<1)
        makeLv1();
    else if(rand<2)
        makeLv2();
    else if(rand<3)
        makeLv3();
    else
        makeLv4();
}


var dist = function(x1,x2,y1,y2) {
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

var player = function(r, x, y, dx, dy, c, g){
	var head = document.createElementNS("http://www.w3.org/2000/svg","circle");

    head.setAttribute("cx", x);
    head.setAttribute("cy", y);
    head.setAttribute("r", r);
    head.setAttribute("fill",c);
    head.setAttribute("stroke","black");

    var line = document.createElementNS("http://www.w3.org/2000/svg","line");

    line.setAttribute("stroke","red");
    line.setAttribute("stroke-width","2");

    var close;
    var thetaset = false;
    var dtheta = 0;
    var getHead = function(){
	return head
	}
    var getLine = function(){
        return line;
    }
    var tails = [];
    var spacing = 0;
    vimg.appendChild(head);
    var getStuff = function(thing){
	return head.getAttribute(thing);
    }
    var inc = function(){
    	x += dx;
    	y += dy;
    	var speed = Math.pow(dx * dx + dy * dy,0.5);
		if((x+r >= 800 && dx > 0) || (x <= r && dx < 0)) {
            thetaset = false;
            dtheta = 0;
		    dx *= -1;
        }
		if((y+r >= 700 && dy > 0) || (y <= r && dy < 0)) {
            thetaset = false
            dtheta = 0;
		    dy *= -1;
        }
    	spacing++;
    	head.setAttribute("cx", x);
    	head.setAttribute("cy", y);
    	if(spacing%4==0){
    	var tail = document.createElementNS("http://www.w3.org/2000/svg","circle");
	    tail.setAttribute("cx", x);
	    tail.setAttribute("cy", y);
	    tail.setAttribute("r", r-2);
	    tail.setAttribute("fill",c);

	    vimg.appendChild(tail);
	    
	    tails.push(tail);
	    if(tails.length>80/speed){

	    	vimg.removeChild(tails[0]);//error
	    	tails.shift();
	    }
	}
    }
    var getTails = function(){
    	return tails;
    }
    var detect = function(){
    	for(i=0;i<pivots.length;i++){
    		var px = pivots[i].getAttribute("cx");
    		var py = pivots[i].getAttribute("cy");
    		var d = dist(x,px,y,py);
    		var inRange = [];
            var pMin;
            close = null;
    		if(d<=g){
    			inRange.push(pivots[i]);
    		}
    		else{
    			inRange.splice(pivots[i]);
    		}
    		for(j=0;j<inRange.length;j++){
    			if (!pMin||inRange[j].getAttribute("cx")<pMin.getAttribute("cx")){
    				pMin = inRange[j];
                }
    		}
            close = null;    
            if(pMin){
                pMin.setAttribute("fill",c);
                close = pMin;
            }
    	}
    }

    var attached = false
    var attach = function(){
        if(close){
            line.setAttribute('x1', close.getAttribute("cx"));
            line.setAttribute('y1', close.getAttribute("cy"));
            line.setAttribute('x2', x);
            line.setAttribute('y2', y);
            vimg.appendChild(line);

	       attached = true
	    
        }
        else{
            if(line.parentNode==vimg)
                vimg.removeChild(line);

	        attached = false

        }
    }
    var detach = function(){
        if(line.parentNode==vimg)
            vimg.removeChild(line);
        attached = false
        dtheta = 0;
        thetaset = false;
    }

    var getAttach = function(){
	return attached
    }

    var angler = function(x, y){
	var theta = 0.0;
	////console.log(x,"x");
	if (x == 0.0){
	    theta = 1.0*Math.pi/2;
	    if (y < 0.0){
		theta *= -1.0;
	    }
	}else{
	    theta = Math.atan(1.0*y / x);
	    ////console.log(x,"x")
	    ////console.log(y,"y")
	    if (x < 0){
		theta += 1.0*Math.pi/2
	    }
	}
	return theta
    }

    var spin = function(){
	//console.log(close,"dadasdadadadas")
	var pX = 1.0*close.getAttribute("cx");
	var pY = -1.0*close.getAttribute("cy");

	var rvx = 1.0*x -1.0* pX;
	var rvy = -1.0*(-1.0*y -1.0* pY);
	var r = dist(rvx,0,rvy,0)
	if (y - -1.0*pY > 0) 
	    belowx = true
	else
	    belowx = false
//	var theta = angler(rvx, rvy)
	var theta = Math.atan2(rvy, rvx) // + Math.PI
	//console.log(Math.atan2(rvy,rvx),"atan")
	//console.log(rvy)
	//console.log(rvx)
	//console.log(Math.pi)
	//console.log(Math.PI)
	//console.log(theta, "theta before inc")
	var cos_alpha = (dx * rvx + dy * rvy) /  (dist(dx,0,dy,0) * dist(rvx,0,rvy,0))
	////console.log(cos_alpha,"dhuasdbadkab")
	if (cos_alpha > 0){
        //console.log(v,"speed")
        if (!thetaset) {
	    var v = dist(dx,0,dy,0);
	    dtheta = v / r;
	    if (((x-pX > 0 && dy<0) || (x-pX < 0 && dy > 0)) || ((-1.0*y-pY > 0 && dx<0) || (-1.0*y-pY <0 && dx >0))) {
		//console.log(x)
		//console.log(pX, "REv px")
		dtheta*=-1;
	
	    }
        thetaset = true;
        }
	 //    if ((-1.0*y-pY > 0 && dx<0) || (-1.0*y-pY <0 && dx >0)) {
		// dtheta *= -1
	 //    }

	   /* if ((y-pY < 0 && dx > 0)) {
		dtheta *= -1
	    }*/
/*
	      

	    if (dtheta <0)
		dtheta*=-1*/
	    //console.log(dtheta,"dtheta")
	    theta+=dtheta;

	    //console.log(theta, "theta after inc")

	    var tmpX = r * Math.cos(theta) + 1.0*pX;
	    var tmpY = (r * Math.sin(theta) + -1.0*pY);

	    //console.log(r, "r")
	    //console.log(pY, "pY")
	    //console.log(Math.sin(theta), "sin")
	    //console.log(tmpY, "tmpY")
	       dx = (tmpX - x) 
	       dy = (tmpY - y) 
	    /*if ( y - -1.0*pY < 0) {
		if (belowx)
		    dy *= -1.0
		belowx = false
	    }
	    else
		if (!belowx)
		    dy *= -1.0
		belowx = true*/ 
	    //console.log(dx, "dx")
	    //console.log(dy, "dy")
	   // x = tmpX;
	   // y = tmpY
	}
    }

    return{
    	inc:inc,
    	detect:detect,
    	getTails:getTails,
    	getStuff:getStuff,
    	getHead:getHead,
        attach:attach,
        detach:detach,
	getAttach:getAttach,
	spin:spin,
    getLine:getLine
    }
}

var move = function(){

	for(k=0;k<pivots.length;k++){
	    pivots[k].setAttribute("fill","#9ffd1c");
	}

	for(k=0;k<players.length;k++){
	    if (players[k].getAttach()){
		players[k].spin();
	    }
	   // else{
		players[k].inc();
		if (!players[k].getAttach())
		  players[k].detect();
		collisions(players[k]);  
	    //}
	}
    
}
var isIn = function(a,b){
    for(i = 0; i < b.length; i++)
        if(a==b[i])
            return true;
    return false;
}
var draw = function(){
        if(keydown && isIn(playersc[0],players))
            playersc[0].attach();
        else if(isIn(playersc[0],players))
            playersc[0].detach(); 
        if(keydown2 && isIn(playersc[1],players))
            playersc[1].attach();
        else if(isIn(playersc[1],players))
            playersc[1].detach();
}
var broken = false
var collisions = function(player){
    
    var master = []
    var otherHeads = []
    for (i = 0; i < players.length;i++){
	other = players[i]
	if (player != other){
	    master.push.apply(master,other.getTails())
	    otherHeads.push(other);
	}
    }
    var pX = player.getStuff("cx")
    var pY = player.getStuff("cy")
    for (i = 0; i < otherHeads.length;i++){
	var shrekt = otherHeads[i]
	var shrektX = shrekt.getStuff("cx")
	var shrektY = shrekt.getStuff("cy")

	if ( dist(pX, shrektX, pY, shrektY)  <= 20){
	    
	    vimg.removeChild(player.getHead());//error
	    vimg.removeChild(shrekt.getHead());
        if(shrekt.getLine().parentNode==vimg)
            vimg.removeChild(shrekt.getLine())
        if(player.getLine().parentNode==vimg)
            vimg.removeChild(player.getLine())
	    for (i=0;i<player.getTails().length;i++){
		  
		vimg.removeChild(player.getTails()[i]);
	    }
	    
	    for (i=0;i<shrekt.getTails().length;i++){
		
		vimg.removeChild(shrekt.getTails()[i]);
	    }
	   
	    players.splice(players.indexOf(player),1)
	    players.splice(players.indexOf(shrekt),1)
	    
	}
	
    }

    for (i = 0; i < master.length; i++){
	var rekt = master[i];
	var pX = player.getStuff("cx")
	var pY = player.getStuff("cy")
	var rektX = rekt.getAttribute("cx")
	var rektY = rekt.getAttribute("cy")


	if ( dist(pX, rektX, pY, rektY)  <= 16){
        if(player.getHead().parentNode==vimg)
		  vimg.removeChild(player.getHead());//error
        if(player.getLine().parentNode==vimg)
            vimg.removeChild(player.getLine());

	    for (i=0;i<player.getTails().length;i++){
            var Tail = player.getTails()[i];
		    vimg.removeChild(Tail);
	    }
	    players.splice(players.indexOf(player),1)
	}
    }
}

makeLevel();

var intervalID, intervalID2, intervalID3;
var scored = false;
var score = function(){
    if(!scored && players.length<=1){
        if(!players[0]){
            curr = document.getElementById("p1_score")
            curr.innerHTML = parseInt(curr.innerHTML) + 1;
            curr = document.getElementById("p2_score")
            curr.innerHTML = parseInt(curr.innerHTML) + 1;
        }
        else if(players[0].getStuff("fill")=="#ff00e7"){
            if(players[0].getLine().parentNode==vimg)
                vimg.removeChild(players[0].getLine());
            curr = document.getElementById("p1_score")
            curr.innerHTML = parseInt(curr.innerHTML) + 1;
        }
        else{
            if(players[0].getLine().parentNode==vimg)
                vimg.removeChild(players[0].getLine());
            curr = document.getElementById("p2_score")
            curr.innerHTML = parseInt(curr.innerHTML) + 1;
        }
        scored = true;
        clearInterval(intervalID);
        clearInterval(intervalID2);
        clearInterval(intervalID3);
        window.setTimeout(function(){
            if(players[0]){
            vimg.removeChild(players[0].getHead());
            for(i=0;i<players[0].getTails().length;i++)
                vimg.removeChild(players[0].getTails()[i]);
            players.pop();}
            playersc.pop();
            playersc.pop();
            for(i = 0; i < pivots.length; i++)
                vimg.removeChild(pivots[i]);
            pivots=[];
            scored = false;
            makeLevel();
            intervalID = setInterval(move,5);
            intervalID2 = setInterval(draw,5);
            intervalID3 = setInterval(score,5);
            console.log("WORKS");
        },3000);
    }
}
//var button = document.getElementById("p1")
//button.addEventListener("click",move)
intervalID = setInterval(move,5);
intervalID2 = setInterval(draw,5);
intervalID3 = setInterval(score,5);
var keydown = false;
var keydown2 = false;
document.onkeydown = function(e){
    //console.log(keydown);
    if(e.keyCode==83){
        keydown = true;
    }
    if(e.keyCode==75){
        keydown2 = true;
    }
}
document.onkeyup = function(e){
    if(e.keyCode==83){
        keydown = false;
    }
    if(e.keyCode==75){
        keydown2 = false;
    }
}
