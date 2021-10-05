require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes"); //Importando rotas
const conectToDatabase = require('./database')
const cors = require('cors');

conectToDatabase();

const app = express();
const port = 3333; //Definindo porta

app.use(cors());
app.use(express.json()); //Fazendo o express "entender" arquivos .json
app.use(routes);

app.listen(port, () => {
  console.log(`⚡ Backend started at http://localhost:${port}`);
});
