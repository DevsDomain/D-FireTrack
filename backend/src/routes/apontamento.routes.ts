
import ApontamentoAlteracao from '@/controllers/apontamentoAlteracaoController';
import { Router } from 'express';

const apontamentoRoute = Router();


// Rota para obter todas as alterações
apontamentoRoute.get('/', ApontamentoAlteracao.getAll);
apontamentoRoute.post('/filtro', ApontamentoAlteracao.receiveFilter); // Nova rota POST

export default apontamentoRoute;
