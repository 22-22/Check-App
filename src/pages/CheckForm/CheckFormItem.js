import React from 'react';
import { Slider, InputNumber, Row, Col, Radio, Input } from 'antd';
const { TextArea } = Input;

export const CheckFormItem = ({
    categoryName, item, score, setScore, itemIdx,
    role, selfCheck, customCategory, checkType, draft
}) => {
    const currentCategory = score[categoryName];

    const updateScore = (value, name) => {
        const valueChecked = (name === 'score' && typeof value !== 'number')
            ? "" : value;
        const newCategoryArray = score[categoryName].slice();
        if (newCategoryArray[itemIdx]) {
            newCategoryArray[itemIdx][name] = valueChecked.toString();
        } else {
            newCategoryArray[itemIdx] = ({ [name]: valueChecked.toString() })
        }
        setScore({ ...score, [categoryName]: newCategoryArray });
    }

    const countHalfValue = () => {
        const { minScore, maxScore } = item;
        const biggerValue = Math.abs(maxScore) > Math.abs(minScore) ? maxScore : minScore;
        return Math.round(biggerValue / 2);
    }

    const required =
        checkType !== 'self'
            && draft !== 'selfCheckDraft'
            && currentCategory[itemIdx]
            && selfCheck.selfGradeDetails[categoryName]
            && selfCheck.selfGradeDetails[categoryName][itemIdx].score
            !== currentCategory[itemIdx].score
            || categoryName === customCategory
            ? true : false

    return (
        <>{
            (!item.checkByMentorOnly
                || item.checkByMentorOnly && role === 'mentor'
            ) && (
                <div className="checkform__item">
                    <div>
                        <div>
                            Max points:
                            <span className="checkform__item-points">
                                &nbsp;{item.maxScore}
                            </span>
                        </div>
                        {
                            checkType !== 'self' &&
                            draft !== 'selfCheckDraft' &&
                            selfCheck.selfGradeDetails[categoryName] &&
                            selfCheck.selfGradeDetails[categoryName][itemIdx] && (
                                <div>
                                    Self-check:
                                    <span className="checkform__item-points">
                                        &nbsp;{selfCheck.selfGradeDetails[categoryName][itemIdx].score}
                                    </span>
                                </div>
                            )}
                        {categoryName === customCategory && (
                            <div>
                                Min points:
                                <span className="checkform__item-points">
                                    &nbsp;{item.minScore}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="checkform__item-description">
                        <p>{item.description}</p>
                        <TextArea
                            className="checkform__item-textarea"
                            required={required}
                            name="comment"
                            value={!currentCategory[itemIdx]
                                ? "" : currentCategory[itemIdx].comment}
                            onChange={(e) => updateScore(e.target.value, e.target.name)}
                        />
                        {
                            checkType !== 'self' &&
                            draft !== 'selfCheckDraft' &&
                            selfCheck.selfGradeDetails[categoryName] &&
                            selfCheck.selfGradeDetails[categoryName][itemIdx] &&
                            selfCheck.selfGradeDetails[categoryName][itemIdx].comment &&
                            (<p className="checkform__item-self--comment">
                                Student's comment:&nbsp;
                                {selfCheck.selfGradeDetails[categoryName][itemIdx].comment}
                            </p>)
                        }
                    </div>
                    <div className="checkform__item-scores">
                        <Row>
                            <Col span={12}>
                                <Slider
                                    min={item.minScore}
                                    max={item.maxScore}
                                    onChange={(value) => updateScore(value, 'score')}
                                    value={!currentCategory[itemIdx]
                                        ? "" : currentCategory[itemIdx].score}
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    className="checkform__scores-input"
                                    min={item.minScore}
                                    max={item.maxScore}
                                    onChange={(value) => updateScore(value, 'score')}
                                    value={!currentCategory[itemIdx]
                                        ? "" : currentCategory[itemIdx].score}
                                />
                            </Col>
                        </Row>
                        {
                            categoryName !== customCategory && (
                                <Radio.Group name="score"
                                    onChange={(e) => updateScore(e.target.value, e.target.name)}
                                    value={!currentCategory[itemIdx]
                                        ? "" : +currentCategory[itemIdx].score}
                                >
                                    <Radio className="radioStyle" value={item.minScore}>
                                        Не выполнено
                                </Radio>
                                    <Radio className="radioStyle" value={countHalfValue()}>
                                        Частично
                                </Radio>
                                    <Radio className="radioStyle" value={item.maxScore}>
                                        Полностью
                                </Radio>
                                </Radio.Group>
                            )}
                    </div>
                </div>
            )
        }
        </>
    )
}
