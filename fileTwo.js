/**
 * @author Prem Khanal
 */

var tableURL = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1Au1IPB-eyi1a6DhXaNJVJGNJEXtbAdZDSWU1TIQk+WHERE+DATE>=";

var myKey = "&key=AIzaSyDKXOjTWWXFQlzg_fSmdUNjpsaj-RM0ofA";



/* This is my new function to introduce the latestData
 *
 */
function latestData(mnewJobData) {

	console.log(mnewJobData);

	/*This is google array to data table by putting the name of the function and data list
	 *
	 */




	var googleDataSource = new google.visualization.DataTable();

	/*The follwoing are goign to be my first and second elements of hrader of the chart as 0 represetns date and 1 represents value.
	 *
	 */

	googleDataSource.addColumn('string'), mnewJobData.columns[0];
	googleDataSource.addColumn('number'), mnewJobData.columns[1];
	googleDataSource.addColumn({type:'string', role:'tooltip', 'p' :{'html': true}});
	
	
	
	googleDataSource.addRows(mnewJobData.rows);

	/*TThis the command to create option objects to deternine the look of my chart
	 *
	 */

	var option = {
		title : "Worsening unemployment, few options on the table",
		height:400,
		width:800,
		tooltip: {isHtml: true}
	};

	/* this is the google visualization line chart command
	 *
	 */

	var myMarchData = new google.visualization.LineChart(document.getElementById("dataBankDiv"));

	myMarchData.draw(googleDataSource, option);

}


/*
 * e is my click event it will use its target property ti get the id of the div
 */
function buttonHandler(e) {


	var myID = e.target.id;
	var myYearArray = myID.split("_");
	
	/*Split it in an array on equal sign; one on the left of the sign andother other on the right, and "2008" will be second item
	 * 
	 */
	var myYear = myYearArray[1]; // get the year

	$.get(tableURL + "'"+myYear+"-01-01'"+myKey, latestData, "json");
	console.log(myYear);
	
	/*
	 * This the title of the page and these are the codes to interprate the Url so as to desplay the Url in a way that I like
	 */
	
	History.pushState({year:myYear}, "Unemployment data - "+myYear, "?year="+myYear);

}

/** Here is the command to define the new callback fountion named "chartData" and the console.log function will chekc whether it
 * is workng properly. To CHeck, we have to go to the html page opened with Firefox and see in the console where I should be
 * able to see the "show my databak" */

function mchartData() {
	console.log("hi");

//is there somethin in the URL that specifies a particular year 

	var myURL = History.getState().cleanUrl;
	
	
	var queryArray = myURL.split("?"); //split the URL in question mark 
	
	var defaultYear = "1990";
	
	if(queryArray.length >1){
		//get the queryy string and break it on equals and take the right half 
		
		defaultYear = queryArray[1].split("=")[1];
		
		
	}
	
	
	
	$('.btn-success').on("click", buttonHandler);
	//grab the botom with id that is year _ "default year"
	
	$("#year_"+defaultYear).click();

	console.log("show my beautiful chart");

	/*Now I am loading the get function which unlike in the past will help me to get the external data that I have saved in my desktop folder.
	 *
	 */

	/* Now I am loading the get function, a function that will take the data that we load in the json file. I am also introducting
	 * a new callback called latestData and "json" as my another parameter. Though we had an employment data starting from 1948, we
	 * used the WHERE+DATA>= to tell the computer that I my have data only after 2000 in my chart.
	 */

	$.get(tableURL + "'2000-12-01'" + myKey, latestData, "json");

}

/*This the local file where I have stored the data.
 *
 */

function mdataSource() {

	console.log("This is my new page");

	/*Here I work with google chart loading fucntion. This is also the place where I am loading the google viz. library.
	 *
	 */

	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : "mchartData"

	});

}

/* Docment ready function and mdataSource is the name of my callback. */
$(document).ready(mdataSource);
