import React from 'react'
import css from './BarraPesquisa.module.css'

export default function BarraPesquisa({ onButtonClick, onInputChangeBusca }) {

    const handleButtonClick = () => {
        onButtonClick(true);
    }

    const handleInputChange = (event) => {
        onInputChangeBusca(event.target.value);
    }

    return (
        <div className={`${css.container}`}>
            <div className={`${css.inputBlock}`}>
                <button onClick={handleButtonClick}>
                    <i className="material-icons left" >add</i>
                        Novo Lançamento
                </button>
            </div>

            <div className={`${css.inputBlock}`}>
                <input id="inputSearch" type="text" placeholder="Faça sua busca:" onChange={handleInputChange} />
            </div>
        </div>
    )
}
