import React, { useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import * as api from './api/apiService.js';
import BarraResumo from './components/BarraResumo/BarraResumo.js';
import ListaTransacoes from './components/ListaTransacoes/ListaTransacoes.js';
import BarraPesquisa from './components/BarraPesquisa/BarraPesquisa';
import ModalNovoLancamento from './components/ModalAdd/ModalNovoLancamento';
import ModalEditarLancamento from './components/ModalEdit/ModalEditarLancamento';

export default function App() {

  const [allAnosMeses, setAllAnosMeses] = useState([]);
  const [anoMesAtual, setAnoMesAtual] = useState([]);
  const [allTransacoesMes, setAllTransacoesMes] = useState([]);
  const [allLancamentos, setAllLancamentos] = useState([]);
  const [totalReceita, setTotalReceita] = useState('');
  const [totalDespesa, setTotalDespesa] = useState('');
  const [saldoFinal, setSaldoFinal] = useState('');
  const [listaTransacoes, setListaTransacoes] = useState([]);
  const [modalAddIsOpen, setModalAddIsOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [idTransacaoEdit, setIdTransacaoEdit] = useState([]);
  const [dadosTransacaoEdit, setDadosIdTransacaoEdit] = useState([]);

  useEffect(() => {

    const getPrimeiroAnoMes = async () => {
      const anoMes = await api.getPrimeiroAnoMes();
      setAnoMesAtual(anoMes.data);
    }

    const getAnosMeses = async () => {
      await api.getAllAnosMeses().then((res) => {
        let listaMeses = [];
        res.data.map(data => {
          const dataSplited = data.split('-');
          const ano = dataSplited[0];
          const mes = dataSplited[1];

          switch (mes) {
            case '01':
              listaMeses.push({ dataValor: data, dataTexto: `${ano}/Jan` })
              break;

            case '02':
              listaMeses.push({ dataValor: data, dataTexto: `${ano}/Fev` })
              break;

            case '03':
              listaMeses.push({ dataValor: data, dataTexto: `${ano}/Mar` })
              break;

            case '04':
              listaMeses.push({ dataValor: data, dataTexto: `${ano}/Abr` })
              break;

            case '05':
              listaMeses.push({ dataValor: data, dataTexto: `${ano}/Mai` })
              break;

            case '06':
              listaMeses.push({ dataValor: data, dataTexto: `${ano}/Jun` })
              break;

            case '07':
              listaMeses.push({ dataValor: data, dataTexto: `${ano}/Jul` })
              break;

            case '08':
              listaMeses.push({ dataValor: data, dataTexto: `${ano}/Ago` })
              break;

            case '09':
              listaMeses.push({ dataValor: data, dataTexto: `${ano}/Set` })
              break;

            case '10':
              listaMeses.push({ dataValor: data, dataTexto: `${ano}/Out` })
              break;

            case '11':
              listaMeses.push({ dataValor: data, dataTexto: `${ano}/Nov` })
              break;

            case '12':
              listaMeses.push({ dataValor: data, dataTexto: `${ano}/Dez` })
              break;

            default:
              break;
          }
          // console.log(listaMeses);
          setAllAnosMeses(listaMeses);
        });
      });
    }

    getPrimeiroAnoMes();
    getAnosMeses();

  }, []);

  useEffect(() => {

    if (anoMesAtual.length !== 0) {
      const getAllTransacoes = async () => {
        await api.getAllTransacoesMes(anoMesAtual).then((res) => {
          // console de todos os lancamentos
          // console.log(res.data);
          setAllTransacoesMes(res.data);
          setListaTransacoes(res.data);
        });
      }
      getAllTransacoes();
    }

  }, [anoMesAtual]);

  const calculosDaBarraTopo = () => {

    // pega todos os Lancamentos do mes atual
    let lancamentos = listaTransacoes.length;
    setAllLancamentos(lancamentos);

    // soma todas as receitas
    let receitas = 0;
    listaTransacoes.map(transacao => {
      if (transacao.type === '+') {
        receitas += transacao.value;
      }
    });
    setTotalReceita(receitas);

    // soma todas as despesas
    let despesas = 0;
    listaTransacoes.map(transacao => {
      if (transacao.type === '-') {
        despesas += transacao.value;
      }
    });
    setTotalDespesa(despesas);

    // calcula o saldo
    setSaldoFinal(receitas - despesas);

  }

  useEffect(() => {

    if (allTransacoesMes.length !== null) {
      calculosDaBarraTopo();
    }

  }, [listaTransacoes]);


  const handleSelectChange = (event) => {
    const { value } = event.target;
    setAnoMesAtual(value);
  }

  // UPDATE
  const handleButtonNovoLancamento = (dados) => {
    setModalAddIsOpen(dados);
  }

  // UPDATE
  const handleEditClick = async (modal, id, dadosTransacao) => {
    setModalEditIsOpen(modal);
    setIdTransacaoEdit(id);
    setDadosIdTransacaoEdit(dadosTransacao);
  }

  // UPDATE MODAL
  const handleFormSubmitEditarLancamento = async (id, dadosForm) => {
    await api.updateLancamento(id, dadosForm).then(async () => {
      await api.getAllTransacoesMes(anoMesAtual).then((res) => {
        setAllTransacoesMes(res.data);
        setListaTransacoes(res.data);
        setModalEditIsOpen(false);
      });
    });
  }

  // DELETE
  const handleDeleteClick = async (dado) => {
    await api.deleteTransacao(dado).then(async () => {
      await api.getAllTransacoesMes(anoMesAtual).then((res) => {
        setAllTransacoesMes(res.data);
        setListaTransacoes(res.data);
      });
    });

  }

  const handleBusca = (dados) => {
    let dadosLowerCase = dados.toLowerCase();
    let res = allTransacoesMes.filter(transacao => {
      // O if procura se o que tem no inputSearch tem no nome da pessoa
      if (transacao.description.toLowerCase().includes(dadosLowerCase)) {
        return transacao;
      }
    });
    setListaTransacoes(res);
  }

  // POST MODAL
  const handleFormSubmitNovoLancamento = async (formData) => {
    await api.addNovoLancamento(formData).then(async () => {
      await api.getAllTransacoesMes(anoMesAtual).then((res) => {
        setAllTransacoesMes(res.data);
        setListaTransacoes(res.data);
        setModalAddIsOpen(false);
      });
    })
  }

  return (
    <div className="container center">
      <h3>Bootcamp Full Stack • Desafio Final</h3>
      <h5>Controle Financeiro Pessoal</h5>

      {allAnosMeses.length === 0 && <Preloader />}
      {allAnosMeses.length > 0 &&
        <div>

          <select
            className="browser-default select-style"
            // value={allAnosMeses[0]}
            onChange={handleSelectChange}
          >
            {allAnosMeses.map((anoMes) => {
              // console.log(anoMes);
              return (
                <option key={anoMes.dataValor} value={anoMes.dataValor}>
                  {anoMes.dataTexto}
                </option>
              );
            })}
          </select>

          <BarraResumo
            totalLancamento={allLancamentos}
            totalReceita={totalReceita}
            totalDespesa={totalDespesa}
            totalSaldo={saldoFinal}
          />

          <BarraPesquisa
            onButtonClick={handleButtonNovoLancamento}
            onInputChangeBusca={handleBusca}
          />

        </div>}

      {allAnosMeses.length > 0 &&
        <ListaTransacoes
          // key={transacao._id}
          data={listaTransacoes}
          onClickEdit={handleEditClick}
          onClickDelete={handleDeleteClick}
        />
      }

      {modalAddIsOpen === true &&
        <ModalNovoLancamento
          modalOpen={handleButtonNovoLancamento}
          onSave={handleFormSubmitNovoLancamento}
        />}

      {modalEditIsOpen === true &&
        <ModalEditarLancamento
          modalOpen={handleEditClick}
          onEdit={handleFormSubmitEditarLancamento}
          idTrasacao={idTransacaoEdit}
          dadosAtuaisTransacao={dadosTransacaoEdit}
        />}

    </div>
  );
}
