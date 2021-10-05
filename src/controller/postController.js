const Post = require("../models/postModel");
const { response, request } = require("express"); //Importando response do express
const {v4:uuid} = require("uuid"); //Importando uuid para criação dos _id dos posts
const { update } = require("../models/postModel");


module.exports = {
  async index(request, response) {
    //Função assincrona para exibir post(get)
    try {
      const posts = await Post.find(); 
      // .find irá buscar todos os dados do schema(model);

      return response
      .status(200)
      .json({ posts });
       // retornando para o cliente o que o status http(200 - OK ) e a requisição fez em formato .json //

    } catch (error) {
      // Caso aja erro irá retornar o erro (response) e o status http (500- erro desconhecido) para quem mandou a requisição (cliente), em formato .json //

      response
      .status(500)
      .json({ error: error.message });
    }
  },

  async store(request, response) {
    //Função assincrona para criar post(POST)

    const { title, description } = request.body; 
    //Definindo o que o usuario precisará informar na criação do post "{ title , description }"

    if (!title || !description) {
      //Verificando se o usuario preencheu os dados da maneira esperada.

      return response
        .status(400)
        .json({ error: "Missing title or description" });
         //Retornando status(400 - BAD REQUEST) para usuario que não respondeu de maneira correta.
    }
    const post = new Post({ //Definindo estruturação para criar post e informando os dados que o banco espera receber (_id , title, descriproin, active)
        _id: uuid(),
        title,
        description,
        active:false,
    })

    try {
        await post.save(); //.save é uma função do mongoose para inserir um dado no banco de dados
        return response
        .status(201)
        .json({ message: "Post added sucessfully!" }) 
        //Retornando status http(201) em formato .json informando que o post foi criado com sucesso. 

    } catch (error) {
        response
        .status(400)
        .json({ error: error.message });
          // Caso aja erro irá retornar o erro (response) e (status(400 - BAD REQUEST) para quem mandou a requisição (cliente), em formato .json //
        
    }
  },

  async update(request, response) {
      const { title , description } = request.body;

      if(!title && !description) { 
          //Obrigando o usuario a informar o title e description
          return response
          .status(400)
          .json({ error: "You must inform a new title or a new description" })
             // Caso aja erro irá retornar o erro (response) e (status(400 - BAD REQUEST) para quem mandou a requisição (cliente), em formato .json , e menssgem de erro indicando para enviar os devidos dados
      }
      if(title) response.post.title = title; 
      // Se houver um title ele será atualizado, se não houver, ele se manterá o mesmo. 

      if(description) response.post.description = description; 
      // Se houver um description ele será atualizado, se não houver, ele se manterá o mesmo. 

      try {
          await response.post.save(); //Salvando post no DB
          return response
          .status(200)
          .json({ message : "Post updated sucessfully" })
        //Retornando status http(200) em formato .json informando que o post foi editado com sucesso. 

          
      } catch (err) {
          return response.status(500).json({ error: err.message })
             // Caso aja erro irá retornar o erro (response) e (status(500- BAD REQUEST) para quem mandou a requisição (cliente), em formato .json , e menssgem de erro indicando para enviar os devidos dados
          
      }

  },

  async delete(request, response) {
      try {
          await response.post.remove();
          return response.status(200).json({ message: "Post deleted sucessfully" })
        //Retornando status http(200) em formato .json informando que o post foi deletado com sucesso. 

      } catch (err) {
          return response.status(500).json({ error: err.message })
          
      }
  }

};
