console.log("Runing server");
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var multer = require("multer");
var cloudinary = require("cloudinary");


var app = express();
var server;

cloudinary.config({
	cloud_name: 'digitalia-me', 
	api_key: '744518375597189', 
	api_secret: 'v8NdOX-trAt8dOxmAuvfRuoCD2Y' 
});

server = app.listen(8080, function (){
	console.log("Server On");
});

mongoose.connect("mongodb://localhost/pagina_facilito");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//Schema del producto
var productSchema = {
	title:String,
	description:String,
	imageUrl:String,
	price:Number
};

var product = mongoose.model("product",productSchema);

app.set("view engine" , "jade");


app.use(express.static("public"));
app.get("/", function (req,res){
	res.render("index");
});

app.get("/menu/new", function (req,res){
	res.render("menu/new");
});

app.post("/menu", function (req,res){
	if(req.body.password == "fafa"){
	var data = {
		title: req.body.title,
		description: req.body.description,
		imageUrl: "foto.png",
		price: req.body.pricing
	}
	
	product.save(function (err){
	console.log(product);
	res.render("menu");
	});
}else{
	res.render("menu/new")
}
});