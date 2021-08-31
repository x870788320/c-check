
import * as indexActionType from '../actionTypes/index.type';

const selectTopicState = {
    selectTipicItem: {},
    ibankList:[],   //后台获取的题
    testListById:[],   //后台获取的题
    errIbankList:[],  //后台获取的错题列表
    startTime:'',       //考试的开始时间
    allAnswersObj:{}    //存储每题的答案  样式如下
    /*
    {1: {
        tpiId: 1,  题号
        id: 6,      后台的题目id
        answer: "B",   答案
        answerOld: "B",   正确答案
        correct: true   是否正确
        }
        ...
    }
    */ 

}   

const selectTopicdRe = (state = selectTopicState, action) => {
    switch(action.type){
        case indexActionType.SAVE_SELECT_TOPIC_ITEM:
            console.log(action.pyload)
            return {
                ...state,
                selectTipicItem: action.pyload
            }
        case indexActionType.GET_IBANK_LIST:
            return {
                ...state,
                ibankList: action.pyload
            }
        case indexActionType.GET_TEST_LIST_BY_ID:
            return {
                ...state,
                testListById: action.pyload
            }
        case indexActionType.GET_ERROR_IBANK_LIST:
            return {
                ...state,
                errIbankList: action.pyload
            }
        case indexActionType.SAVE_ALL_ANSWERS:
            let obj = {}
            obj[action.pyload.tpiId] = action.pyload
            return {
                ...state,
                allAnswersObj:{
                    ...state.allAnswersObj,
                    ...obj
                } 
            }
        case indexActionType.CLEAR_ALL_ANSWERS:
            return {
                ...state,
                allAnswersObj: {}
            }
        
        case indexActionType.SAVE_START_TIME:
            return {
                ...state,
                startTime: action.pyload
            }
            
        default:
            return state
    }
}

export const name = 'selectTopicdRe'
export default selectTopicdRe