import React, { memo } from "react";
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { SwipeAction } from 'antd-mobile';
import { Toast } from 'antd-mobile';


import { AddEducollect, RemoveEducollect, AddEdudownload, AddEdurecord, GetPaperListById } from '@/interface'

import { formatDate } from '@/common/utils.js'
import { GET_TEST_LIST_BY_ID } from '@/store/actionTypes/index.type';

import './index.less'

const IconListComponent = props => {
    const { navConfig, updateFn } = props
    const imgUrl = sessionStorage.getItem("c-imgUrl")
    
    //redux 方法
    const dispatch = useDispatch()

    //顺序控制显示顺序
    const allShowType = {
        // 第二行
        classTy: '分类',
        status: '状态',
        score: '得分',

        //第三行
        descr: '简介',
        createTime: '开始时间',
        examTime: '考试时间',
        startTime: '开始时间',
        collectTime: '日期'

    }

    //滑块显示内容
    const rightConfg = item => ([
        {
            text: '收藏',
            onPress: () => swiperClick(1, item),
            style: { width: '92px', backgroundColor: '#5AA9E6', color: 'white', display: 'flex', flexDirection: 'column' },
            className: 'IconListSwiperBtn'
        },
        {
            text: '取消收藏',
            onPress: () => swiperClick(2, item),
            style: { width: '92px', backgroundColor: '#ECB135', color: 'white', display: 'flex', flexDirection: 'column' },
            className: 'IconListSwiperBtn'
        },
        {
            text: '下载',
            onPress: () => swiperClick(3, item),
            style: { width: '92px', backgroundColor: '#36CA75', color: 'white', display: 'flex', flexDirection: 'column' },
            className: 'IconListSwiperBtn2'
        },
    ])
    

    //每项的点击事件
    const navItemClick = async item => {
        console.log(item)

        if(item.addr && (item.addr.slice(-3, item.addr.length) !== 'pdf')){
            Toast.info('不支持的文档格式!', 1);
            return 
        }
        //如果是考试或者测试跳转题页
        if( item.type === 'exam' ){
            let listById = await GetPaperListById(item.id).then(res => res).catch(err => err )
            
            if( listById.code === 0 ){
                let pyload = listById.t
                dispatch({ type: GET_TEST_LIST_BY_ID, pyload })
            }
            let curParams = {
                rightTitle:'',
                title: (navConfig && navConfig.headerTitle) || '记录',
                from: item.type,
                noExitShow: true,
                // dtos:item.dtos
            }
            props.history.push({
                pathname: '/app/learn',
                params: curParams
            })
            return
        }
        
        //大多数的跳转
        props.history.push({
            pathname: '/app/sdudyInfo',
            params: `${imgUrl}${item.addr}`
        })

        //学习记录后端接口存一下
        let time = new Date()
        let params = {
            eduId : item.id,
            startTime : formatDate(time),
            endTime: formatDate(time),
            learnTime : 1523,
        }
        AddEdurecord(params).then(res => console.log(res))
        
    }

    //滑出的点击事件
    const swiperClick = async(type, item) => {
        console.log(item)
        if(type === 3) {
            AddEdudownload(item.id).then(res => res).catch(err => err )
            return 
        }
        const interfaces = [ AddEducollect, RemoveEducollect ]
        let changeEdu = await interfaces[type - 1](item.id).then(res => res).catch(err => err )
        Toast.info(changeEdu.message, 1);
        if( changeEdu.code === 0 ){
            updateFn && updateFn() 
        }
    }

    //显示封面图片
    const coverImgUrl = ( img, type) => {
        let iconUrl = require(`../../assets/img/studyDefault.jpeg`).default
        if( type ){
            iconUrl = require(`../../assets/img/examIcon.svg`).default
        }
        if(img){
            iconUrl = `${imgUrl}${img}`
        }
        return iconUrl
    } 

    const ItemRightDom = item => Object.keys(allShowType).filter(key => item[key]).map( (key,i) => (
            <div  className = 'IconListItemRightContent' key = { i }>
                <div className = 'overEllipsis'>{ allShowType[key] }: </div>
                <div className = 'overEllipsis'> { item[key] }</div>
            </div>
        )
    )

    const randerDom = () => {
        const { list, swiperConfig } = navConfig
        return list && list.map((item,i) => (
            <div className = 'IconListSwipeContainer' key = {item.id || i}>
                <SwipeAction
                    style={{ backgroundColor: 'gray' }}
                    autoClose
                    right={ rightConfg(item).filter( ( m,i) => swiperConfig.includes(i)) }
                    onOpen={() => console.log('global open')}
                    onClose={() => console.log('global close')}
                    >
                    <div className = 'IconListComItem' onClick = { e => navItemClick(item) } >
                        <div className = 'IconListItemLeft'>
                            <img src = { coverImgUrl(item.cover, item.type) } alt = '' />
                        </div>
                        <div  className = 'IconListItemRight'>
                            <div  className = 'IconListItemRightTitle'>{ item.title }</div>
                            { ItemRightDom(item) } 
                        </div>
                    </div>
                </SwipeAction>
            </div>
        ) )

    }

    return (
        <div className = 'IconListCom'>
            {  randerDom() }
        </div>
    )
}

export default memo(withRouter(IconListComponent))