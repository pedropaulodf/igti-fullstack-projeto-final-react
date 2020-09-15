import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import css from './ModalNovoLancamento.module.css';

Modal.setAppElement('#root');

export default function ModalNovoLancamento({ modalOpen, onSave }) {

    const [inpuValorValue, setInpuValorValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formCategory, setFormCategory] = useState('');
    const [formDate, setFormDate] = useState('');
    const [formType, setFormType] = useState('+');

    const handleModalClose = () => {
        modalOpen(false);
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            modalOpen(false);
        }
    }

    const handleValorChange = (event) => {
        const valor = parseInt(event.target.value);

        setInpuValorValue(event.target.value);

        if (valor <= 0) {
            setErrorMessage(`O valor não pode ser 0 ou negativo!`);
            return;
        }
        console.log(valor);
        setErrorMessage('');
    }

    const handleDateChange = (event) => {
        setFormDate(event.target.value);
    }

    const handleInpuDescricao = (event) => {
        setFormDescription(event.target.value);
    }

    const handleInpuCategoria = (event) => {
        setFormCategory(event.target.value);
    }

    const handleRadioClick = (event) => {
        setFormType(event.target.value);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (formDescription === '' ||
            inpuValorValue === '' ||
            formCategory === '' ||
            formDate === '' ||
            formType === '') {
            setErrorMessage(`Todos os campos sao obrigatórios`);
            return;
        }
        setErrorMessage('');

        const dataSplited = formDate.split('-');
        const ano = dataSplited[0];
        const mes = dataSplited[1];
        const dia = dataSplited[2];

        const formData = {
            description: formDescription,
            value: inpuValorValue,
            category: formCategory,
            year: ano,
            month: mes,
            day: dia,
            yearMonth: `${ano}-${mes}`,
            yearMonthDay: `${ano}-${mes}-${dia}`,
            type: formType,
        };

        // console.log(formData);
        onSave(formData);

    }

    return (
        <div>
            <Modal isOpen={true} className={css.modalStyle}>

                <div className={css.flexRow}>
                    <span className={css.title}>Novo Lançamento</span>

                    <button className="waves-effect waves-lights btn red dark-4 right" onClick={handleModalClose}>
                        <i className="material-icons">close</i>
                    </button>
                </div>

                <form onSubmit={handleFormSubmit}>

                    <div className={`${css.divRadioButtons} center`}>
                        <label>
                            <input name="tipoLancamento" type="radio" value="+" defaultChecked onClick={handleRadioClick} />
                            <span>Receita </span>
                        </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <label>
                            <input name="tipoLancamento" value="-" type="radio" onClick={handleRadioClick} />
                            <span> Despesa</span>
                        </label>
                    </div>

                    <div className="input-field">
                        <input
                            id="inputDescricao"
                            type="text"
                            onChange={handleInpuDescricao}
                            required
                        />
                        <label className="active" htmlFor="inputDescricao">Descrição:</label>
                    </div>

                    <div className="input-field">
                        <input
                            id="inputCategoria"
                            type="text"
                            onChange={handleInpuCategoria}
                            required
                        />
                        <label className="active" htmlFor="inputCategoria">Categoria:</label>
                    </div>

                    <div className="row">
                        <div className="col s5">
                            <div className="input-field">
                                <input
                                    id="inputValor"
                                    type="text"
                                    min="0"
                                    autoFocus
                                    value={inpuValorValue}
                                    onChange={handleValorChange}
                                    required
                                ></input>
                                <label className="active" htmlFor="inputValor">Valor: </label>
                            </div>

                        </div>

                        <div className="col s7">
                            <div className="input-field">
                                <input
                                    id="inputDataLancamento"
                                    type="date"
                                    onChange={handleDateChange}
                                    required
                                />
                                <label className="active" htmlFor="inputDataLancamento">Data Lançamento:</label>
                            </div>
                        </div>
                    </div>
                    <div className={css.flexRow}>
                        <button className="waves-effect waves-lights btn" disabled={errorMessage.trim() !== ''}>
                            <i className="material-icons right" >check</i>
                            Salvar
                        </button>
                        <span style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</span>
                    </div>
                </form>

            </Modal>
        </div>
    )
}
