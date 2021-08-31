
import { getNumArr, freezeObj } from '../common/utils'


/*
allRoles 所有角色数据，数据冻结
showAuth 控制角色显示权限，可以重新定义
*/
export const allRoles = freezeObj({
    normal: {
      name: "normal",
      showAuth: getNumArr(1)
    },
    v1: {
      name: "VIP1",
      showAuth: getNumArr(1)
    },
    v2: {
      name: "VIP2",
      showAuth: getNumArr(2)
    },
    v3: {
      name: "VIP3",
      showAuth: getNumArr(3)
    },
    v4: {
      name: "VIP4",
      showAuth: getNumArr(4)
    },
    v5: {
      name: "VIP5",
      showAuth: getNumArr(5)
    }
})




//search title
export const searchTitleConfig = {
  left: {
      type: 3,  //0: null, 1: text,2: icon, 3: position
      val: ''
  },
  center: {
      type: 3, //0: null, 1: text,2: icon, 3: search
      val: ''
  },
  right: {
      type: 2, //0: null, 1: text,2: icon,
      val: 'personcenter-blue.svg'
  },
}

//search title white
export const searchTitleConfigWhite = {
  left: {
      type: 3,  //0: null, 1: text,2: icon, 3: position
      val: ''
  },
  center: {
      type: 3, //0: null, 1: text,2: icon, 3: search
      val: ''
  },
  right: {
      type: 2, //0: null, 1: text,2: icon,
      val: 'personcenter-black.svg'
  },
}


// text title
export const textTitleConfig = val => ({
  left: {
      type: 2,  //0: null, 1: text,2: icon, 3: position
      val: '返回.svg'
  },
  center: {
      type: 1, //0: null, 1: text,2: icon, 3: search
      val: val
  },
  right: {
      type: 2, //0: null, 1: text,2: icon,
      val: 'personcenter-black.svg'
  },
})

// text title position
export const textPositionConfig = val => ({
  left: {
      type: 3,  //0: null, 1: text,2: icon, 3: position
      val: ''
  },
  center: {
      type: 1, //0: null, 1: text,2: icon, 3: search
      val: val
  },
  right: {
      type: 2, //0: null, 1: text,2: icon,
      val: 'personcenter-black.svg'
  },
})


// select title
export const textTextTitleConfig = (val1, val2, fn= null) => ({
  left: {
      type: 2,  //0: null, 1: text,2: icon, 3: position
      val: '返回.svg'
  },
  center: {
      type: 1, //0: null, 1: text,2: icon, 3: search
      val: val1
  },
  right: {
      type: 1, //0: null, 1: text,2: icon,
      val: val2
  },
  fn
})