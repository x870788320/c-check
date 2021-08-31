import * as indexActionType from '../actionTypes/index.type';
import { GetArticleList, GetIbankList, GetIbankErrList } from '@/interface'



// 获取文章列表
export const GetArticleListAction = (params, isSearch = false) => {
  console.log(params)
    if(params.pcId === 0){
      delete params.pcId
    }
    if(params.ptId === 0){
      delete params.ptId
    }
    // let paramsInit = 
    let type = isSearch ? indexActionType.SEARCH_ARTICLE_LIST : indexActionType.GET_ARTICLE_LIST
    return async dispatch => {
        let ArticleList = await GetArticleList(params).then(res => res).catch(err => err )
        let list =  ArticleList.code === 0? ArticleList.t.content: []
        dispatch({ type, pyload: list, isPush: params.isPush || false })
    }
  }
  
  // 获取题目
export const GetIbankListAction = params => {
    return async dispatch => {
        let IbankList = await GetIbankList(params).then(res => res).catch(err => err )
        let list =  IbankList.code === 0? IbankList.t: []
        dispatch({ type: indexActionType.GET_IBANK_LIST, pyload: list, isPush: params.isPush || false })
    }
  }

    // 获取错题题目
export const GetIbankErrListAction = params => {
  return async dispatch => {
      let ErrList = await GetIbankErrList(params).then(res => res).catch(err => err )
      let list =  ErrList.code === 0? ErrList.t: []
      dispatch({ type: indexActionType.GET_ERROR_IBANK_LIST, pyload: list })
  }
}
  