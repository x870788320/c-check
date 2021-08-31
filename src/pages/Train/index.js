import React, { memo } from "react";
import { useDispatch, useSelector } from 'react-redux'

import HeaderComponent from '../../components/HeaderCom/index.js'
import EduListNav from '../../components/EduListNav'

import { searchTitleConfigWhite } from '@/resource'
import { AREA_AND_TYPE_SELECT } from '@/store/actionTypes/index.type';


import './index.less'

const TrainComponent = props => {
    console.log(props)
    
    //组件内数据
    const BannerUrl = require(`../../assets/img/训练banner.svg`).default
    const dispatch = useDispatch()
    const { stydyTitleSeList }  = useSelector( state => state.homeRe )

    const trainMainData = [
        {
            id: 1,
            title:'基础能力训练',
            children:[
                {
                    id: 1,
                    name: 'electric',
                    title: '电工基础',
                    infoTitle: '电工训练基础',
                    icon: '电工基础.svg',
                    bkgColor: '#FF6883'
                },
                {
                    id: 2,
                    name: 'hot',
                    title: '热工基础',
                    infoTitle: '热工训练基础',
                    rightTitle: '我的错题',
                    icon: '热工基础.svg',
                    bkgColor: '#FFCE3E'
                },
                {
                    id: 3,
                    name: 'law',
                    title: '法律基础',
                    infoTitle: '法律训练基础',
                    icon: '法律基础.svg',
                    bkgColor: '#22526E'
                },
                {
                    id: 4,
                    name: 'stanard',
                    title: '标准基础',
                    infoTitle: '标准训练基础',
                    icon: '标准基础.svg',
                    bkgColor: '#65CAFF'
                },
            ]
        },
        {
            id: 2,
            title:'应用能力训练',
            children:[
                {
                    id: 1,
                    name: 'object',
                    title: '实物辨识',
                    infoTitle: '实物辨识训练',
                    icon: '实物辨识.svg',
                    bkgColor: 'linear-gradient(135deg, #7F61D3 0%, #6F19D7 100%)'
                },
                {
                    id: 2,
                    name: 'hot',
                    title: '计算分析',
                    infoTitle: '计算分析训练',
                    icon: '计算分析.svg',
                    bkgColor: ' linear-gradient(-46deg, #451FCF 0%, #1168B9 99%)'
                }
            ]
        }
    ]



    const trainMainItem = (item, cArr) => {
        console.log(item)
        console.log(cArr)
        console.log(stydyTitleSeList)
        let subjectType = stydyTitleSeList && stydyTitleSeList[cArr[0]]['childs'][cArr[1]]
        console.log(subjectType)
        dispatch({ type: AREA_AND_TYPE_SELECT, pyload: {subjectType: subjectType.id} })
        props.history.push({
            pathname: '/app/selectTop',
            params: { ...item, from: 'train', showItem: [1,2,4,5]}
        })
    }

    const randerDom = () => {
        return trainMainData.map((item,index) => {
            return (
                <div className = 'trainMain' key = { item.id }>
                    <div className = 'trainMainTitle'> { item.title } </div>
                    <div className = 'trainMainItemCon'>
                        {
                            item.children.map((child, cIndex) => {
                                let iconSrc = require(`../../assets/img/${child.icon}`).default
                                return (
                                    <div className = 'trainMainItem'  key = { child.id } style = { { 'background': child.bkgColor} }  onClick = { e => trainMainItem(child, [index, cIndex]) }>
                                        <img src = { iconSrc } alt = ''/>
                                        <span>{ child.title }</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        })

    }


    return (
        <div className = 'train'>
            <HeaderComponent titleConfig = { searchTitleConfigWhite} theme = 'white'/>
            
            <EduListNav theme = 'blue'/>

            <div className = 'trainBanner'>
                <img src = { BannerUrl } alt = ''/>
            </div>
            { randerDom() }
        </div>
        
    )
}

export default memo(TrainComponent)