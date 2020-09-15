import React from 'react';
import { formatMoneyValue } from '../../helpers/formats.js';
import css from './BarraResumo.module.css';

export default function BarraResumo({ totalLancamento, totalReceita, totalDespesa, totalSaldo }) {
    return (
        <div className={` ${css.resumoBarra} row`}>
            <div className="col s3">
                <b>Lançamentos: </b>
                <span style={{fontWeight: 'bold'}}>
                {totalLancamento}
                </span>
            </div>
            <div className="col s3">
                <b>Receita: </b>
                <span className={totalReceita < 0 ? css.valorNeg : css.valorPos}>
                    R$ {formatMoneyValue(totalReceita)}
                </span>
            </div>
            <div className="col s3">
                <b>Despesa: </b>
                <span className={css.valorNeg}>
                    R$ {formatMoneyValue(totalDespesa)}
                </span>
            </div>
            <div className="col s3">
                <b>Saldo: </b>
                <span className={totalSaldo < 0 ? css.valorNeg : css.valorPos}>
                    R$ {formatMoneyValue(totalSaldo)}
                </span>
            </div>
        </div>
    )
}