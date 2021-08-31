
import React, { memo, useState } from "react";
import  './index.less';
import { Button } from 'antd';
//react预览pdf文件插件
import PDF from 'react-pdf-js';


import HeaderComponent from '../../components/HeaderCom/index.js'


import { textTitleConfig } from '@/resource'



const Files = props => {

    const { params:fileSrc } = props.location
    console.log(props)
    // const { fileSrc } = props

    let clientWidth = window.screen.width - 20;
    let scale=(clientWidth/595).toFixed(2)
    const [ page, setpage] = useState(1);
    const [ pages, setpages] = useState(1);
    
    //获取所有页
    const onDocumentComplete = pages => setpages(pages)
    
    //点击上一页
    const handlePrevious = () => setpage(page - 1)
    
    //点击下一页
    const handleNext = () => setpage(page + 1)

    console.log(PDF)

    return (
        <div>
            <HeaderComponent titleConfig = {textTitleConfig( '文档预览' )} theme = 'white'/>
            <div className = 'flieContent'>
                <div className={ 'filePdf' }>
                    <PDF
                    file={ fileSrc }//文件地址
                    onDocumentComplete={ onDocumentComplete }
                    scale = { scale }
                    page={page}//文件页码
                    />
                </div>

                <div className={ 'filePdfFooter' }>

                    { page === 1 ? null: <Button type='primary' onClick={ e => handlePrevious() }>上一页</Button> }

                    <div className={ 'filePdfPage' }>

                    <span>第{page}页</span>/<span>共{pages}页</span>

                    </div>
                    { page === pages ?null : <Button style={{ marginLeft: '10px' }} type='primary' onClick={ e => handleNext() }>下一页</Button> }
                </div>
            </div>
        </div>
    )
    
}

export default memo(Files)
