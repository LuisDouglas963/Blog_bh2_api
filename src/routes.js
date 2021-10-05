const express = require("express"); //Importando express
const routes = express.Router(); // Importando routes do express


const postController = require('./controller/postController'); //Importando controller
const postMiddleware = require("./middleware/postMiddleware");



routes.get("/posts", postController.index); 
//1º parametro Passando rotas para receber posts(get) "/posts"
//2º parametro passando controler(postController) junto com a função criada nele (index)

routes.post("/create", postController.store);
//1º parametro Passando rotas para criar posts(POST) "/create"
//2º parametro passando controler(postController) junto com a função criada nele (store)

routes.put("/update/:id",postMiddleware.validateId, postController.update);
//1º parametro passando rota para editar post(PUT) "/update/:id"
//2º parametro passando middleware(postMiddleware) junto com função criada nele (validateID) 
//3º parametro passando controller(postController) junto com função criada nele (update)

//Obs:. O 2º parametro de middleware só funciona devido ao next que foi passado como parametro junto com o req e res na criação da função validateID

routes.delete("/delete/:id",postMiddleware.validateId, postController.delete);
//1º parametro passando rota para deletar post(DELETE) "delete/:id"
//2º parametro passando middleware(postMiddleware) junto com função criada nele (validateID) 
//3º parametro passando controller(postController) junto com função criada nele (delete)

//Obs:. O 2º parametro de middleware só funciona devido ao next que foi passado como parametro junto com o req e res na criação da função validateID

module.exports = routes; //Exportando rotas;

