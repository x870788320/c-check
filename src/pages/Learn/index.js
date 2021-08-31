import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd-mobile';
import {Prompt} from 'react-router';

import HeaderComponent from '../../components/HeaderCom/index.js'
import RecordTime from '../../components/RecordTime/index.js'
import Exercise from '../../components/Exercise/index.js'

import { formatDate } from '@/common/utils'
import { textTextTitleConfig } from '@/resource'
import { CLEAR_ALL_ANSWERS, SAVE_START_TIME } from '@/store/actionTypes/index.type';
import { GetIbankErrListAction } from '@/store/actionCreate';


import { SubmitTestList, SubmitPaperList, DeleteErrExpreOfList, DeleteErrFromList } from '@/interface'



import './index.less'

const alert = Modal.alert;



const LearnComponent = props => {
    const { params } = props.location
    const  examType = (params && params.id) || 1
    const tpId = (params && params.tpId) || '1_1_1'
    const pcId = (params && params.pcId) || null
    console.log(props)
    // console.log(testTitle)
    
    const {  allAnswersObj, selectTipicItem, startTime }  = useSelector( state => state.selectTopicdRe , shallowEqual)
    const dispatch = useDispatch()
    console.log(selectTipicItem)

    
    //redux里的state
    const { ibankList, errIbankList, testListById }  = useSelector( state => state.selectTopicdRe , shallowEqual)
    // let ibankList = test.t
    
    let exerciseDatas = ibankList
    if(params && params.dtos){
        exerciseDatas = testListById
    }
    if(params && params.from === "maError"){
        console.log(errIbankList)
        exerciseDatas = errIbankList
    }

    // errIbankList
    
    let title = (params && params.title) || '答题'
    let rightTitle = (params && params.rightTitle) || '' 
    if(params && (params.rightTitle === '我的错题')){
        rightTitle = ''
    }

    
    const [ exerciseNum, setexerciseNum ] = useState(0);
    const [ exit, setexit ] = useState(false);
    const [ routeInfo, setrouteInfo ] = useState({});

    const changeExerciseNum = isAdd => {
        if( isAdd && exerciseNum < (exerciseDatas.length - 1)){
            setexerciseNum((exerciseNum + 1))
        }
        if( !isAdd && exerciseNum > 0 ) {
            setexerciseNum(exerciseNum - 1)
        }
    }

    const answerSubmit = () => {
        console.log(2222222222)
        console.log(examType)
        let params = {}
        params['items'] = Object.values(allAnswersObj).map(item => item)
        
        //测试训练时的考试上报
        let interfaceFn = SubmitTestList
        let date = new Date()
        params['startTime'] = startTime
        params['endTime'] = formatDate(date).slice(0, -3)
        params['examType'] = examType
        // params['tpId'] = 101010
        // params['pcId'] = pcId
        
        console.log(params)
        
        //考试时暂无
        if( selectTipicItem.from === "exam" ){
            // interfaceFn = SubmitPaperList
            // let date = new Date()
            // params['tpId'] = `${date.getTime()}`
            // params['startTime'] = startTime
            // params['endTime'] = formatDate(date).slice(0, -3)
        }


        let sub = interfaceFn(params).then(res => res).catch(e => e)
        console.log(sub)
    }

    const exited = (route,type,curexit = true) => {
        if( route && type ){
            let obj = {}
            obj.route = route
            obj.type = type
            setrouteInfo(obj)
        }

        setexit(curexit)
        if( !exit ) return 
        console.log(routeInfo)
        if(routeInfo.type === 'PUSH'){
            props.history.push(routeInfo.route)
        }
        if(routeInfo.type === 'POP'){
            props.history.goBack()
        }
        answerSubmit()
        
        dispatch({ type: CLEAR_ALL_ANSWERS})
    }

    const isExit = (route, type) => {
        if(!exit){
            alert('', '确认完成考试？', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => exited(route, type) },
            ])
            return false;
        } else {
            return true
        }
    }

    const deleteErrorFromList = async () => {
        // let st = DeleteErrExpreOfList(exerciseDatas[exerciseNum].id)
        let deleteSt = await DeleteErrFromList(exerciseDatas[exerciseNum].id).then(res => res).catch(err => err )
        console.log(deleteSt)
        if( deleteSt.code === 0 ){
            dispatch(GetIbankErrListAction());
        }
    }

    // 是否出现推出确认
    useEffect(() => {
        if(params && params.noExitShow){
            setexit(true)
            exited('','',true)
        } else {
            exited('','',exit)
        }
    }, [exit]);

    

    //刚进来时保存一下时间
    useEffect(() => {
        if(params && params.noExitShow) return
        let date = new Date()
        dispatch({ type: SAVE_START_TIME, pyload: formatDate(date).slice(0, -3) })
    }, []);

    
    // 走的时候清一下
    useEffect(() => {
        return () => {
            if(params && params.noExitShow) {
                console.log(11111111)
                dispatch({ type: CLEAR_ALL_ANSWERS})

            }
        }
    }, []);

    return (
        <div className = 'Learn'>
            <HeaderComponent titleConfig = { textTextTitleConfig( title, rightTitle)} theme = 'white'/>
            
            <div  className = 'LearnMain'>
                <div  className = 'LearnMainBack2'></div>
                <div  className = 'LearnMainBack1'></div>
                <div  className = 'LearnMainContent'>  
                {
                    exerciseDatas.length? 
                    <Exercise content = { exerciseDatas[exerciseNum] } exerciseNum = { exerciseNum + 1} total = { exerciseDatas.length }/>:
                    // <Exercise content = { tet } exerciseNum = { exerciseNum + 1} total = { exerciseDatas.length }/>:
                    <div  className = 'learnNullMain'>暂无题目</div>
                }
                    {/* <Exercise content = { exerciseDatas[exerciseNum] } exerciseNum = { exerciseNum + 1} total = { exerciseDatas.length }/> */}
                    <div className = 'LearnMainExprefooter'>
                        <div style = { {'color': exerciseNum === 0? '#ccc': '#5D5D5D' } } onClick = { e => changeExerciseNum(0) }>上一题</div>
                        <div  className = 'LearnMainfooterTime'>
                            { params && params.noExitShow? '': <RecordTime /> }
                            {( params && params.from === "maError")?<div onClick = { e => deleteErrorFromList() }>移除错题</div>: ""}
                        </div>
                        <div  style = { {'color': exerciseNum >= (exerciseDatas.length - 1)? '#ccc': '#5D5D5D' } }  onClick = { e => changeExerciseNum(1) }>下一题</div>
                    </div>

                </div>

            </div>
            <Prompt message={ isExit }></Prompt>

        </div>
        
    )
}

export default memo(LearnComponent)