const Post = require('../models/postModel');//Importand model Post
const {  validate: uuid } = require('uuid');//Importando {validate} de UUid para 
const { post } = require('../routes');

module.exports = {
    async validateId(request, response, next) { 
        const { id } = request.params; 
        if (!uuid(id)) { //Verificando se o id é valido
            return response.status(400).json({ error: "Invalid ID"})
        }
        try {
            const post = await Post.findById(id);
            response.post = post;
            if(!post) {
                return response.status(404).json({ error:"Post not found" })
            }
        } catch (err) {
            return response.status(500).json({ error: err.message })
        }
        next();
    },
}