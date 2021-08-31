import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { CheckCircleOutlined, CheckCircleFilled } from '@ant-design/icons';
//组件
import HeaderComponent from '../../components/HeaderCom/index.js'
import NavCom from '../../components/NavCom/index.js'
import IconListComponent from '../../components/IconListCom/index.js'
import EduListNav from '../../components/EduListNav'

//静态数据
import {  iconfontConfig, mainStudyConfig } from '@/resource/home.js'
import { searchTitleConfig } from '@/resource'
import { GetArticleListAction } from '@/store/actionCreate';
import { CHANGE_STUDY_NAV_CON, CHANGE_STUDY_ALL_LIST } from '@/store/actionTypes/index.type';

//接口
import { GetSubjectType } from '@/interface'

import './index.less'

const LoginComponent = props => {
    console.log(props)
    
    //组件内数据
    
    //基础知识等导航数据
    const [ StudyType, setStudyType] = useState(1);

    //学习内容列表
    const [ articleNavCon, setarticleNavCon ] = useState(mainStudyConfig)
    //学习内容参数
    const [ showPageData, setshowPageData ] = useState({
        page: 1,
        // rows: 10
    });


    //redux里的state
    const { areaAndTYpeSelect }  = useSelector( state => state.indexRe , shallowEqual)
    //原文列表
    const { ArticleList }  = useSelector( state => state.homeRe)
    //科目Nav的配置项
    const { stydyNavCon }  = useSelector( state => state.homeRe )
    const { stydyTitleSeList }  = useSelector( state => state.homeRe )
    // console.log(stydyTitleSeList)

    //redux 方法
    const dispatch = useDispatch()

    //组件内方法
    //基础知识 应用能力
    const changeStudyType = async item => {
        console.log(item)
        setStudyType(item.id)
        await dispatch({ type: CHANGE_STUDY_NAV_CON, pyload: (item.childs || []) })
    }

    //换页
    const changePage = async () => {
        setshowPageData({
            page: ++showPageData.page,
            rows: 10
        })
        // 获取原文列表   这里需要push
        let params = { ...showPageData, ...areaAndTYpeSelect, isPush: true }
        await dispatch(GetArticleListAction(params));
    }
    

    //对后台数据进行处理
    const interfaceDataInit = ( interList, front = [], after = []  ) => {
        console.log(front)
        if(interList.code !== 0) return []
        if( !interList.t ) return []
        return  { list: [ ...front , ...listNametoTi(interList.t) , ...after ]}
    }

    const listNametoTi = list => list.map( item => {
        item.title = item.name
        item.childs && listNametoTi(item.childs)
        return item
    })

            
    // 生命周期
    // 后台接口
    useEffect( async () => {
        //科目类型  
        if(stydyNavCon.list.length <= 1) {
            console.log('优化，只调用一次！')
            let subjectTypeList = await GetSubjectType().then(res => res).catch(err => err )
            if( subjectTypeList.code === 0 ){
                dispatch({ type: CHANGE_STUDY_ALL_LIST, pyload: interfaceDataInit( subjectTypeList) })
                dispatch({ type: CHANGE_STUDY_NAV_CON, pyload: subjectTypeList.t[0].childs })
            }
        }
    }, []);


    //每次改变数据都会调用
    useEffect( async () => {
        console.log('updateListShow——home')
        //获取原文列表 
        const { city, province, industryType:ptId, subjectType:pcId } = areaAndTYpeSelect
        let params = { ...showPageData, city, province, ptId, pcId}
        // let params = { ...showPageData, ...areaAndTYpeSelect}
        await dispatch(GetArticleListAction(params));
    }, [areaAndTYpeSelect]);
    
    //原文列表更改时刷新页面
    useEffect( () => {
        let list = ArticleList.map( ({ addr, cover, descr, id, title, planCategory:{ name:classTy } }) =>  
                ({  addr, cover, descr, id, title, classTy }))
        setarticleNavCon({ ...mainStudyConfig, list  })
    }, [ArticleList]);
    

    return (
        <div className = 'home'>
            <HeaderComponent titleConfig = {searchTitleConfig}  theme = 'blue'/>
            
            <EduListNav/>
            
            <div className = 'homeLearnNav'><NavCom navConfig = {iconfontConfig}/></div>

            <div className = 'homeLearnTitle'>
                <div className = 'homeLearnTitleLeft'>
                    <div className = 'homeLearnTitleIcon'></div>
                    <div>原文阅读</div>
                </div>
                <div  className = 'homeLearnTitleRight'>
                    {
                        stydyTitleSeList.map( item => {
                            return (
                                <div className = 'TitleRightItem'  onClick = { e => changeStudyType(item) }  key={item.id}>
                                    <div>
                                        { StudyType == item.id? <CheckCircleFilled />:  <CheckCircleOutlined />}
                                    </div>
                                    <div>{ item.title }</div>
                                </div> 
                            )
                        } )
                    }
                    
                </div>
            </div>
                
            <div className = 'studyNavContainer'><NavCom navConfig = { stydyNavCon }/></div>

            <div className = 'IconListContainer'><IconListComponent navConfig = { articleNavCon }/></div>
        </div>
        
    )
}

export default memo(LoginComponent)