window.onload = function(){
var displayNews = document.getElementById('currentNews');
var sportsButton = document.getElementById('sports');
var politicsButton = document.getElementById('current');
var financeButton = document.getElementById('finance');

sportsButton.onclick = buttonClick('sports'); //this gets called onload


//this will get called on click
sportsButton.onclick = function(){
	buttonClick('sports');
}
//this will get called on click
politicsButton.onclick = function(){
buttonClick('politics');
}

//this will get called on click
financeButton.onclick = function(){
 buttonClick('finance');
}
/*
newsButton.onclick = function(){
	var newsxr = new XMLHttpRequest();
	newsxr.onreadystatechange = function(){
		if(newsxr.readyState ===XMLHttpRequest.DONE && newsxr.status ===200){
			var currentNews = JSON.parse(newsxr.responseText);
			var doc = currentNews.response.docs;
			var docslength = doc.length;
			var headline;
			var mainLead;
			var imageUrl='';
			console.log('docslength is : ',docslength);
			
			console.log('news is : '+doc[0].headline.main+doc[0]['lead_paragraph']);
			console.log('current news is : ',currentNews);
			var newsDisplay ='';
			for(var i=0;i<docslength;i++){
				headline = doc[i].headline.main;
				mainLead = doc[i]['lead_paragraph'];
				if(doc[i].multimedia.length===3){
					imageUrl ='http://www.nytimes.com/'+ doc[i].multimedia[0].url;
					newsDisplay = newsDisplay + "<p>" +"<img src='"+imageUrl+"'</img>"+"<br>"+ "<span class='title'>"+  headline+"</span>"+  "<br>"+mainLead+"<br>" +"</p>";
				}else{
			newsDisplay = newsDisplay + "<p>" + "<span class='title'>" +  headline+"</span>"+  "<br>"+mainLead +"</p>";	
				 }
			}//for loop ends

			displayNews.innerHTML = newsDisplay;
			
		}//if block ends
	};//on state change

	newsxr.open('GET','http://api.nytimes.com/svc/search/v2/articlesearch.json?q=sports&page=2&sort=newest&api-key=1a246f14cd594927b5290af9a9e2a3ca',true);
	newsxr.send(null);
};//button onclick function ends
*/

function buttonClick(topic){
	var newsxr = new XMLHttpRequest();
	newsxr.onreadystatechange = function(){
		if(newsxr.readyState ===XMLHttpRequest.DONE && newsxr.status ===200){
			var currentNews = JSON.parse(newsxr.responseText);
			var doc = currentNews.response.docs;
			var docslength = doc.length;
			var headline;
			var mainLead;
			var imageUrl='';
			console.log('docslength is : ',docslength);
			
			console.log('news is : '+doc[0].headline.main+doc[0]['lead_paragraph']);
			console.log('current news is : ',currentNews);
			var newsDisplay ='';
			for(var i=0;i<docslength;i++){
				headline = doc[i].headline.main;
				mainLead = doc[i]['lead_paragraph'];
				if(doc[i].multimedia.length===3){
					imageUrl ='http://www.nytimes.com/'+ doc[i].multimedia[0].url;
					newsDisplay = newsDisplay + "<p>" +"<img src='"+imageUrl+"'</img>"+"<br>"+ "<span class='title'>"+  headline+"</span>"+  "<br>"+mainLead+"<br>" +"</p>";
				}else{
			newsDisplay = newsDisplay + "<p>" + "<span class='title'>" +  headline+"</span>"+  "<br>"+mainLead +"</p>";	
				 }
			}//for loop ends

			displayNews.innerHTML = newsDisplay;
			
		}//if block ends
	};//on state change

	newsxr.open('GET','http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+topic+'&page=2&sort=newest&api-key=1a246f14cd594927b5290af9a9e2a3ca',true);
	newsxr.send(null);
};//button onclick function ends

};//window onload function ends