import React from 'react';
import { CheckFormItem } from './CheckFormItem';

export const CheckFormCategory = ({ category, score, setScore, role, selfCheck, customCategory, checkType }) => {
    return (
        <>
            {<div className="checkform__category">
                <h3 className="checkform__category-title">{category.category}</h3>
                {category.categoryItems.map((item, idx) =>
                    <CheckFormItem
                        item={item} key={idx} itemIdx={idx}
                        categoryName={category.category}
                        score={score} setScore={setScore}
                        role={role} selfCheck={selfCheck}
                        customCategory={customCategory}
                        checkType={checkType}
                    />
                )}
            </div>}
        </>
    )
}
