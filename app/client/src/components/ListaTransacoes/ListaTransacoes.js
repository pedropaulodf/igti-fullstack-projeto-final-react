import React from 'react'
import ActionClicks from '../ActionClicks';
import css from './ListaTransacoes.module.css';
import { formatMoneyValue } from '../../helpers/formats.js';

export default function ListaTransacoes(props) {

    const handleClickEdit = (modal, id, dadosTransacao) => {
        props.onClickEdit(modal, id, dadosTransacao);
    }

    const handleDeleteClick = (id) => {
        props.onClickDelete(id);
    }

    return (
        <table>
            <tbody>
                {
                    props.data.map((transacao) => {
                        const { _id, description, value, category, day, type } = transacao;
                        return (
                            <tr className={type === '-' ? `${css.linha} ${css.linhaRed} ` : `${css.linha} ${css.linhaGreen} `} key={_id}>

                                <td className={`${css.tdId}`}><b>{day}</b></td>
                                <td className={`${css.tdDescricao}`}><p><b>{category}</b></p><p>{description}</p></td>
                                <td className={`${css.tdValor}`}><b> R$ {formatMoneyValue(value)}</b></td>
                                <td className={`${css.tdActions}`}>
                                    <div>
                                        <ActionClicks
                                            onEditClick={handleClickEdit}
                                            onDeleteClick={handleDeleteClick}
                                            idTransacao={_id}
                                            dadosTransacao={transacao}
                                        />
                                    </div>
                                </td>

                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    )
}
