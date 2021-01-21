//servidor
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
//carregar coneccao com banco de dados
const connection = require('./database/database');
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const userController = require('./user/UserController');
const Category = require('./categories/Category');
const Article = require('./articles/Article');
const User = require('./user/User');
const adminAuth = require("./middlewares/adminAuth");

//view engine
app.set('view engine', 'ejs');
//sessions
app.use(session({
    secret:"anyword",
    cookie: {maxAge: 7200000}//2 horas
}));
//body parser, trabalha com formularios com express
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Express trabalhar com arq. estáticos, ex: img, css, js do front
app.use(express.static('public'));

//Conexao com o banco de dados
connection.authenticate().then(()=>{
    console.log("Conexão Com o Banco Bem Sucedida");
}).catch((error)=>{
    console.log(error);
});

//usar as rotas 
app.use('/', categoriesController);
app.use('/', articlesController);
app.use('/', userController);


app.get("/", (req, res)=>{
    Article.findAll({
        order:[['id', 'DESC']],
        limit:5
    }).then(articles=>{
        Category.findAll().then(categories => {
            res.render("index", {articles:articles, categories: categories});
        });
    });    
});

app.get("/admin", adminAuth,(req, res)=>{
    res.render("admin");           
});

app.get("/blog", (req, res)=>{
    Article.findAll({
        order:[['id', 'DESC']],
        limit:5
    }).then(articles=>{
        Category.findAll().then(categories => {
            res.render("blog", {articles:articles, categories: categories});
        });
    });    
});

app.get("/onboarding", (req, res)=>{
    res.render("onboarding");    
});

app.get("/:slug", (req, res)=>{
    var slug = req.params.slug;
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article=>{
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article:article, categories: categories});
            });
        }
        else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");  
    });
});

app.get("/category/:slug", (req, res)=>{
    var slug = req.params.slug;
    Category.findOne({
        where:{
            slug:slug
        },
        include: [{model: Article}]
    }).then(category =>{
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("admin/categories/page", {articles: category.articles, categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })
});





app.listen(3000, ()=>{
    console.log("O Servidor está rodando");
});