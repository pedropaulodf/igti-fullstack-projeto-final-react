import React from 'react';

export default function ActionClicks({onEditClick, onDeleteClick, idTransacao, dadosTransacao}) {

    const handleClickEdit = () => {
        onEditClick(true, idTransacao, dadosTransacao);
    }

    const handleDeleteClick = () => {
        onDeleteClick(idTransacao);
    }

    return (
        <div>
            <i className="material-icons" style={{ cursor: 'pointer' }} onClick={handleClickEdit} >edit</i>
            <i className="material-icons" style={{ cursor: 'pointer' }} onClick={handleDeleteClick} >delete</i>
        </div>
    )
}
