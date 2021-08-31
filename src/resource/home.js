

export const navConfig = {
    name: 'industryType',
    theme: 'white',
    needDownLine: true,
    list: [
        {
            id: 0,
            title: '全部',
            interface: ''
        },
        {
            id: 2,
            title: '民航',
            interface: ''
        },
        {
            id: 3,
            title: '电网',
            interface: ''
        },
        {
            id: 4,
            title: '水泥生产',
            interface: ''
        },
        {
            id: 5,
            title: '平板玻璃生产',
            interface: ''
        },
        {
            id: 6,
            title: '电解铝生产',
            interface: ''
        },
    ]
        
}

export const  iconfontConfigList = [
    {
        id: 1,
        title: '最近学习',
        icon: '最近学习.svg',
        link: '/app/record',
        inter: 'GetEdurecordList',
        swiperConfig: [0,2]
        
    },
    {
        id: 2,
        title: '我的收藏',
        icon: '收藏.png',
        link: '/app/record',
        inter: 'GeteducollectList',
        swiperConfig: [1,2]
    },
    {
        id: 3,
        title: '我的下载',
        icon: '我的下载.svg',
        link: '/app/record',
        inter: 'GetEdudownloadList',
        swiperConfig: []
    },
]

export const iconfontConfig = {
    theme: 'black',
    list: iconfontConfigList
}

// export const stydyTitleSeList = {
//     list: [
//         {
//             id:1,
//             title:'基础知识'
//         },
//         {
//             id:2,
//             title:'应用能力'
//         },
//     ]
// }

export const stydyNavConfig = {
    name: 'subjectType',
    theme: 'blue',
    needDownLine: true,
    textAlign: 'left',
    list: [
        {
            id: 0,
            title:'全部',
            interface: ''
        },
        // {
        //     id: 2,
        //     title:'电工',
        //     interface: ''
        // },
        // {
        //     id: 3,
        //     title:'热工',
        //     interface: ''
        // },
        // {
        //     id: 4,
        //     title:'法律',
        //     interface: ''
        // },
        // {
        //     id: 5,
        //     title:'标准',
        //     interface: ''
        // },
    ]
}


//首页配置
export const mainStudyConfig = {
    swiperConfig:[0, 2],
    list:[]
}

//我的收藏配置
export const myEducollectConfig = {
    swiperConfig:[1, 2],
    list:[]
}