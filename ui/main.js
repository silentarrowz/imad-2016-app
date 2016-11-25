window.onload = function(){
 //commenting out the twitter code as it's not allowed in the console
//========================================================
/*
var twitterButton = document.getElementById('tweetButton');
twitterButton.onclick = function(){
    var searchFor =document.getElementById('tweetSearch');
    var searchForTerm = searchFor.value;
    console.log('search for keyword : ', searchForTerm);
var twitterxr = new XMLHttpRequest();
twitterxr.onreadystatechange = function(){
if(twitterxr.readyState ===XMLHttpRequest.DONE && twitterxr.status ===200){
    var newTweets = JSON.parse(twitterxr.responseText);
    console.log("newTweets is : ",newTweets);
    var tweetz='';
    var t;
    for(var i=0;i<newTweets.length;i++){
            t=i+1;
         tweetz=tweetz+ "<p>"+ "<span class='twitlabel'>"+ "TWEET "+t+" :"+"</span>"+ newTweets[i] + "</p>"+ "<hr>";
    }
    console.log('tweetz is : ',tweetz);
    var tweetHere = document.getElementById('tweetz');
    tweetHere.innerHTML = tweetz;
}


};//twitterxr onreadystatechange function ends

 //Make the request
         twitterxr.open('GET','http://silentarrowz.imad.hasura-app.io/t/'+searchForTerm,true);
         twitterxr.send(null);
};//twitterbutton onclick function ends
*/
//======================================================


var registerButton = document.getElementById('register_btn');
registerButton.onclick = function(){
    var request = new XMLHttpRequest();

    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE && request.status === 200){
            var data = request.responseText;
            console.log(data);
        }
    };


    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    request.open('POST','http://silentarrowz.imad.hasura-app.io/create-user',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
};

var loginButton = document.getElementById('login_btn');
loginButton.onclick = function(){
    var request = new XMLHttpRequest();

    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
          if(request.status === 200){
              console.log('user logged in');
            alert('logged in successfully');
            }else if(request.status===403){
            alert('username/password is incorrect');
            }else if(request.status===500){
            alert('something went wrong on the server');
            }  
        
         } 
    
    };


    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    request.open('POST','http://silentarrowz.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
};


};//window onload function ends


