
import * as indexActionType from '../actionTypes/index.type';

const homeState = {
    ArticleList: [],        //home显示的学习列表
    // stydyTitleSeList: [
    //     {
    //         id:1,
    //         title:'基础知识'
    //     },
    //     {
    //         id:2,
    //         title:'应用能力'
    //     },
    // ],
    stydyTitleSeList: [
            {
                "childs": [
                    {
                        "id": 3,
                        "name": "电工",
                        "title": "电工",
                    },
                    {
                        "id": 4,
                        "name": "热工",
                        "title": "热工",
                    },
                    {
                        "id": 5,
                        "name": "法律法规",
                        "title": "法律法规",
                    },
                    {
                        "id": 6,
                        "name": "标准规范",
                        "title": "标准规范",
                    }
                ],
                "id": 1,
                "name": "基础知识",
                "title": "基础知识"
            },
            {
                "childs": [
                    {
                        "id": 7,
                        "name": "实物辨析",
                        "title": "实物辨析",
                    },
                    {
                        "id": 8,
                        "name": "计算分析",
                        "title": "计算分析",
                    }
                ],
                "id": 2,
                "name": "应用能力",
                "title": "应用能力"
            }
    ],
    stydyNavCon: {          //科目Nav的配置项
        name: 'subjectType',
        theme: 'blue',
        needDownLine: true,
        textAlign: 'left',
        list: [
            {
                id: 0,
                title:'全部',
                interface: ''
            }
        ]
    }

}


// const homeRe =  (state = homeState, action) => {
function homeRe (state = homeState, action){
    switch(action.type){
        //静态保存
        case indexActionType.CHANGE_STUDY_NAV_CON:
            let list = action.pyload.length? action.pyload: state.stydyNavCon.list.slice(1)
            return { ...state,
                    stydyNavCon: {
                        ...state.stydyNavCon,
                        list: [ 
                            state.stydyNavCon.list[0], 
                            ...list
                        ] 
                    } 
                }
            case indexActionType.CHANGE_STUDY_ALL_LIST:
                console.log(action.pyload )
                return { ...state, stydyTitleSeList: action.pyload.list}


        //动态数据
        case indexActionType.GET_ARTICLE_LIST:
            console.log(action.pyload)
            return { ...state, ArticleList: action.pyload }
            

        default:
            return state
    }
}

export const name = 'homeRe'

export default homeRe