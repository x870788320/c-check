
import * as indexActionType from '../actionTypes/index.type';
const searchState = {
    searchArticleList: []
}

const searchRe = (state = searchState, action) => {
    switch(action.type){
        case indexActionType.SEARCH_ARTICLE_LIST:
            console.log(action.pyload)
            return { ...state, searchArticleList: action.pyload }
        default:
            return state
    }
}

export const name = 'searchRe'
export default searchRe