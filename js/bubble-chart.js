var firstDataset = [
  {"id": 0, "name": "England", "r": 90 },
  {"id": 0, "name": "112467", "r": 30 },


  {"id": 1, "name": "Scotland", "r": 50 },
  {"id": 1, "name": "10521", "r": 30 },
 

  {"id": 2, "name": "Wales", "r": 40 },
  {"id": 2, "name": "9280", "r": 30 },

  {"id": 3, "name": "Nireland", "r": 20 },
  {"id": 3, "name": "3374", "r": 30 },

];


var width = window.innerWidth,
    height = 450;

var fill = d3.scale.category10();

var nodes = [], labels = [],
    foci = [{x: 0, y: 150}, {x: 350, y: 150}, {x: 200, y: 150}, {x: 550, y: 150}];

var svg = d3.select("#chartTwo")
    .append("svg")
    .attr("width", "100%")
    .attr("height", height)
    //.attr("domflag", '');

var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .charge(-700)
    //.chargeDistance(200)
    .gravity(0.1)
    .friction(0.8)
    .size([width, height])
    .on("tick", tick);

//var node = svg.selectAll("circle");
var node = svg.selectAll("g");

var counter = 0;

function tick(e) {
  var k = .1 * e.alpha;

  // Push nodes toward their designated focus.
  nodes.forEach(function(o, i) {
    o.y += (foci[o.id].y - o.y) * k;
    o.x += (foci[o.id].x - o.x) * k;
  });

  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

}

var updatePie = function () {

var timer = setInterval(function(){

  if (nodes.length > firstDataset.length-1) { clearInterval(timer); return;}

  var item = firstDataset[counter];
  nodes.push({id: item.id, r: item.r, name: item.name});
  force.start();

  node = node.data(nodes);

  var n = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .style('cursor', 'pointer')
      .on('mousedown', function() {
         var sel = d3.select(this);
         sel.moveToFront();
      })
      .call(force.drag);

  n.append("circle")
      .attr("r",  function(d) { return d.r; })
      .style("fill", function(d) { return fill(d.id); })

  n.append("text")
      .text(function(d){
          return d.name;
      })
      .style("font-size", function(d) {
          return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 16) + "px"; 
       })
      .attr("dy", ".35em")

  counter++;

  
}, 2300);


}

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};



function resize() {
  width = window.innerWidth;
  force.size([width, height]);
  force.start();
}

d3.select(window).on('resize', resize);

//
var updateFunction = updatePie();
var container = d3.select("body").selectAll("svg");
