import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import NavCom from '../../components/NavCom/index.js'

import { CHANGE_INDUSTRY_NAV_COM } from '@/store/actionTypes/index.type';
//接口
import { GetIndustryType, GetSubjectType } from '@/interface'

import './index.less'  

const EduListComponent = props => {
    console.log(props)
    const { theme, navChangeName } = props

    //行业Nav的配置项
    const { industryNavCon }  = useSelector( state => state.indexRe )
    const { areaAndTYpeSelect }  = useSelector( state => state.indexRe , shallowEqual)

    console.log(areaAndTYpeSelect)

    //redux 方法
    const dispatch = useDispatch()

    // const [ navConfig, setnavConfig ] = useState(industryNavCon)

    // if( navChangeName ){
    //     let config = { ...navConfig, name: navChangeName }
    //     setnavConfig(config)
    // }
    let navConfig = { ...industryNavCon, name: (navChangeName || industryNavCon.name) }
    let defaultVal = navChangeName? areaAndTYpeSelect.seartchIndustryType :areaAndTYpeSelect.industryType
    
    // 后台接口
    useEffect( async () => {
        // 更改nav主题
        let pyload = { theme:theme || 'white' }
        dispatch({ type: CHANGE_INDUSTRY_NAV_COM, pyload })
    }, []);

    // 后台接口
    useEffect( async () => {
        //行业类型
        if(industryNavCon.list.length <= 1){
            let IndustryTypeList = await GetIndustryType().then(res => res).catch(err => err )
            console.log(IndustryTypeList)
            if(IndustryTypeList.code === 0 ){
                let pyload = {list : IndustryTypeList.t.map( item => ( item.title = item.name ) && item ) }
                console.log(pyload)
                await dispatch({ type: CHANGE_INDUSTRY_NAV_COM, pyload })
            }
        }
    }, []);

    useEffect( () => {

    }, [] )

    return (<div className = {`industryContainer industryContainer${theme}`}><NavCom navConfig = { navConfig } defaultVal = { defaultVal }/></div>)
}

export default memo(EduListComponent)