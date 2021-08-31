import React, { memo, useState } from "react";
import { withRouter } from 'react-router-dom'
import {  Modal, Toast } from 'antd-mobile';

import { UserLoginOut } from '@/interface'
import { iconfontConfigList } from '@/resource/home.js'


import './index.less'  

const MineComponent = props => {
    const { mineConfig } = props

    const [ myCenterShow, setmyCenterShow] = useState(false);
    let iconUrl = require(`../../assets/img/${mineConfig}`).default

    const mycenterShow = [
        ...iconfontConfigList,
        // {
        //     id: 4,
        //     title:'学习报告',
        //     link:''
        // },
        // {
        //     id: 5,
        //     title:'我的证书',
        //     link:''
        // },
        // {
        //     id: 6,
        //     title:'重置密码',
        //     link:''
        // },
        {
            id: 7,
            title:'退出登录',
            inter:'UserLoginOut'
        },
    ]

    
    const myCenterClick = async item => {
        console.log(item)
        item.link && props.history.push({
            pathname: item.link,
            params: item
        })
        if(item.inter === 'UserLoginOut'){
            let outstatus = await UserLoginOut().then(res => res).catch(err => err )
            if( outstatus.code === 0 ){
                Toast.info('退出成功!', 1);
                props.history.push('/login')
            }
        } 
        setmyCenterShow(false)
    }

    return (
        <div>
            <div onClick={ e => setmyCenterShow(true)}><img src = { iconUrl}  style={{width:'24px',height:'24px'}} alt = ''/></div>
            <Modal
                visible={ myCenterShow }
                onClose={ () => setmyCenterShow(false)}
                animationType="myset"
                transitionName = { 'mySetTransiton' }
                popup = { true }
                >
                    <div className = 'headerMyCon'>
                        <div className = 'headerMyPic'>
                            <img src = { require(`../../assets/img/myhead.jpeg`).default}  style={{width:'100%',height:'100%'}} alt = ''/>
                        </div>
                        <div className = 'headerMyName overEllipsis'>{ sessionStorage.getItem("c-uname") || '用户名' }</div>
                    </div>
                    {
                        mycenterShow.map( item => (  
                            <div className = 'headerMyItem' onClick = { e => myCenterClick(item) } key = { item.id }>{ item.title }</div>
                        ) )
                    }
            </Modal>
        </div>
        
    )
}

export default memo(withRouter(MineComponent))