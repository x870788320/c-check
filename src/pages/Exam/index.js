import React, { memo, useEffect, useState } from "react";
// import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import HeaderComponent from '../../components/HeaderCom/index.js'
import EduListNav from '../../components/EduListNav'
import IconListComponent from '../../components/IconListCom/index.js'

import { searchTitleConfigWhite } from '@/resource'


//接口
import { GetPaperList } from '@/interface'


import './index.less'


const tt = {
    "code": 0,
    "success": true,
    "t": {
        "msg": "你有一个培训：701计划2 类型：701车间，考试开始时间：2019-03-14 11:15",
        "body": [{
            "dtos": [{
                "answer": "A",
                "id": 1,
                "options": "正确|错误",
                "planType": "701车间",
                "title": "高处作业高度在15m以上至30m时，发生的事故基本上是死亡事故。",
                "tpiId": 16,
                "type": 1
            }, {
                "answer": "A",
                "id": 2,
                "options": "正确|错误",
                "planType": "701车间",
                "title": "高处坠落、物体打击、坍塌、机械伤害（包括起重伤害）、触电是生产过程中最常发生的“五大伤害”事故。",
                "tpiId": 17,
                "type": 1
            }, {
                "answer": "A",
                "id": 3,
                "options": "安全生产保护|学习安全生产知识|危险告知和报告|遵守本单位的安全生产规章制度",
                "planType": "701车间",
                "title": "《安全生产法》规定，生产经营单位的从业人员有依法获得（ ）的权利，并应当依法履行安全生产方面的义务。 ",
                "tpiId": 18,
                "type": 2
            }, {
                "answer": "ABCD",
                "id": 4,
                "options": "高处作业人员未佩戴\u0028或不规范佩戴\u0029安全带|使用不规范的操作平台|使用不可靠立足点|冒险或认识不到危险的存在",
                "planType": "701车间",
                "title": "常见容易造成的高处作业的违章行为包括:\u0028   \u0029。",
                "tpiId": 19,
                "type": 3
            }],
            "time": 5,
            "tpId": 5,
            "tpName": "考试1"
        }, {
            "dtos": [{
                "answer": "A",
                "id": 1,
                "options": "正确|错误",
                "planType": "701车间",
                "title": "高处作业高度在15m以上至30m时，发生的事故基本上是死亡事故。",
                "tpiId": 24,
                "type": 1
            }, {
                "answer": "A",
                "id": 3,
                "options": "安全生产保护|学习安全生产知识|危险告知和报告|遵守本单位的安全生产规章制度",
                "planType": "701车间",
                "title": "《安全生产法》规定，生产经营单位的从业人员有依法获得（ ）的权利，并应当依法履行安全生产方面的义务。 ",
                "tpiId": 25,
                "type": 2
            }, {
                "answer": "ABCD",
                "id": 4,
                "options": "高处作业人员未佩戴\u0028或不规范佩戴\u0029安全带|使用不规范的操作平台|使用不可靠立足点|冒险或认识不到危险的存在",
                "planType": "701车间",
                "title": "常见容易造成的高处作业的违章行为包括:\u0028   \u0029。",
                "tpiId": 26,
                "type": 3
            }],
            "time": 5,
            "tpId": 7,
            "tpName": "132"
        }, {
            "dtos": [{
                "answer": "A",
                "id": 1,
                "options": "正确|错误",
                "planType": "701车间",
                "title": "高处作业高度在15m以上至30m时，发生的事故基本上是死亡事故。",
                "tpiId": 27,
                "type": 1
            }, {
                "answer": "A",
                "id": 3,
                "options": "安全生产保护|学习安全生产知识|危险告知和报告|遵守本单位的安全生产规章制度",
                "planType": "701车间",
                "title": "《安全生产法》规定，生产经营单位的从业人员有依法获得（ ）的权利，并应当依法履行安全生产方面的义务。 ",
                "tpiId": 28,
                "type": 2
            }, {
                "answer": "ABCD",
                "id": 4,
                "options": "高处作业人员未佩戴\u0028或不规范佩戴\u0029安全带|使用不规范的操作平台|使用不可靠立足点|冒险或认识不到危险的存在",
                "planType": "701车间",
                "title": "常见容易造成的高处作业的违章行为包括:\u0028   \u0029。",
                "tpiId": 29,
                "type": 3
            }],
            "time": 3,
            "tpId": 8,
            "tpName": "321"
        }]
    }
}



const ExamComponent = props => {
    console.log(props)
    
    //组件内数据
    const BannerUrl = require(`../../assets/img/考试banner.svg`).default
    const ExamMainData = [
        {
            id: 1,
            name: 'learn',
            title: '学习认证',
            infoTitle: '学习认证',
            icon: '学习认证.svg',
            bkgColor: 'linear-gradient(224deg, #53E2FF 0%, #2D88B8 98%)',
            showItem: [1,2,5]
        },
        {
            id: 2,
            name: 'post',
            title: '岗位认证',
            infoTitle: '岗位认证',
            icon: '岗位认证.svg',
            bkgColor: 'linear-gradient(-41deg, #29A353 10%, #4DE176 100%)',
            showItem: [1,2]
        },
    ]
    
    const [ examListConfig, setexamListConfig ] = useState({
        headerTitle: '考试记录',
        swiperConfig:[],
        list:[]
    })


    const  ExamNavSeItem = item => {
        console.log(item)
        props.history.push({
            pathname: '/app/selectTop',
            params: { ...item, from: 'exam'}
        })
    }

    const randerDom = () => {
        return ExamMainData.map(item => {
            let iconSrc = require(`../../assets/img/${item.icon}`).default
            return (
                <div className = 'TestNavSeItem' key = { item.id } onClick = { e => ExamNavSeItem(item) } style = { { 'background': item.bkgColor } }>
                    <img src = { iconSrc }  style = { { 'width': '48px'} }/>
                    <span>{ item.title }</span>
                </div>
            )
        })

    }

    // 后台接口
    useEffect( async () => {
        //考试记录
        
        // let PaperList = await GetPaperList().then(res => res).catch(err => err )
        // let PaperList = tt
        // console.log(PaperList)
        // if( PaperList.code === 0 ) {
        //     console.log(tt.t)
        //     let list = PaperList.t.body.map( ({ tpName:title, time:examTime, dtos  }) =>  
        //          ({  title, examTime: `${examTime}分钟`, status:'已完成', type:'exam', dtos }))
        //          setexamListConfig({ ...examListConfig, list  })
        // }
    }, []);


    return (
        <div className = 'Exam'>
            <HeaderComponent titleConfig = { searchTitleConfigWhite} theme = 'white'/>
            
            <EduListNav theme = 'blue'/>

            <div className = 'TestBanner'>
                <img src = { BannerUrl } />
            </div>
            <div className = 'TestNavSe'>
                { randerDom() }
            </div>
            <div className = 'testMainTitle'>考试记录</div>
            
            <div className = 'IconListContainer'><IconListComponent navConfig = { examListConfig }/></div>

        </div>
        
    )
}

export default memo(ExamComponent)