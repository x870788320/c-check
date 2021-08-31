


import * as indexActionType from '../actionTypes/index.type';
const recordState = {
    myEducollect: {}
}

const recordRe = async  (state = recordState, action) => {
    switch(action.type){
        case indexActionType.MY_EDUCOLLECT:
            return {
                ...state,
                myEducollect: action.id
            }
        default:
            return state
    }
}

export const name = 'recordRe'

export default recordRe