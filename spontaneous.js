var vimg = document.getElementById("vimg")

var players = []
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

    players.push(player(10,750, 650, -1*Math.random()*2,-1* Math.random()*2, "#01fffc"));
   // players.push(player(10, 50, 50, Math.random()*2, Math.random()*2, "#ff00e7"));
   // players.push(player(10,750, 650, 5, 0, "#01fffc"));
    //players.push(player(10, 50, 650, 5, 0, "#ff00e7"));
    //players.push(player(10, 750,50, Math.random()*2, Math.random()*2, "red"));
    //players.push(player(10, 50, 650, Math.random()*2, Math.random()*2, "white"));
}

var dist = function(x1,x2,y1,y2) {
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

var player = function(r, x, y, dx, dy, c){
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
    var belowx;
    var getHead = function(){
	return head
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
		if((x+r >= 800 && dx > 0) || (x <= r && dx < 0))
		    dx *= -1;
		if((y+r >= 700 && dy > 0) || (y <= r && dy < 0))
		    dy *= -1;
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
    		if(d<=100){
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
    }

    var getAttach = function(){
	return attached
    }

    var angler = function(x, y){
	var theta = 0.0;
	console.log(x,"x");
	if (x == 0.0){
	    theta = 1.0*Math.pi/2;
	    if (y < 0.0){
		theta *= -1.0;
	    }
	}else{
	    theta = Math.atan(1.0*y / x);
	    console.log(x,"x")
	    console.log(y,"y")
	    if (x < 0){
		theta += 1.0*Math.pi/2
	    }
	}
	return theta
    }

    var spin = function(){
	console.log(close,"dadasdadadadas")
	var pX = 1.0*close.getAttribute("cx");
	var pY = -1.0*close.getAttribute("cy");

	var rvx = 1.0*x -1.0* pX;
	var rvy = -1.0*(-1.0*y -1.0* pY);
	var r = dist(rvx,0,rvy,0)
//	var theta = angler(rvx, rvy)
	var theta = Math.atan2(rvy, rvx) // + Math.PI
	console.log(Math.atan2(rvy,rvx),"atan")
	console.log(rvy)
	console.log(rvx)
	console.log(Math.pi)
	console.log(Math.PI)
	console.log(theta, "theta before inc")
	var cos_alpha = (dx * rvx + dy * rvy) /  (dist(dx,0,dy,0) * dist(rvx,0,rvy,0))
	//console.log(cos_alpha,"dhuasdbadkab")
	if (cos_alpha > 0){
	    var v = dist(dx,0,dy,0);
	    console.log(v,"speed")
	    var dtheta = v / r;

	    if ((y < pY && dx < 0) || (y > pY && dx > 0)){
		dtheta*=-1;
	
	    }
	    console.log(dtheta,"dtheta")
	    theta+=dtheta;

	    console.log(theta, "theta after inc")

	    var tmpX = r * Math.cos(theta) + 1.0*pX;
	    var tmpY = (r * Math.sin(theta) + -1.0*pY);

	    console.log(r, "r")
	    console.log(pY, "pY")
	    console.log(Math.sin(theta), "sin")
	    console.log(tmpY, "tmpY")

	    dx = (tmpX - x) 
	    dy = (tmpY - y) 
	    console.log(dx, "dx")
	    console.log(dy, "dy")
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
	spin:spin
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
		
		players[k].detect();
		collisions(players[k]);  
	    //}
	}
    
}

var draw = function(){
        if(keydown)
            players[0].attach();
        else
            players[0].detach(); 
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
	    for (i=0;i<player.getTails().length;i++){
            var Tail = player.getTails()[i];
		    vimg.removeChild(Tail);
	    }
	    players.splice(players.indexOf(player),1)
	}
    }
}

makeLv1()
var intervalID;
var button = document.getElementById("p1")
button.addEventListener("click",move)
//intervalID = setInterval(move,5);
intervalID2 = setInterval(draw,5);
var keydown = false;
document.onkeydown = function(e){

    if(e.keyCode==32){
        keydown = true;
    }
}
document.onkeyup = function(e){
    if(e.keyCode==32){
        keydown = false;
    }
}
