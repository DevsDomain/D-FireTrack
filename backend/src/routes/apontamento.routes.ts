import { Router } from 'express';
import ApontamentoAlteracao from '../controllers/apontamentoAlteracaoController';

const router = Router();

// Rota para obter todas as alterações
router.get('/apontamentos/alteracoes', ApontamentoAlteracao.getAll);

export default router;
