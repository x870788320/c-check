import React, { memo, useState } from "react";
import { withRouter } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { SearchBar } from 'antd-mobile';
import { Picker } from 'antd-mobile';
import { EnvironmentOutlined } from '@ant-design/icons';

import Mine from '../Mine/index.js'


import { AREA_AND_TYPE_SELECT } from '@/store/actionTypes/index.type';
import { GetArticleListAction } from '@/store/actionCreate';
import { citys } from '../../resource/city'


import './index.less'  

const HeaderComponent = props => {
    const { titleConfig, theme } = props

    //组件内数据
    const { areaAndTYpeSelect:{ province, city } }  = useSelector( state => state.indexRe , shallowEqual)
    const {  allAnswersObj }  = useSelector( state => state.selectTopicdRe , shallowEqual)
    const [ posiVal, setposiVal] = useState([province, city]);


    //redux 方法
    const dispatch = useDispatch()

    const changeArea = v => {
        setposiVal(v)

        let pyload = { province: v[0], city: v[1] }
        dispatch({ type: AREA_AND_TYPE_SELECT, pyload })
    }

    const searchSubmit = val => {
        console.log(val, 'onSubmit')
        let params = {
            page: 1,
            rows: 30,
            title: val
        }
        dispatch(GetArticleListAction(params, true));
        props.history.push('/app/search')
    }
    
    const leftBack = () => props.history.goBack()

    const headerClickCallback = pos => {
        let fn = new titleConfig.fn()
        if(fn.position === pos){
            fn.callback()
        }
    } 
    
    const randerDom = position => {
        const { type, val } = titleConfig[position]
        let iconUrl = null
        let newVal = val
        if( (type === 2) && val ) {
            iconUrl = require(`../../assets/img/${val}`).default
            console.log(iconUrl)
        }
        if( val === '得分' ){
            console.log(allAnswersObj)
            let answers = Object.values(allAnswersObj) || []
            let correctVal = answers.filter(item => item.correct).length
            console.log(answers.filter(item => item.correct).length)
            newVal = `${val}:${correctVal}`
        }
        
 
        let left = [
            <div></div>,
            <div>{ val }</div>,
            <div onClick = { e => leftBack() }><img src = { iconUrl}  style={{width:'16px',height:'16px'}} alt = ''/></div>,
            <div className = 'headerPositionCon'>
                <EnvironmentOutlined className =  {`headerPositionicon headerPositionicon${theme}`} />
                <Picker
                    data={citys}
                    value={posiVal}
                    cols = {2}
                    onChange={v => changeArea(v)}
                    onOk={() => console.log('seccess')}
                    onDismiss={() => console.log('cancle')}
                    >
                        <div className = {`headerPosition headerPosition${theme}`}>{ posiVal[posiVal.length - 1] }</div>
                </Picker>
            </div>
        ]
        
        let center = [
            <div></div>,
            <div className = 'headerTextCon'>{ val }</div>,
            <div><img src = { iconUrl} alt = ''/></div>,
            <div className = {`headerInputCon headerInputCon${theme}`}>
                <SearchBar 
                    className = 'headerSearch'
                    cancelText = ''
                    placeholder="请输入查询内容"
                    onSubmit={value => searchSubmit(value)}
                 />
            </div>
        ]
        let right = [
            <div></div>,
            <div className = 'headerRightText' onClick = { e => headerClickCallback('right') }>{ newVal }</div>,
            <Mine mineConfig = { val }/>
        ]
        let Doms = { left, center, right }
        return Doms[position][type]
    }

    return (
        <div className = { `header header${ theme }` }>
            <div className = 'headerLeft'>
                { randerDom('left') }
            </div>
            <div className = 'headerCenter'>
                { randerDom('center') }
            </div>
            <div className = 'headerRight'>
                { randerDom('right') }
            </div>
        </div>
    )
}

export default memo(withRouter(HeaderComponent))