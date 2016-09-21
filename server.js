var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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
        </p>`},
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
    }
};


function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = `<!doctype html>
    <html>
     <head><title>Article ONe</title>
     
     <link href="/ui/style.css" rel="stylesheet">
     
     </head>
    <body>
        <div class="container">
        <div>${title}</div>
        <a href="/">Home</a>
        <hr/>
        <h3>${heading}</h3>
        <div>${date}</div>
        <div>
            ${content}
            
        </div>
        </div>
    </body>
    
    </html>`;
    return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function(req,res){
    //articleName == articleOne
    //articles[articleName] =={} content object for article one
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});
app.get('/profile',function(req,res){
    res.sendFile(path.join(__dirname,'ui','portfolio.html'));
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
