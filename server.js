var express = require('express');
var morgan = require('morgan');
var path = require('path');


var app = express();
app.use(morgan('combined'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/profile',function(req,res){
    res.sendFile(path.join(__dirname,'ui','profile.html'));
});

app.get('/ui/profile.css',function(req,res){
    res.sendFile(path.join(__dirname,'ui','profile.css'));
 });

app.get('/ui/article.css',function(req,res){
    res.sendFile(path.join(__dirname,'ui','article.css'));
 });
 
var articles={
    'article-one': {
    title : 'Article one|Faraz Ahmed' ,
    heading:'Article One',
    date:'Sept 18th 2016',
    content:`<p>This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.
        </p>
        
        <p>This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.
        </p>
        
        <p>This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.This is the content for my 1st article.
        </p>`
        /*
        <label>Enter comments below</label></br>
             <textarea name='comment' id='comment1'></textarea><br />
              <input type="submit" id="comment_btn1" value="Submit" class="btn btn-warning"></input>
              <hr>
              <p>Comments :</p><br>
              <div id="comments1"></div>
              */


        
    },
    'article-two':{ 
        title : 'Article Two|Faraz Ahmed' ,
        heading:'Article Two',
         date:'Sept 18th 2016',
        content:` <p>This is the content for my 2nd article.
        This is the content for my 2nd article.This is the content for my 2nd article.This is the content for my 2nd article.
        This is the content for my 2nd article.
        </p>
        
        <p>This is the content for my 2nd article.
        This is the content for my 2nd article.This is the content for my 2nd article.This is the content for my 2nd article.
        This is the content for my 2nd article.
        </p>
        
        <p>This is the content for my 2nd article.
        This is the content for my 2nd article.This is the content for my 2nd article.This is the content for my 2nd article.
        This is the content for my 2nd article.
        </p>`
        /*
        <label>Enter comments below</label></br>
             <textarea name='comment' id='comment2'></textarea><br>
              <input type="submit" id="comment_btn2" value="Submit"></input>
              <hr>
              <p>Comments :</p><br>
              <div id="comments2">comments appear here</div>
            */
        
    },
    'article-three':{ 
        title : 'Article Three|Faraz Ahmed' ,
        heading:'Article Three',
         date:'Sept 18th 2016',
        content:`  <p>
        This is the content for my 3rd article.This is the content for my 3rd article.This is the content for my 3rd article.
        This is the content for my 3rd article.This is the content for my 3rd article.This is the content for my 3rd article.
        This is the content for my 3rd article.This is the content for my 3rd article.This is the content for my 3rd article.
       </p>
        
        <p>
        This is the content for my 3rd article.This is the content for my 3rd article.This is the content for my 3rd article.
        This is the content for my 3rd article.This is the content for my 3rd article.This is the content for my 3rd article.
        This is the content for my 3rd article.This is the content for my 3rd article.This is the content for my 3rd article.
       </p>
       
       <p>
       This is the content for my 3rd article.This is the content for my 3rd article.This is the content for my 3rd article.
        This is the content for my 3rd article.This is the content for my 3rd article.This is the content for my 3rd article.
        This is the content for my 3rd article.This is the content for my 3rd article.This is the content for my 3rd article.
       </p>`
       /*
       <label>Enter comments below</label></br>
             <textarea name='comment' id='comment3'></textarea><br />
              <input type="submit" id="comment_btn3" value="Submit" class="btn btn-warning"></input>
              <hr>
              <p>Comments :</p><br>
              <div id="comments3"></div>
    */

       
    }
};


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
        <div class="date">${date}</div>
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

app.get('/ui/article.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','article.js'));
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


app.get('/:articleName', function(req,res){
    //articleName == articleOne
    //articles[articleName] =={} content object for article one
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});


 

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
