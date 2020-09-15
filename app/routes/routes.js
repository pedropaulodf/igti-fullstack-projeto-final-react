import express from 'express';
import Service from '../services/transactionService.js';

const router = express();

//BUSCA o primeiro mes
router.get('/primeiroAnoMes', Service.getPrimeiroAnoMes);

//BUSCA todos os anos e meses
router.get('/allAnosMeses', Service.getAllAnosMeses);

//BUSCA de todos os lancamentos do mes
router.get('/', Service.getAllLancamentos);

// ADICIONA NOVO LANCAMENTO
router.post('/', Service.addNovoLancamento);

// DELETE DE TRANSACAO
router.delete('/:id', Service.deleteTransacao);

// UPDATE TRANSACAO
router.put('/:id', Service.updateLancamento);

export default router ;