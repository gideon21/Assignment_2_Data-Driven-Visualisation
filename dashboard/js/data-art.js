var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


    
    

function init(){
   
// Fetch API
fetch("https://covid-193.p.rapidapi.com/statistics?country=uk", {
	"method": "GET", // Using (GET) to retrieve information
	"headers": {
		"x-rapidapi-host": "covid-193.p.rapidapi.com", //Host of the data
		"x-rapidapi-key": "9c2ce150b7msh9711c5a992a4626p1d8f05jsn57ef9a2b3e9e" //Key authentication to access the data
	}

})
.then (response => {

    if(!response.ok){
        throw Error("ERROR");
    }
    return response.json();
    
})
.then(data => {
    console.log(data.response);
    let country = data.response.map(statistics =>{return `${statistics.country}`; })
    let cases_new = data.response.map(statistics =>{return `${statistics.cases.new}`; })
    let cases_active = data.response.map(statistics =>{return `${statistics.cases.active}`; })
    let cases_critical = data.response.map(statistics =>{return `${statistics.cases.critical}`; })
    let cases_recovered = data.response.map(statistics =>{return `${statistics.cases.recovered}`; })
    let cases_total = data.response.map(statistics =>{return `${statistics.cases.total}`; })
    let deaths_total = data.response.map(statistics =>{return `${statistics.deaths.total}`; })
    let deaths_new = data.response.map(statistics =>{return `${statistics.deaths.new}`; })
    let tests_total = data.response.map(statistics =>{return `${statistics.tests.total}`; })
    let day = data.response.map(statistics =>{return `${statistics.day}`; })
    let d = new Date(day)
    
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = d;
    document.getElementById("date-container").innerText = today.toLocaleDateString("en-UK", options);
    
    //console.log(today.toLocaleDateString("en-US")); // 9/17/2016
    console.log(today.toLocaleDateString("en-UK", options)); // Saturday, September 17, 2016
   

    //init data
    var json = {
        "id": "347_0",
        "name": "Covid-19 ("+country+")",
        "children": [ {
            "id": "Deaths",
            "name": "Deaths",
            "data": {
                "band": "Covid-19 (UK)",
                "relation": "corona virus"
            },
            "children": [{
                "id": "Deaths_New",
                "name": "New",
                "data": {
                    "band": "Deaths",
                    "relation": "corona virus"
                },
                "children": [
                    {
                        "id": "Deaths_Count",
                        "name": deaths_new,
                        "data": {
                            "band": "Cases",
                            "relation": "Covid-19 Deaths"
                        },
                        "children": []
                    }
                ]
            }, {
                "id": "Deaths_Total",
                "name": "Total",
                "data": {
                    "band": "Deaths",
                    "relation": "corona virus"
                },
                "children": [
                    {
                        "id": "Deaths_Number",
                        "name": deaths_total,
                        "data": {
                            "band": "Cases",
                            "relation": "Covid-19 Deaths"
                        },
                        "children": []
                    }
                ]
            }]
        }, {
            "id": "Cases_11",
            "name": "Cases",
            "data": {
                "band": "Covid-19 (UK)",
                "relation": "corona virus"
            },
            "children": [{
                "id": "Cases_12",
                "name": "New",
                "data": {
                    "band": "Cases",
                    "relation": "corona virus"
                },
                "children": [{
                    "id": "Child_12",
                    "name": cases_new,
                    "data": {
                        "band": "Cases",
                        "relation": "Covid-19 Cases"
                    },
                    "children": []
                }

                ]
            }, {
                "id": "Cases_13",
                "name": "Total",
                "data": {
                    "band": "Cases",
                    "relation": "corona virus"
                },
                "children": [
                    {
                        "id": "Child_13",
                        "name": cases_total,
                        "data": {
                            "band": "Cases",
                            "relation": "Covid-19 Cases"
                        },
                        "children": []
                    }
                ]
            }]
        },
        {
            "id": "Tests",
            "name": "Tests",
            "data": {
                "band": "Covid-19 (UK)",
                "relation": "corona virus"
            },
            "children": [
                {
                    "id": "Tests_Total",
                    "name": tests_total,
                    "data": {
                        "band": "Tests",
                        "relation": "corona virus"
                    },
                    "children": []
                }
            ]
        }, 
    {
            "id": "Day",
            "name": "Day",
            "data": {
                "band": "Covid-19 (UK)",
                "relation": "corona virus"
            },
            "children": [{
                "id": "Day_Date",
                "name": today.toLocaleDateString("en-UK", options),
                "data": {
                    "band": "Day",
                    "relation": "corona virus"
                },
                "children": []
            }]
        }],
        "data": []
    };
    
    //end
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth - 50, h = infovis.offsetHeight - 50;
    
    //init Hypertree
    var ht = new $jit.Hypertree({
      //id of the visualization container
      injectInto: 'infovis',
      //canvas width and height
      width: 500,
      height: 500,
      //Change node and edge styles such as
      //color, width and dimensions.
      Node: {
          dim: 9,
          color: "#f00"
      },
      Edge: {
          lineWidth: 2,
          color: "#088"
      },
      onBeforeCompute: function(node){
          Log.write("Centering <i class='fa fa-spinner fa-spin'></i>");
      },
      //Attach event handlers and add text to the
      //labels. This method is only triggered on label
      //creation
      onCreateLabel: function(domElement, node){
          domElement.innerHTML = node.name;
          $jit.util.addEvent(domElement, 'click', function () {
              ht.onClick(node.id, {
                  onComplete: function() {
                      ht.controller.onComplete();
                  }
              });
          });
      },
      //Change node styles when labels are placed
      //or moved.
      onPlaceLabel: function(domElement, node){
          var style = domElement.style;
          style.display = '';
          style.cursor = 'pointer';
          if (node._depth <= 1) {
              style.fontSize = "0.8em";
              style.color = "#ddd";

          } else if(node._depth == 2){
              style.fontSize = "0.7em";
              style.color = "#555";

          } else {
              style.display = 'none';
          }

          var left = parseInt(style.left);
          var w = domElement.offsetWidth;
          style.left = (left - w / 2) + 'px';
      },
      
      onComplete: function(){
          Log.write("Done <i class='fa fa-check-circle'></i>");
          
          //Build the right column relations list.
          //This is done by collecting the information (stored in the data property) 
          //for all the nodes adjacent to the centered node.
          var node = ht.graph.getClosestNodeToOrigin("current");
          var html = "<h4>" + node.name + "</h4><b>Connections:</b>";
          html += "<ul>";
          node.eachAdjacency(function(adj){
              var child = adj.nodeTo;
              if (child.data) {
                  var rel = (child.data.band == node.name) ? child.data.relation : node.data.relation;
                  html += "<li>" + child.name + " " + "<div class=\"relation\">(relation: " + rel + ")</div></li>";
              }
          });
          html += "</ul>";
          $jit.id('inner-details').innerHTML = html;
      }
    });
    //load JSON data.
    ht.loadJSON(json);
    //compute positions and plot.
    ht.refresh();
    //end
    ht.controller.onComplete();
}) //end
}


document.addEventListener('DOMContentLoaded', (event) => {
    init();
  })
 