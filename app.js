const express= require('express');
var app= express();
var bodyParser= require('body-parser');
const ejs= require('ejs');


app.use(express.static(__dirname + '/views'));
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html"); 
app.set("views", __dirname + "/views"); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/', require('./routes/server'));

const port = process.env.PORT || 2022;

app.listen(port,()=>{
    console.log(`Listening: http://localhost:${port}`);
    console.log("Server is started at ");
});




