

// export const getHttpAction = (url, func) => (dispatch) => {
//     axios.get(url).then(function(res){
//         const action = func(res.data)
//         dispatch(action)
//     })
// }
const mineState = {
    mineData: 1
}

const mineRe = (state = mineState, action) => {
    switch(action.type){
        case 'CHANGE_CURRENT_LIST_mine':
            return {
                ...state,
                mineData: action.id
            }
        default:
            return state
    }
}

export const name = 'mineRe'
export default mineRe