import express from 'express';
import router from './routes/apontamento.routes'; // Corrigido o nome do arquivo
import connect from './models/apontamentoAlteracaoModel';

const PORT = 3008;
const server = express();

server.use(express.json());

// Conectar ao banco de dados
connect();

// Usar as rotas corretamente
server.use('/api', router); // Corrigido para usar o nome correto da importação

server.listen(PORT, () => {
    console.log(`Server Running at PORT: ${PORT}`);
});
