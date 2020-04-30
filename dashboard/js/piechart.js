  // Fetch the dataset from api
  fetch("https://covid-193.p.rapidapi.com/statistics?country=uk", {
    "method": "GET", // Using (GET) to retrieve information
    "headers": {
        "x-rapidapi-host": "covid-193.p.rapidapi.com", //Host of the data
        "x-rapidapi-key": "9c2ce150b7msh9711c5a992a4626p1d8f05jsn57ef9a2b3e9e" //Key authentication to access the data
    }

})
.then(response => {

    if (!response.ok) {
        throw Error("ERROR");
    }
    return response.json();

}).then(data => {



    const html = data.response.map(statistics => {


        })
        .join("");

    //returned JSON data - to be used for live chart
    let country = data.response.map(statistics => {
        return `${statistics.country}`;
    })
    let cases_new = data.response.map(statistics => {
        return `${statistics.cases.new}`;
    })
    let cases_active = data.response.map(statistics => {
        return `${statistics.cases.active}`;
    })
    let cases_critical = data.response.map(statistics => {
        return `${statistics.cases.critical}`;
    })
    let cases_recovered = data.response.map(statistics => {
        return `${statistics.cases.recovered}`;
    })
    let cases_total = data.response.map(statistics => {
        return `${statistics.cases.total}`;
    })
    let deaths_total = data.response.map(statistics => {
        return `${statistics.deaths.total}`;
    })
    let deaths_new = data.response.map(statistics => {
        return `${statistics.deaths.new}`;
    })
    let tests_total = data.response.map(statistics => {
        return `${statistics.tests.total}`;
    })
    let day = data.response.map(statistics => {
        return `${statistics.day}`;
    })

    var tx = 'Cases in the ' + country + ' (COVID-19) ' + day;

  // var newTitle = () => {
    document.getElementById("pieTitle").innerHTML = tx;
   //}



    //pie chart
    const ctx = document.getElementById("myChart").getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['New', 'Critical'],
            datasets: [{
                data: [cases_new, cases_critical],
                backgroundColor: [
                    "#00b300",
                    "#d21243"
                ],
                borderColor: "#fff"
            }]
        },
        options: {

            title: {
                display: false,
                text: 'Cases in the ' + country + ' (COVID-19) ' + day,
                fontSize: 20
            },

            tooltips: {
                enabled: true
            },
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        let datasets = ctx.chart.data.datasets;
                        if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                            let sum = datasets[0].data.reduce((a, b) => a + b, 0);

                        }
                    },
                    color: '#fff',
                }
            }


        }

    });
})
