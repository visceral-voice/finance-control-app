import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes/routes.js';
import path from 'path';
import dotenv from 'dotenv';

/**
 * Faz a leitura do arquivo
 * ".env" por padrão
 */
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Vinculando o React ao app
 */
app.use(express.static(path.join(process.cwd(), 'client/build')));

/**
 * Rota raiz
 */
app.get('/api/', (_, response) => {
  response.send({
    message:
      'Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações',
  });
});

/**
 * Rotas principais do app
 */
app.use('/api/transaction', routes);

/**
 * Conexão ao Banco de Dados
 */
const { DB_CONNECTION } = process.env;

// try {
//   await mongoose.connect(DB_CONNECTION, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   });
//   console.log('MongoDB conectado');
//   const APP_PORT = process.env.PORT || 3001;
//   app.listen(APP_PORT, () => {
//     console.log(`Servidor iniciado na porta ${APP_PORT}`);
//   });
// } catch (err) {
//   console.log('Erro ao conectar no Mongo ' + err);
// }

mongoose
  .connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('MongoDB conectado');
    const APP_PORT = process.env.PORT || 3001;
    app.listen(APP_PORT, () => {
      console.log(`Servidor iniciado na porta ${APP_PORT}`);
    });
  })
  .catch((err) => {
    console.log('Erro ao conectar no MongoDB ' + err);
  });
