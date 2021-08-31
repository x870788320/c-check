import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Button, Picker, Modal } from 'antd-mobile';

import HeaderComponent from '../../components/HeaderCom/index.js'
import { textTextTitleConfig } from '@/resource'
import { citys } from '../../resource/city'
import { AREA_AND_TYPE_SELECT, SAVE_SELECT_TOPIC_ITEM } from '@/store/actionTypes/index.type';
import { GetIbankListAction, GetIbankErrListAction } from '@/store/actionCreate';

import { GetChapterList } from '@/interface'


import './index.less'

const SelectTopComponent = props => {
    const { params } = props.location
        
    //redux里的state
    const { areaAndTYpeSelect, industryNavCon }  = useSelector( state => state.indexRe , shallowEqual)
    //科目Nav的配置项
    const { stydyNavCon, stydyTitleSeList }  = useSelector( state => state.homeRe )
    const { selectTipicItem }  = useSelector( state => state.selectTopicdRe)

    //redux 方法
    const dispatch = useDispatch()
      
    const showState = params || selectTipicItem
    
    const rightTitles = {
        test: '得分',
        // exam: '我的证书',
        exam: '',
        train: '我的错题',
    }
    let title = (showState && showState.infoTitle) || '答题'
    let rightTitle = ( showState && rightTitles[showState.from] ) || '' 

    const easyGrade = [ 
        {
            id:1,
            value: 1,
            label: '易'
        },
        {
            id:2,
            value: 2,
            label: '中'
        },
        {
            id:3,
            value: 3,
            label: '难'
        },
     ]
     const chapterGrade = [ 
         {
             id:1,
             value: '全部',
             label: '1-1-1'
         }
      ]

    const firstSubjectTypeDatas =   {
        id: 0,
        title:'全部',
        interface: ''
    }
      
    const SelectTopListDataInit = arr => arr.map( item => (item.value = item.label = item.title) && item )
    const industryTypeDatas = SelectTopListDataInit(industryNavCon.list)
    const industryTypeVal = industryTypeDatas.filter( item => item.id === areaAndTYpeSelect['industryType'] )[0].value
    console.log(stydyTitleSeList)
    const subjectTypeDatas = SelectTopListDataInit([firstSubjectTypeDatas, ...stydyTitleSeList[0].childs, ...stydyTitleSeList[1].childs  ])
    console.log(subjectTypeDatas)
    console.log(areaAndTYpeSelect['subjectType'] )
    const subjectTypeVal = subjectTypeDatas.filter( item => item.id === areaAndTYpeSelect['subjectType'] )[0].value
    
    //组件内数据
    const SelectTopList = [
        {
            id: 1,
            name: 'city',
            title: '地区',
            icon: '地区选择.svg',
            val: [ areaAndTYpeSelect['province'], areaAndTYpeSelect['city'] ],
            datas: citys,
            cols: 2,
            reduxFn: AREA_AND_TYPE_SELECT
        },
        {
            id: 2,
            name: 'industryType',
            title: '行业',
            icon: '行业.svg',
            val: [ industryTypeVal ],
            datas: industryTypeDatas,
            cols: 1,
            reduxFn: AREA_AND_TYPE_SELECT
        },
        {
            id: 3,
            name: 'subjectType',
            title: '科目',
            icon: '科目.svg',
            val: [ subjectTypeVal ],
            datas: subjectTypeDatas,
            cols: 1,
            reduxFn: AREA_AND_TYPE_SELECT
        },
        {
            id: 4,
            name: 'chapter',
            title: '章节',
            icon: '章节.svg',
            val: ['1-1-1'],
            datas: chapterGrade,
            cols: 1
        },
        {
            id: 5,
            name: 'esay',
            title: '难易程度',
            icon: '难易.svg',
            val: [2],
            datas: easyGrade,
            cols: 1
        },
    ]

    //学习内容参数
    const [ selectListState, setselectListState ] = useState(SelectTopList);
    const [ modalShow, setmodalShow ] = useState(false);



    const  SelectTopItemClick = item => {
        console.log(item)
    }

    //头部右边的函数
    const openMyErrorEx = function() {
        this.position = 'right'
        this.callback = () => {
            dispatch(GetIbankErrListAction());
            let curParams = {
                title: '我的错题',
                from: 'maError',
                noExitShow: true,
            }
            props.history.push({
                pathname: '/app/learn',
                params: curParams
            })
        }
    }

    const changeSelectVals = (v, obj) => {
        // console.log(v)
        // console.log(setselectListState)
        // console.log(obj)
        //动态改变redux里的值
        if( obj.reduxFn ){
            let pyload = {}
            if( obj.name === 'city' ){
                pyload['province'] =  v[0] 
                pyload[obj.name] =  v[1] 
            }else {
                let theItem = obj.datas.filter( item => (item.name === v[0]) )
                pyload[obj.name] =( theItem[0] && theItem[0].id) || 0
            }

            dispatch({ type: obj.reduxFn, pyload })
        }


        let newList = selectListState.map(item => {
            if(item.id === obj.id){
                item.val = v
            }
            return item
        })
        console.log(newList)
        setselectListState(newList)
    }

    const SelectTopSubmit = async () => {
        if( showState.name === 'post' || showState.name === 'learn' ){
            setmodalShow(true)
            return
        }

        const { industryType, subjectType, province, city } = areaAndTYpeSelect

        const getSelectTopListVal = name =>selectListState.filter(item => item.name === name)[0].val[0]

        //当测试时，随机20题，当综合测试时，不传章节
        let num = (params && params.from) === "train" ? 0 : 20
        let chapter = (params && params.name === "multiple")? null: getSelectTopListVal('chapter')

        let interParams = {
            num,
            typeId: industryType,
            pcId: subjectType,
            level: getSelectTopListVal('esay'),
            chapter,
            province,
            city,
        }
        
        await dispatch(GetIbankListAction(interParams));
        let testTitle = `${SelectTopList[2].val[0]}  ${(params && params.infoTitle) || '练习'}`


        let curParams = {
            rightTitle,
            title,
            from: showState.from,
            noExitShow: showState.from === "train",
            tpId : (params && params.name === "chapter")? `${SelectTopList[3].val[0]}` : '',
            pcId: areaAndTYpeSelect['subjectType']
        }
        props.history.push({
            pathname: '/app/learn',
            params: curParams
        })
    }

    const randerDom = () => {
        let showItem = (showState && showState.showItem) || [1,2,3,4,5]
        return selectListState.filter(item => showItem.includes(item.id) ).map(item => {
            let iconSrc = require(`../../assets/img/${item.icon}`).default
            return (
                <Picker
                    data={item.datas}
                    value={ item.val }
                    cols = {item.cols}
                    onChange={v => changeSelectVals(v, item)}
                    key = { item.id }>
                    <div  className = 'SelectTopMainItem' onClick = { e => SelectTopItemClick(item) }>
                        <div  className = 'SelectTopItemLeft'>
                            <img src = { iconSrc }  style = { { 'width': '16px'} } alt = ''/>
                            <span>{ item.title }</span>
                        </div>
                        <div  className = 'SelectTopItemRight'>
                            <span>
                                {/* { rightVals[item.id -1][item.name] } */}
                                { item.name === 'esay'? item.datas[item.val[0] - 1].label : item.val }
                            </span>
                            <img src = { require(`../../assets/img/返回.svg`).default }  style = { { 'width': '16px'} } alt = ''/>
                        </div>
                    </div>
                </Picker>
            )
        })

    }

    useEffect(  () => {
        if(params){
            // let title = params.name === "chapter"? `${SelectTopList[2].val[0]}  ${params.infoTitle}  ${SelectTopList[3].val[0]}` : params.infoTitle
            dispatch({ type: SAVE_SELECT_TOPIC_ITEM, pyload: params}) 
        }
    }, []);

    //获取章节列表
    useEffect( async () => {
        let chapterList = await GetChapterList().then(res => res).catch(err => err )
        console.log(chapterList)
        
        if( chapterList.code === 0 ){
            console.log(chapterList.t)
            let newList = chapterList.t.map(( item, index) => {
                // let obj = JSON.parse(JSON.stringify())
                let obj = {}
                obj['id'] = (index + 1)
                obj['value'] = item
                obj['label'] = item
                return obj
            }, {})
            let newSelect = selectListState.map( item => {
                if(item.id === 4) {
                    item.datas = newList
                    // item.val = newList[0].value || '1-1-1'
                }
                return item
            } )
            console.log(newList)
            console.log(newSelect)
            setselectListState(newSelect)
        }
        
    }, []);


    return (
        <div className = 'SelectTop'>
            <HeaderComponent titleConfig = { textTextTitleConfig( title, rightTitle, openMyErrorEx)} theme = 'white'/>
           
            <div className = 'SelectTopMain'>
                { randerDom() }
            </div>
            <div  className = 'SelectTopSubCon'>
                <Button type="primary"  onClick = { e => SelectTopSubmit() }>开始</Button>
            </div>
            <Modal
                visible={ modalShow }
                transparent
                maskClosable={true}
                onClose={ e=> console.log('close') }
                className = 'SelectTopModalContainer'
                >
                <div className = 'SelectTopModalCon'>
                    <div className = 'SelectTopModalTop'>
                        考试说明
                    </div>
                    <div className = 'SelectTopModalCenter'>暂无</div>
                    <div className = 'SelectTopModalBottom'>
                        <Button type="primary"  onClick = { e => setmodalShow(false) }>确定</Button>
                    </div>
                </div>
            </Modal>
        </div>
        
    )
}

export default memo(SelectTopComponent)