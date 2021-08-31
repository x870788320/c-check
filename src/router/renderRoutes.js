import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Toast } from 'antd-mobile';

/**
 * 
 * @param {*} routes 路由数组
 * @param {*} authed 已经认证的权限，字符串，可以改为数组
 * @param {*} authPath 没有权限时的默认跳转页
 * @param {*} multipleRoutes 后端给的动态路由
 * @param {*} extraProps 给route上加的属性
 * @param {*} switchProps 给switch加的属性
 * @returns 
 */
export const renderRoutes = ( routes, authed, authPath = '/login', multipleRoutes, extraProps = {}, switchProps = {} ) => {
    let allRoutes = []
    //如果权限为数组此处可以更改逻辑
    if(authed) authed = String(authed);
    //遍历routes，return 所有的route，方法的主要逻辑
    const mapFunc = R => R.map( (route, index) => 
        (<Route
            key = { route.key || index }
            path = { route.path }
            exact = { route.exact }
            strict = { route.strict }
            render = { props => {
                route.authed = authed
                //把数字变为字符串
                if(typeof route.auth == 'string' || typeof route.auth == 'number'){
                    route.auth = [route.auth.toString()]
                } else if(Object.prototype.toString.call(route.auth) === "[object Array]"){
                    route.auth.forEach((val, idx) => (route.auth[idx] = String(val)));
                }
                //全部不需要权限，单独不需要权限，有权限
                console.log(authed)
                console.log(!route.exact)
                console.log(route)
                console.log((route.auth && route.auth.includes(authed) && sessionStorage.getItem("c-token")))
                if( authed === undefined || !route.exact || ( sessionStorage.getItem("c-token")) ){
                    return route.render?
                            route.render({...props, ...extraProps, route}):
                            route.component && <route.component { ...props } {...extraProps} route = {route}/>
                } else {
                    Toast.info('请先登录!', 1);
                    return <Redirect to = {{pathname:authPath, message:'请登录后操作！'}} />
                }
            }}
        />
    ))

    routes && allRoutes.push(
        <Switch {...switchProps} key = "SwitchRoutes">
            {mapFunc(routes)}
        </Switch>
    )
    //根据后台的具体动态路由数据操作
    multipleRoutes && allRoutes.unshift(...mapFunc(multipleRoutes))

    return allRoutes
}