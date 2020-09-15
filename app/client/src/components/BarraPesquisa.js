import React from 'react'

export default function BarraPesquisa({ onButtonClick, onInputChangeBusca }) {

    const handleButtonClick = () => {
        onButtonClick(true);
    }

    const handleInputChange = (event) => {
        onInputChangeBusca(event.target.value);
    }

    return (
        <div className="row">
            <div className="input-field col s5">
                <button className="waves-effect waves-light btn" style={{ zIndex: '0', width: '100%' }} onClick={handleButtonClick}>
                    <i className="material-icons left" >add</i>
                        Novo Lançamento
                    </button>
            </div>

            <div className="input-field col s7">
                <input id="inputSearch" type="text" placeholder="Faça sua busca:" className="validate" onChange={handleInputChange} />
            </div>
        </div>
    )
}
