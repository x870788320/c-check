import React, { memo, useState } from "react";
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AREA_AND_TYPE_SELECT } from '@/store/actionTypes/index.type';

import './index.less'



const NavComponent = props => {
    const { navConfig, defaultVal } = props

    const [selectId, setSelectId] = useState(defaultVal || 0);
    
    //redux 方法
    const dispatch = useDispatch()

    const navItemClick = item => {

        setSelectId(item.id)
        
        let pyload = {}
        if(navConfig.name ){
            pyload[navConfig.name] = item.id
            dispatch({ type: AREA_AND_TYPE_SELECT, pyload })
        }  
        

        item.link && props.history.push({
            pathname: item.link,
            params: item
        })
    }

    const randerDom = () => {
        const { list, theme, needDownLine } = navConfig
        return list.map(item => {
            let iconUrl = null
            if( item.icon ){
                iconUrl = require(`../../assets/img/${item.icon}`).default
            }
            
            return (
                <div className = { `navComItem navCom${ theme }`}  onClick = { e => navItemClick(item) }  key={item.id}>
                    { item.icon ? <div><img src = { iconUrl} alt = ''/></div>: null }
                    <div className = { `navComItem navComText${ selectId === item.id ? theme: '' }`} >{ item.title }</div>
                    { needDownLine && (selectId === item.id) ? <div className = { `navComItemSe navComSe${ theme }`} ></div>: <div className = 'navComItemSe navComItemSeNul' ></div> }
                </div>
            )    
        })
    }

    return (
        <div className = { `navCom navCom${ navConfig.textAlign }`}>
            { randerDom() }
        </div>
    )
}

export default memo(withRouter(NavComponent))