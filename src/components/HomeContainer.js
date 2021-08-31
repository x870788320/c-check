import React, { memo } from 'react'
import  { renderRoutes }  from "../router/renderRoutes";
import { shallowEqual, useSelector } from 'react-redux'

import FooterComponent from './FooterCom/index.js'

import './HomeContainer.less'

export default memo(function HomeContainer(props) {
    const { route } = props

    const { loginStatus }  = useSelector( state => state.indexRe)
    return (
        <div className = 'homeContainer'>
            {/* 这里的路由需要登录认证 */}
            <div className = 'homeMain'>
                {renderRoutes(route.routes, loginStatus)}
            </div>
            <FooterComponent/>
        </div>
    )
})
