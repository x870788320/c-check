import React, { memo, useState } from "react";
import { withRouter } from 'react-router-dom'


import './index.less'


const FooterComponent = props => {
    const { route } = props
    console.log(route)

    const [selected, setselected] = useState(1);

    const footerConfig = {
        theme: 'black',
        list: [
            {
                id: 1,
                title: '阅读',
                icon: 'read',
                link: '/app'
            },
            {
                id: 2,
                title: '训练',
                icon: 'train',
                link: '/app/train'
            },
            {
                id: 3,
                title: '测试',
                icon: 'test',
                link: '/app/test',
                params: 'test'
            },
            {
                id: 4,
                title: '考试',
                icon: 'exam',
                link: '/app/exam',
                params: 'exam'
            },
            {
                id: 5,
                title: '应用',
                icon: 'app',
                link: '/app/search'
            },
        ]
    }

    const getImg = key =>  require(`../../assets/img/footer/${key}.svg`).default

    const footItemClick = item => {
        setselected(item.id)
        props.history.push({
            pathname: item.link,
            params: item
        })
    }

    const randerDom = () => footerConfig.list.map( item => (
        <div className = 'footerItem' key = { item.id } onClick = { e => footItemClick(item) }>
            <img src={ selected === item.id? getImg(`${item.icon}hover`) : getImg(item.icon) } style={{width:'20px',height:'20px'}} alt=''/>  
            <div className = {`footerMsg ${ selected === item.id? 'footerMsgSe': null }`}>{ item.title }</div>
        </div>
    ))
    

    return (
        <div className = 'footer'>
            { randerDom() }
        </div>
    )
}

export default memo(withRouter(FooterComponent))