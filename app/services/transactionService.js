import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
import TransactionModel from '../models/TransactionModel.js';

const getPrimeiroAnoMes = async (req, res) => {

    try {
        const data = await TransactionModel.findOne({}, {yearMonth:1});

        if (!data) {
            res.status(404).send({ errorMessage: "Não encontramos lançamentos para o período selecionado" });
        }

        // Retorna o json da busca
        res.send(data.yearMonth);

    } catch (error) {
        res.status(500).send({ errorMessage: "Erro ao realizar a consulta do periodo selecionado. Erro: " + error });
    }
}

const getAllLancamentos = async (req, res) => {

    try {
        const { period } = req.query;

        if (!period) {
            res.status(404).send({ errorMessage: "Periodo invalido, informe uma data no formato yyyy-mm" });
        }

        let data = await TransactionModel.find({ yearMonth: period });

        data = data.sort((a,b) => a.day - b.day);

        if (!data) {
            res.status(404).send({ errorMessage: "Não encontramos lançamentos para o período selecionado" });
        }

        // Retorna o json da busca
        res.send(data);

    } catch (error) {
        res.status(500).send({ errorMessage: "Erro ao realizar a consulta do periodo selecionado. Erro: " + error });
    }
}

const getAllAnosMeses = async (_, res) => {

    try {

        const data = await TransactionModel.distinct("yearMonth");

        if (!data) {
            res.status(404).send({ errorMessage: "Peridos indisponiveis" });
        }

        // Retorna o json da busca
        res.send(data);

    } catch (error) {
        res.status(500).send({ errorMessage: "Erro ao realizar a consulta de todos os periodos. Erro: " + error });
    }
}

const addNovoLancamento = async (req, res) => {

    const {description,value,category,year,month,day,yearMonth,yearMonthDay,type} = req.body;
    
    const newLancamento = new TransactionModel({
        description: description,
        value: value,
        category: category,
        year: year,
        month: month,
        day: day,
        yearMonth: yearMonth,
        yearMonthDay: yearMonthDay,
        type: type,
    });

    try {
        const data = newLancamento.save();

        if (!data) {
            res.status(404).send({ errorMessage: "Não foi possível inserir seu novo lancamento" });
        }

        // Retorna o json da busca
        res.send("Lançamento inserido com sucesso!");

    } catch (error) {
        res.status(500).send({ errorMessage: "Erro ao inserir seu novo lancamento. Erro: " + error });
    }
}

const updateLancamento = async (req, res) => {

    const id = req.params.id;

    try {
        const data = await TransactionModel.findByIdAndUpdate({_id: id}, req.body, {new: true})

        if (!data) {
            res.status(404).send({ errorMessage: "Não foi possível atualizar o lancamento" });
        }

        //Retorna o json da busca
        res.send("Lançamento atualizado com sucesso!");

    } catch (error) {
        res.status(500).send({ errorMessage: "Erro ao atualizar seu lancamento. Erro: " + error });
    }
}

const deleteTransacao = async (req, res) => {

    const {id} = req.params;

    try {

        const data = await TransactionModel.deleteOne({_id: ObjectId(id)})

        if (!data) {
            res.status(404).send({ errorMessage: "Peridos indisponiveis" });
        }

        // Retorna o json da busca
        res.send("Transação excluída com Sucesso!");

    } catch (error) {
        res.status(500).send({ errorMessage: "Erro ao deletar a transacao especificada. Erro: " + error });
    }
}

export default { getAllLancamentos, getAllAnosMeses, getPrimeiroAnoMes, addNovoLancamento, deleteTransacao, updateLancamento };