window.onload = function () {
    
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title:{
       // text: "Covid-19 Deaths Within The UK"
      },
      axisX: {
        valueFormatString: "DD MMM,YY",
        labelFontColor: "#858796",
        labelFontFamily: "Verdana",
        tickLength: 15,
        lineDashType: "dot",
        lineThickness: 2,
        interlacedColor: "#F8F1E4",
        tickColor: "red"
      },
      axisY: {
        title: "Deaths From Covid-19",
        includeZero: false,
        labelFontColor: "#858796",
        labelFontFamily: "Verdana",
        titleFontFamily: "Verdana",
        titleFontColor: "#858796"
      },
      legend:{
        cursor: "pointer",
        fontSize: 14,
        fontColor: "#858796",
        fontFamily: "tahoma",
        fontweight: "normal",
        itemclick: toggleDataSeries
      },
      toolTip:{
        shared: true
      },
      data: [{
        name: "Deaths March 7th - March 31st",
        type: "spline",
        showInLegend: true,
        dataPoints: [
          { x: new Date(2020,2,7), y: 2 },
                { x: new Date(2020,2,8), y: 4 },
          { x: new Date(2020,2,9), y: 5 },
          { x: new Date(2020,2,10), y: 5 },
          { x: new Date(2020,2,11), y: 6},
          { x: new Date(2020,2,12), y: 8 },
          { x: new Date(2020,2,13), y: 11 },
          { x: new Date(2020,2,14), y: 21 },
                { x: new Date(2020,2,15), y: 35 },
          { x: new Date(2020,2,16), y: 53 },
          { x: new Date(2020,2,17), y: 69 },
          { x: new Date(2020,2,18), y: 104 },
          { x: new Date(2020,2,19), y: 137 },
          { x: new Date(2020,2,20), y: 167 },
          { x: new Date(2020,2,21), y: 233 },
                { x: new Date(2020,2,22), y: 281},
          { x: new Date(2020,2,23), y: 335},
          { x: new Date(2020,2,24), y: 422},
          { x: new Date(2020,2,25), y: 463},
          { x: new Date(2020,2,26), y: 578},
          { x: new Date(2020,2,27), y: 769},
          { x: new Date(2020,2,28), y: 1019},
                { x: new Date(2020,2,29), y: 1228},
          { x: new Date(2020,2,30), y: 1408},
                { x: new Date(2020,2,31), y: 1789},
        ]
      },
      {
        name: "Deaths in April 1st - April 28th",
        type: "spline",
        showInLegend: true,
        dataPoints: [
          { x: new Date(2020,3,1), y: 2352 },
          { x: new Date(2020,3,2), y: 2921},
          { x: new Date(2020,3,3), y: 3600},
          { x: new Date(2020,3,4), y: 4313},
          { x: new Date(2020,3,5), y: 4934},
          { x: new Date(2020,3,6), y: 5373},
          { x: new Date(2020,3,7), y: 6159},
                { x: new Date(2020,3,8), y: 7097},
          { x: new Date(2020,3,9), y: 7978},
          { x: new Date(2020,3,10), y: 8958},
          { x: new Date(2020,3,11), y: 9875},
          { x: new Date(2020,3,12), y: 10612},
          { x: new Date(2020,3,13), y: 11329},
          { x: new Date(2020,3,14), y: 12107},
                { x: new Date(2020,3,15), y: 12868},
          { x: new Date(2020,3,16), y: 13729},
          { x: new Date(2020,3,17), y: 14576},
          { x: new Date(2020,3,18), y: 15468},
          { x: new Date(2020,3,19), y: 16060},
          { x: new Date(2020,3,20), y: 16509},
          { x: new Date(2020,3,21), y: 17337},
                { x: new Date(2020,3,22), y: 17500},
          { x: new Date(2020,3,23), y: 18000},
          { x: new Date(2020,3,24), y: 19506},
              { x: new Date(2020,3,25), y: 20319},
              { x: new Date(2020,3,26), y: 20732},
              { x: new Date(2020,3,27), y: 21578},
                { x: new Date(2020,3,28), y: 22268},
                { x: new Date(2020,3,29), y: 22279},
        ]
      },
      {
      }]
    });
    chart.render();
    
    function toggleDataSeries(e){
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      }
      else{
        e.dataSeries.visible = true;
      }
      chart.render();
    }
    
    }