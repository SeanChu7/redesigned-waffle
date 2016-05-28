
var vimg = document.getElementById("vimg")
var p1 = document.createElementNS("http://www.w3.org/2000/svg","circle")
var p2 = document.createElementNS("http://www.w3.org/2000/svg","circle")

var nearP1 = []
var nearP2 = []

var makeP1P2 = function(){
    

    p1.setAttribute("cx", 750);
    p1.setAttribute("cy", 650);
    p1.setAttribute("r", 10);
    p1.setAttribute("fill","red");
    p1.setAttribute("stroke","black");

    p2.setAttribute("cx", 50);
    p2.setAttribute("cy", 50);
    p2.setAttribute("r", 10);
    p2.setAttribute("fill","blue");
    p2.setAttribute("stroke","black");

    vimg.appendChild(p1);
    vimg.appendChild(p2);
}

console.log(makeP1P2())
var pillars = []
var makeLv1 = function(){
    var x=100;
    var y=150;
    while (y < 700){
	while (x < 750){
	    var temp = document.createElementNS("http://www.w3.org/2000/svg","circle")
	
	    temp.setAttribute("cx", x);
	    temp.setAttribute("cy", y);
	    temp.setAttribute("r", 6);
	    temp.setAttribute("fill","green");
	    temp.setAttribute("stroke","black");

	    vimg.appendChild(temp);
	    pillars.push(temp)
	    x+= 200;
	    }
	y+=200;
	x=100;
    }
}
var detect = function(){
    for(i=0;i<pillars.length;i++){
	player2X=p2.getAttribute("cx")
	player2Y=p2.getAttribute("cy")

	pillarX=pillars[i].getAttribute("cx")
	pillarY=pillars[i].getAttribute("cy")

	var distance = Math.pow(Math.pow(player2X - pillarX,2)+Math.pow(player2Y - pillarY,2), .5)
	console.log(distance)
	if (distance <= 150){
	    console.log("hello")
	    pillars[i].setAttribute("fill","blue");
	    nearP2.push(pillars[i])
	}
	else{
	    if (pillars[i].getAttribute("fill") == "blue"){
		pillars[i].setAttribute("fill","green")
		nearP2.splice(pillars[i])
	    }
	}
    }
}

var intervalID;
var x = 50
var tails = []
var move = function(){
    p2.setAttribute("cx", x)
    p2.setAttribute("cy", 50)
    console.log(p2.getAttribute("cx"))
    x+=1
    if (x%4 == 0){
	var temp = document.createElementNS("http://www.w3.org/2000/svg","circle")
	temp.setAttribute("cx", x);
	temp.setAttribute("cy", 50);
	temp.setAttribute("r", 10);
	temp.setAttribute("fill","blue");
	temp.setAttribute("stroke","black");
	
	vimg.appendChild(temp)
	tails.push(temp)
    }
    if (tails.length == 20){
	vimg.removeChild(tails[0]);
	tails.shift();
    }
}

makeLv1()
intervalID = setInterval(move,5);
var intervalID2 = setInterval(detect,5);
