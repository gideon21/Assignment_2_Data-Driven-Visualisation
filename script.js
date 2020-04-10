
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
    
}).then(data => {
    console.log(data.response);
    const html = data.response.map(statistics =>{
return `
        <div class="statistics">

        <p class="ctry">Country: ${statistics.country}</p>
        <p>Date: ${statistics.day}</p>
      
         </div>


        <p>New: ${statistics.cases.new} | Active: ${statistics.cases.active} | Critical: ${statistics.cases.critical} | Recovered: ${statistics.cases.recovered}</p>
        
`;
        
    })
    .join("");
    console.log(html);
    document.querySelector('#country').insertAdjacentHTML("afterbegin", html);
})
    
    
    
.catch(error =>{
    console.log(error);
});

