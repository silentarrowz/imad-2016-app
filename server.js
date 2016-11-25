var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

var Pool = require('pg').Pool;
var configdb = {
    user:'silentarrowz',
    database:'silentarrowz',
    host:'db.imad.hasura-ap.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var pool = new Pool(configdb);


function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = `<!doctype html>
    <html>
     <head><title>${heading}</title>
     
     <link href="/ui/article.css" rel="stylesheet">
     <link href="https://fonts.googleapis.com/css?family=Aguafina+Script" rel="stylesheet">
     <link href="https://fonts.googleapis.com/css?family=Almendra+SC" rel="stylesheet">
     </head>
    <body>
        <div class="container article">
        <div class="full">
        <div class="headline">${heading}</div> 
        <a href="/">Home</a>
        
        <hr/>
        <h3>${heading}</h3>
        <div class="date">${date.toDateString()}</div>
        <div>
        <div class="para">
            ${content}
            </div>
             <label>Enter comments below</label></br>
             <textarea name='comment' id='comment'></textarea><br />
              <input type="submit" id="comment_btn" value="Submit" class="btn btn-warning"></input>
              <hr>
              <p>Comments :<br>
                <span id="comments"></span>
              </p>
              
        </div>
        
        </div>
        </div>
        
    </body>
    <script type="text/javascript" src="/ui/article.js" ></script>
    </html>`;
    return htmlTemplate;
}
// commenting out twit portion because it doesnt work in the hasura code console
//although it's working perfectly in localhost
/*
//===========================================================
console.log('The bot is starting');
var Twit = require('twit');
var config = require('./config');
console.log(config);
var T = new Twit(config);
console.log('The bot is starting');
var Twit = require('twit');
var config = require('./config');
console.log(config);
var T = new Twit(config);




app.get('/t/:searchTerm', function(req, res) {
    // User requested for "/" route, now get tweets
    var keyword = req.params.searchTerm;
    console.log('keyword is : ', keyword);
    var params ={
  q:'hillary',
  count:5
}
params['q']=keyword;
console.log('params object is : ',params);
    T.get('search/tweets', params, function(err, data) {
        //Tweets received, now send the tweets to the user
        var tweets = data.statuses;
        console.log('tweets is : ',tweets);
        
        var tweetz=[];
    for(var i=0;i<tweets.length;i++){
    console.log(tweets[i].text+'================================');
    tweetz.push(tweets[i].text);
    
    
  }
  
        res.send(tweetz);
    });
});



//============================================================
*/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
});

function hash(input,salt){
  //how to create hash
  var hashed = crypto.pbkdf2Sync(input,salt, 10000, 512, 'sha512');
  return ['pbkdf2Sync',salt,hashed.toString('hex')].join('$');
}

app.post('/create-user',function(req,res){
  //take username and password as input and create entry in user table
  
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  var salt= crypto.randomBytes(128).toString('hex');
  var dbString = hash(password,salt);
  
  
  pool.query('INSERT INTO "user"(username,password) VALUES($1,$2)',[username,dbString],function(err,result){
    if(err){
      res.status(500).send(err.toString());

    }else{
      res.send('user succesfully created: '+username);
    }
  });


});

app.get('/hash/:input',function(req,res){
  var hashString = hash(req.params.input,'this-is-some-random-string');
  res.send(hashString);
});

app.get('/weather',function(req,res){
  res.sendFile(path.join(__dirname,'weather.html'));
});

app.get('/news',function(req,res){
  res.sendFile(path.join(__dirname,'news.html'));
});

app.get('/news.js',function(req,res){
  res.sendFile(path.join(__dirname,'news.js'));
});

app.get('/news.css',function(req,res){
  res.sendFile(path.join(__dirname,'news.css'));
});

app.get('/weather.css',function(req,res){
  res.sendFile(path.join(__dirname,'weather.css'));
});

app.get('/weather.js',function(req,res){
  res.sendFile(path.join(__dirname,'weather.js'));
});

app.get('/gmaps',function(req,res){
  res.sendFile(path.join(__dirname,'gmaps.html'));
});


/*
app.get('/profile',function(req,res){
    res.sendFile(path.join(__dirname,'ui','profile.html'));
});
*/

app.get('/ui/profile.css',function(req,res){
    res.sendFile(path.join(__dirname,'ui','profile.css'));
 });

var comments=[];
app.get('/submit_comment',function(req,res){
    //to get the comments
 var comment=req.query.comment;
 comments.push(comment);
 console.log('comments is: ',comments);
 res.send(JSON.stringify(comments));

    //to render those comments on the page
});

app.get('/ui/main.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','main.js'));
 });

var counter=0;
app.get('/counter', function(req,res){
    counter = counter+1;
    //we can only send a string as a response
    //and that's why we convert  it to string using toString()
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name',function(req,res){
    //get the name from request object
    


    //this is for the ?name=something part
    //express gets that part by using req.query.name
    var name=req.query.name;
    console.log('name is: ',name);
  //we could use req.params.name if the url was /submit-name/:name

    names.push(name);
    console.log('names is: ',names);
    res.send(JSON.stringify(names));
});


app.get('/articles/:articleName', function(req,res){
    //articleName == articleOne
    //articles[articleName] =={} content object for article one
    
    pool.query('SELECT * FROM article WHERE title =$1',[req.params.articleName],function(err,result){
        if(err){
          res.status(500).send(err.toString());
        }else{
          if(result.rows.length===0){

            res.status(404).send(result.rows);
          }else{
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
          }
        }
    });

  
});


 

app.get('/ui/article.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article.css'));
});

app.get('/ui/article.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
