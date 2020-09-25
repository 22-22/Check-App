import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

export const CheckFormItem = ({ categoryName, item, score, setScore, itemIdx, role }) => {
    const currentCategory = score[categoryName];

    const updateScore = (value, name = 'score') => {
        const valueChecked = (name === 'score' && typeof value !== 'number') ? "" : value;
        const newCategoryArray = score[categoryName].slice();
        if (newCategoryArray[itemIdx]) {
            newCategoryArray[itemIdx][name] = valueChecked.toString();
        } else {
            newCategoryArray[itemIdx] = ({ [name]: valueChecked.toString() })
        }
        setScore({ ...score, [categoryName]: newCategoryArray });
    }

    return (
        <>{
            (!item.checkByMentorOnly
                || item.checkByMentorOnly && role === 'mentor'
            ) && (
                <div className="checkform__item">
                    <div>
                        <div className="checkform__item-points">
                            Points: {item.maxScore}
                        </div>
                    </div>
                    <div className="checkform__item-description">
                        <p>{item.description}</p>
                        <textarea
                            name="comment"
                            className="checkform__item-textarea"
                            value={(currentCategory === undefined
                                || currentCategory[itemIdx] === undefined)
                                ? "" : currentCategory[itemIdx].comment}
                            onChange={(e) => updateScore(e.target.value, e.target.name)}
                        ></textarea>
                        {item.checkByMentorOnly &&
                            <p className="checkform__item-comment">Checked by mentor only.</p>
                        }
                    </div>
                    <Row>
                        <Col span={12}>
                            <Slider
                                min={item.minScore}
                                max={item.maxScore}
                                onChange={(value) => updateScore(value)}
                                value={(currentCategory === undefined
                                    || currentCategory[itemIdx] === undefined)
                                    ? "" : currentCategory[itemIdx].score}
                            />
                        </Col>
                        <Col span={4}>
                            <InputNumber
                                required
                                min={item.minScore}
                                max={item.maxScore}
                                style={{ margin: '0 16px' }}
                                onChange={(value) => updateScore(value)}
                                value={(currentCategory === undefined
                                    || currentCategory[itemIdx] === undefined)
                                    ? "" : currentCategory[itemIdx].score}
                            />
                        </Col>
                    </Row>
                </div>
            )
        }
        </>
    )
}
