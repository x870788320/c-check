import React, { memo, useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { SearchBar } from 'antd-mobile';

import HeaderComponent from '../../components/HeaderCom/index.js'
import EduListNav from '../../components/EduListNav'
import IconListComponent from '../../components/IconListCom/index.js'

import { textPositionConfig } from '@/resource'
import { GetArticleListAction } from '@/store/actionCreate';


import './index.less'

const SearchComponent = props => {
    console.log(props)

    
    const { areaAndTYpeSelect }  = useSelector( state => state.indexRe , shallowEqual)
    const { searchArticleList }  = useSelector( state => state.searchRe , shallowEqual)
    const dispatch = useDispatch()
    
    console.log(areaAndTYpeSelect)

    const [ searchConfig, setsearchConfig ] = useState({
        swiperConfig:[0, 2],
        list:[]
    })

    // let autoFocusInst = Inst => {
    //     Inst && Inst.focus();
    // }
    
    const searchSubmit = val => {
        console.log(val, 'onSubmit')
        let params = {
            page: 1,
            rows: 30,
            title: val
        }
        dispatch(GetArticleListAction(params, true));
    }

    
    
    useEffect( () => {
        let list = searchArticleList.map( ({ addr, cover, descr, id, title, planCategory:{ name:classTy } }) =>  
                ({  addr, cover, descr, id, title, classTy }))
                setsearchConfig({ ...searchConfig, list  })
    }, [searchArticleList]);


    return (
        <div className = 'search'>
            <HeaderComponent titleConfig = { textPositionConfig('实务应用')} theme = 'white'/>
            
            <EduListNav theme = 'blue' navChangeName = 'seartchIndustryType' />
            
            <div  className = 'searchCon'>
                <SearchBar placeholder="请输入查询内容"
                //   ref={ ref => autoFocusInst(ref) }
                  onSubmit={value => searchSubmit(value)}
                 />
            </div>
            
            <div className = 'searchMainTitle'>
                <span>为您找到</span>
                <span className = 'searchMainTitleRight'>共{ searchArticleList.length }个搜索结果</span>
            </div>

            
            <div className = 'IconListContainer'><IconListComponent navConfig = { searchConfig }/></div>
        </div>
        
    )
}

export default memo(SearchComponent)