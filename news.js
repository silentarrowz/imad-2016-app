window.onload = function(){
var displayNews = document.getElementById('currentNews');
var newsButton = document.getElementById('getnews');
newsButton.onclick = function(){
	alert('the button is clicked');
	var newsxr = new XMLHttpRequest();
	newsxr.onreadystatechange = function(){
		if(newsxr.readyState ===XMLHttpRequest.DONE && newsxr.status ===200){
			var currentNews = JSON.parse(newsxr.responseText);
			var currentArticles = currentNews['articles'];
			var numberArticles = currentNews['articles'].length;
			var newsDisplay ='';
			var author;
			var title;
			var description;
			var urlToImage;
			for(var i=0;i<numberArticles;i++){
				author = currentArticles[i]['author'];
				title = currentArticles[i]['title'];
				description = currentArticles[i]['description'];
				urlToImage = currentArticles[i]['urlToImage'];
				 newsDisplay = newsDisplay + "<p>"+"<span class='title'>"+  title+"</span>"+  "<br>"+description+"<br>"+"<img src='"+urlToImage+"'</img>"+"</p>";
			}
			alert('displaying the news now');
			console.log('current news is : ',currentNews);
			displayNews.innerHTML = newsDisplay;
		}
	};//on state change

	newsxr.open('GET','https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=1af110441a8e4f72925f78344e58c2a4',true);
	newsxr.send(null);
};//button onclick function ends

};// window onclick function ends
