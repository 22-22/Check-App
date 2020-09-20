import React from 'react';
import { countCheckedItems, countPoints } from '../../utils/checkForm'

export const CheckFormHeader = ({ title, itemsNumber, score }) => {
    return (
        <header className="checkform__header">
            <div className="checkform__header-title">{title}</div>
            <div className="checkform__header-stats">
                <div>Checked: {countCheckedItems(score)} out of {itemsNumber}</div>
                <div>Total points: {countPoints(score)}</div>
            </div>
        </header>
    )
}
