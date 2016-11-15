window.onload = function(){
  var counter=0;
   
    var button = document.getElementById('submit_btn');
    button.onclick = function(){
    	 //counter=counter+1; this was just client side without visiting server
    	 
    	 //this is requesting server for information
    	 //Making a request to counter endpoint
    	 //Create request object
    	 var request = new XMLHttpRequest();
         var nameInput = document.getElementById('name');
         var name=nameInput.value;
         console.log('name is: ',name);
    	 //Capture the response and store it in a variable
    	 request.onreadystatechange = function(){
    	 	if(request.readyState === XMLHttpRequest.DONE){
    	 		//take some action
    	 		if(request.status ===200){
    	 			var names=request.responseText;//this gets a string
                    console.log('names1 is: ',names);
                    names = JSON.parse(names); //converting string to array
                    console.log('names is: ',names);
                    var list='';
                    for(var i=0;i<names.length;i++){
                    list=list +'<li>'+names[i]+"</li>";
                    console.log('list is: ',list);
                    }
            var ul = document.getElementById('namelist');
            ul.innerHTML = list;
    	 		}
    	 	}
    	 
    	 	
    	 };//button onclick function ends

    	 //Make the request
    	 request.open('GET','http://silentarrowz.imad.hasura-app.io/submit-name?name='+name,true);
    	 request.send(null);
    	
    }; //button onclick function ends

  /*
    var nameInput = document.getElementById('name');
    
    var submit = document.getElementById('submit_btn');
    submit.onclick = function(){
        var names=['name1','name2','name3','name4'];
              var list='';
    for(var i=0;i<names.length;i++){
        list=list +'<li>'+names[i]+"</li>";

    }
        var ul = document.getElementById('namelist');
        ul.innerHTML = list;
        
    }
*/ 




 //Make the request
         //request.open('GET','http://localhost:8080/submit_comment?comment='+comment,true);
         //request.send(null);
var submitButton = document.getElementById('submit_btn');
submitButton.onclick = function(){
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
  
  
  
};//window onload function ends


