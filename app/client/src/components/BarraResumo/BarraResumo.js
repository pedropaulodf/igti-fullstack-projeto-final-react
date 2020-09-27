import React from 'react';
import { formatMoneyValue } from '../../helpers/formats.js';
import css from './BarraResumo.module.css';

export default function BarraResumo({ totalLancamento, totalReceita, totalDespesa, totalSaldo }) {
    return (
        <div className={` ${css.resumoBarra} row`}>
            <div>
                <div>
                    <p>Lançamentos: </p>
                </div>
                <span style={{fontWeight: 'bold'}}>
                {totalLancamento}
                </span>
            </div>
            <div className={totalReceita < 0 
                ? css.valorNeg 
                : css.valorPos}>
                <div>
                    <p>Receita: </p>
                </div>
                <span>
                    R$ {formatMoneyValue(totalReceita)}
                </span>
            </div>
            <div className={css.valorNeg}>
                <div>
                    <p>Despesa: </p>
                </div>
                <span>
                    R$ {formatMoneyValue(totalDespesa)}
                </span>
            </div>
            <div className={totalSaldo < 0 
                    ? css.valorNeg 
                    : css.valorPos}>
                <div>
                    <p>Saldo: </p>
                </div>
                <span>
                    R$ {formatMoneyValue(totalSaldo)}
                </span>
            </div>
        </div>
    )
}