import axios from 'axios';

const API_URL = 'https://pedropaulodf-desafio-final.herokuapp.com/api/transaction';
// const API_URL = 'http://localhost:3001/api/transaction';

async function getPrimeiroAnoMes() {
    const res = await axios.get(`${API_URL}/primeiroAnoMes`);
    return res;
}

async function getAllAnosMeses() {
    const res = await axios.get(`${API_URL}/allAnosMeses`);
    return res;
}

async function getAllTransacoesMes(anoMes) {
    const res = await axios.get(`${API_URL}?period=${anoMes}`);
    return res;
}

async function addNovoLancamento(dadosNovoLancamento) {
    const res = await axios.post(`${API_URL}/`, dadosNovoLancamento);
    return res;
}

async function deleteTransacao(id) {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res;
}

async function updateLancamento(id, params) {
    const res = await axios.put(`${API_URL}/${id}`, params);
    return res;
}

export { getAllAnosMeses, getAllTransacoesMes, getPrimeiroAnoMes, addNovoLancamento, deleteTransacao, updateLancamento };