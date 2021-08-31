import React, { memo, useEffect, useState } from "react";

//组件
import HeaderComponent from '../../components/HeaderCom/index.js'
import NavCom from '../../components/NavCom/index.js'
import IconListComponent from '../../components/IconListCom/index.js'

//静态数据
import { stydyNavConfig } from '@/resource/home.js'
import { textTitleConfig } from '@/resource'

import { GeteducollectList, GetEdurecordList, GetEdudownloadList } from '@/interface'


import './index.less'

const RecordComponent = props => {
    const { params } = props.location
    
    //组件内数据
    const [ myEducollect, setmyEducollect] = useState({
            swiperConfig:[],
            list:[]
        });

    //我的收藏参数
    const [ showPageData ] = useState({
        page: 1,
        // rows: 10

    });


    const initData = {
        title: '最近学习'
    }

    const updateDom = async() => {
        console.log(params)
        
        const allFace = {  GetEdurecordList, GeteducollectList, GetEdudownloadList }
        let educollectList = await allFace[params.inter](showPageData).then(res => res).catch(err => err )
        
        if(educollectList.code === 0){
            const geteducollectList = ({ collectTime, edu:{ planCategory: {  name:classTy  }, addr, cover, id, title } }) =>  
                                    ({  addr, cover, collectTime, id, title, classTy })
            const getedurecordtList = ({ startTime, education:{ planCategory: {  name:classTy  }, addr, cover, id, title } }) =>  
                                    ({  addr, cover, startTime, id, title, classTy })
            let list = educollectList.t.content.map( params.inter === "GetEdurecordList"?getedurecordtList: geteducollectList  )
            setmyEducollect({ ...myEducollect, 
                swiperConfig: params.swiperConfig, 
                list  
            })
             console.log(list)
         }

    }

    useEffect(async() => {
        updateDom()
    }, []);

    return (
        <div className = 'record'>
            <HeaderComponent titleConfig = {textTitleConfig((params && params.title) || initData.title)} theme = 'white'/>

            <div className = 'recordNavContainer'><NavCom navConfig = { stydyNavConfig }/></div>
            
            <div className = 'IconListContainer'><IconListComponent navConfig = { myEducollect } updateFn = { updateDom }/></div>
        </div>
        
    )
}

export default memo(RecordComponent)