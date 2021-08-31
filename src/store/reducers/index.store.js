

import * as indexActionType from '../actionTypes/index.type';


const indexState = {
    loginStatus: indexActionType.LOGIN_STATUS_NO,
    areaAndTYpeSelect:{
        industryType: 0,              //行业
        subjectType:0,                //科目
        province: '山东省',           //省
        city:   '青岛市',             //市
        seartchIndustryType:0
    },
    
    industryNavCon: {
        name: 'industryType',
        theme: 'white',
        needDownLine: true,
        hasLoaded: false,
        list:  [
            {
                id: 0,
                title: '全部',
                interface: ''
            }
        ] ,

    },
    learnContent: []
}

const indexRe = (state = indexState, action) => {
    switch(action && action.type){
        case indexActionType.CHANGE_LOGIN_STATUS:
            return { ...state, loginStatus: action.id }
        case indexActionType.AREA_AND_TYPE_SELECT:
            console.log(action.pyload )
            return { ...state,
                areaAndTYpeSelect: { 
                    ...state.areaAndTYpeSelect, 
                    ...action.pyload 
                },
            }
        case indexActionType.CHANGE_INDUSTRY_NAV_COM:
            console.log(action.pyload)
            const { theme, list } = action.pyload
            const listTar = list || state.industryNavCon.list.slice(1)
            const themeTar = theme || state.industryNavCon.theme
            return { ...state,
                     industryNavCon: 
                        { ...state.industryNavCon,
                            theme: themeTar,
                            list: [ state.industryNavCon.list[0], ...listTar ]
                        } 
                    }
 
            

        default:
            return state
    }
}

export const name = 'indexRe'

export default indexRe