import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Radio, Checkbox, InputItem, TextareaItem  } from 'antd-mobile'; 

import { orderString } from '@/common/utils'
import { SAVE_ALL_ANSWERS } from '@/store/actionTypes/index.type';


import './index.less'  


let saveBlankVals = {}
const ExerciseComponent = props => {
    console.log(props)
    const { content, exerciseNum, total } = props
    const {  allAnswersObj }  = useSelector( state => state.selectTopicdRe , shallowEqual)

    //redux 方法
    const dispatch = useDispatch()
    
        
    const [values, setvalues] = useState([]);
    const [anwserShow, setanwserShow] = useState(false);

    //选择题触发
    const singleChange = value => {
        let valList = [ value ]
        if( content.type === 3 ){
            valList = values.includes(value)? 
                        values.filter(item => item !== value) : 
                        orderString([ ...values, value ], 'arr')
        }
        
        setvalues(valList);
        saveMyAnswer(valList.join(''))
    };

    //天空简答触发
    const blankChange = (i,val) => {
        saveBlankVals[i] = val
        let myAns = Object.values(saveBlankVals).reduce((pre, item) => `${pre}|${item}`)
        saveMyAnswer(myAns)
    }

    //保存答案
    const saveMyAnswer = val => {
        console.log(val)
        let pyload = {}
        pyload['tpiId'] = exerciseNum
        pyload['id'] = content.id
        pyload['answer'] = val
        pyload['answerOld'] = content.answer
        pyload['correct'] = content.answer === val
        dispatch({ type: SAVE_ALL_ANSWERS, pyload })
    }


    const answerRandom = () => (
        <div  className = 'LearnMainAnswerShow'>
            <div>
            <span>答案: </span> 
            { content.type === 4 ?content.answer.split('|').join('、') : content.answer }
            </div>
            <div>
            <span>答案解析: </span> 
            { content.analysis }
            </div>
        </div>
    )

    //选择题选项
    const selectTypeRandom = datas => {
        let DOM = content.type === 3? Checkbox.CheckboxItem: Radio.RadioItem;
        return (
            datas.map(i => (
                <DOM key={i.value}
                    checked={values.includes(i.value)} 
                    onClick={e => singleChange(i.value)} 
                    className = { `LearnMainRadio ${values.includes(i.value)? 'LearnMainSelected': ''}` }
                    >
                    {  `${i.value}: ${i.label}`  }
                </DOM>
            ))
        )
    }

    //填空简答选线
    const addBlankRandom = datas => {
        let DOM = content.type === 4? InputItem: TextareaItem;
        console.log(datas)
        return (
            datas.map(i => (
                <div className = { content.type === 4?'blankContailer': 'type5Contailer'} key={i.value}>
                    <DOM
                        value = { saveBlankVals[i.value] }
                        onChange={v => blankChange(i.value,v) }
                        labelNumber = {2}
                        autoHeight
                        rows = { 5 }
                    >{i.value}.</DOM>
                </div>
            ))
        )
    }

    const randerDom = () => {
        let types = [ '判断题', '单选题', '多选题', '填空题', '简答题' ]
        let selecetKeyCode =  [4,5].includes(content.type) ? 49: 65
        let options = ([4,5].includes(content.type) ? content.answer: content.options) || ''
        let datas = options.split('|').map( (item, index) => ({value: String.fromCharCode(selecetKeyCode + index) ,label: item}) )
        let type5Data = [{value:1, lebel:''}]
        console.log(datas)
        return (
            <div>
                <div  className = 'LearnMainExpreNum'> { `第${exerciseNum}题：[ ${ types[content.type -1] } ${exerciseNum}/${total} ]` }</div>
                <div className = 'LearnMainExpreTitle'>
                    { content.title }
                </div>
                <div className = 'LearnMainExpreSelect'>
                    { content.type === 4 ? addBlankRandom(datas): content.type === 5 ? addBlankRandom(type5Data): selectTypeRandom(datas) }
                </div>
                <div  className = 'LearnMainLookAnswer' onClick = { e => setanwserShow(true) }>
                    查看答案
                </div>
                { anwserShow? answerRandom(): null }
            </div>
        )

    }

    // 获取答案
    useEffect( async () => {
        console.log(allAnswersObj[exerciseNum])
        let myHistoryAns = allAnswersObj[exerciseNum]
        let selectVal = []
        let blankVal = {}
        if(myHistoryAns && [1,2,3].includes(content.type)){
            selectVal = myHistoryAns.answer.split('') 
        }
        if(myHistoryAns && [4, 5].includes(content.type)){
            blankVal = myHistoryAns.answer.split('|').reduce((pre, item, index) => (pre[index + 1] = item) && pre,{})
        }
        setvalues(selectVal)
        saveBlankVals = blankVal
        setanwserShow(false)
    }, [exerciseNum]);

    
    useEffect( () => {
        return () => {
            console.log(66666666)
        }
    }, []);


    return (<div className = 'LearnMainExpreCon'>{ randerDom() }</div>)
}

export default memo(ExerciseComponent)