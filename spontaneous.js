
var vimg = document.getElementById("vimg")
var makeP1 = function(){
    var p1 = document.createElementNS("http://www.w3.org/2000/svg","circle")

    p1.setAttribute("cx", 750);
    p1.setAttribute("cy", 650);
    p1.setAttribute("r", 10);
    p1.setAttribute("fill","red");
    p1.setAttribute("stroke","black");

    vimg.appendChild(p1);
}

console.log(makeP1())
