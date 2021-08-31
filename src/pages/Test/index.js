import React, { memo, useEffect, useState } from "react";
// import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import HeaderComponent from '../../components/HeaderCom/index.js'
import EduListNav from '../../components/EduListNav'
import IconListComponent from '../../components/IconListCom/index.js'

import { searchTitleConfigWhite } from '@/resource'
import { formatDate } from '@/common/utils.js'


//接口
import { GetTestList, GetPaperList } from '@/interface'


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




const TestComponent = props => {
    const { params } = props.location
    console.log(params)
    
    //组件内数据
    const BannerUrl = require(`../../assets/img/编组 2.svg`).default
    const TestMainData = [
        {
            id: 1,
            name: 'chapter',
            title: '章节练习',
            infoTitle: '章节练习',
            icon: '章节练习.png'
        },
        {
            id: 2,
            name: 'multiple',
            title: '综合模考',
            infoTitle: '综合模考',
            icon: '综合模考.svg',
            showItem: [1,2,3,5]
        },
    ]
    
    const [ testListConfig, settestListConfig ] = useState({
        headerTitle: '测试记录',
        swiperConfig:[0, 2],
        list:[]
    })


    const TestNavSeItem = item => {
        console.log(item)
        props.history.push({
            pathname: '/app/selectTop',
            params: { ...item, from: 'test'}
        })
    }

    const randerDom = () => {
        return TestMainData.map(item => {
            let iconSrc = require(`../../assets/img/${item.icon}`).default
            return (
                <div className = 'TestNavSeItem' key = { item.id } onClick = { e => TestNavSeItem(item) }>
                    <img src = { iconSrc } alt = ''/>
                    <span>{ item.title }</span>
                </div>
            )
        })

    }

    // 后台接口
    useEffect( async () => {
        //测试记录
        let TestList = await GetTestList().then(res => res).catch(err => err )
        console.log(TestList)
        // TestList = tt
        
        if( TestList.code === 0 ) {
            console.log(TestList.t)
            // let list = TestList.t.map( ({ tpName:title, time:examTime, dtos  }) =>  
            //      ({  title, examTime: `${examTime}分钟`, status:'已完成', type:'exam', dtos }))
                 
            let list = TestList.t.map( ({ createTime, correct, error, id, examType  }) =>  
            ({  title: examType === 1? `章节练习`:'综合模考', createTime: formatDate(createTime), score:correct || '0', type:'exam', id }))
            settestListConfig({ ...testListConfig, list  })
        }

        
    }, []);


    return (
        <div className = 'Test'>
            <HeaderComponent titleConfig = { searchTitleConfigWhite} theme = 'white'/>
            
            <EduListNav theme = 'blue'/>

            <div className = 'TestBanner'>
                <img src = { BannerUrl } alt = ''/>
            </div>
            <div className = 'TestNavSe'>
                { randerDom() }
            </div>
            <div className = 'testMainTitle'>测试记录</div>
            
            <div className = 'IconListContainer'><IconListComponent navConfig = { testListConfig }/></div>

        </div>
        
    )
}

export default memo(TestComponent)