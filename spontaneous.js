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

    players.push(player(10, 750, 650, Math.random()*2, Math.random()*2, "#01fffc"));
    players.push(player(10, 50, 50, Math.random()*2, Math.random()*2, "#ff00e7"));
    players.push(player(10, 750, 50, Math.random()*2, Math.random()*2, "red"));
    players.push(player(10, 50, 650, Math.random()*2, Math.random()*2, "white"));
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

    var tails = [];
    var spacing = 0;
    vimg.appendChild(head);

    var inc = function(){
    	x += dx;
    	y += dy;
    	var speed = dx * dx + dy * dy;
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
	    tail.setAttribute("r", r);
	    tail.setAttribute("fill",c);
	    tail.setAttribute("stroke","black");

	    vimg.appendChild(tail);
	    tails.push(tail);
	    if(tails.length>50){
	    	vimg.removeChild(tails[0]);
	    	tails.shift();
	    }}
    }
    var detect = function(){
    	for(i=0;i<pivots.length;i++){
    		var px = pivots[i].getAttribute("cx");
    		var py = pivots[i].getAttribute("cy");
    		var d = dist(x,px,y,py);
    		var inRange = [];
    		console.log(y);
    		if(d<=150){
    			inRange.push(pivots[i]);
    		}
    		else{
    			inRange.splice(pivots[i]);
    		}
    		var pMin;
    		for(j=0;j<inRange.length;j++){
    			if (!pMin||inRange[j].getAttribute("cx")<pMin.getAttribute("cx"))
    				pMin = inRange[j];
    		}
    		if(pMin){
    			pMin.setAttribute("fill",c);
    		}
    	}
    }

    return{
    	inc:inc,
    	detect:detect
    }
}

var move = function(){
	for(k=0;k<pivots.length;k++){
		pivots[k].setAttribute("fill","#9ffd1c");
	}
	for(k=0;k<players.length;k++){
		players[k].inc();
		players[k].detect();
	}

}

makeLv1()
var intervalID;
intervalID = setInterval(move,5);
