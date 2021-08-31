import { GET, POST } from "./http"
import { benchmark } from '../common/utils'




//登录
export const userLogin = params => { 
  const formData = new FormData()
  formData.append("uname", params.uname)
  formData.append("upass", params.upass)
  return POST("/api/sys/user/login",formData)
}
//注册
export const userReg = params => {
    const formData = new FormData()
    formData.append("uname", params.uname)
    formData.append("upass", params.upass)
    return POST("/api/sys/user/reg", formData)
}

//修改
export const userModify = params => { 
  const formData = new FormData()
  formData.append("uname", params.uname)
  formData.append("upass", params.upass)
  return POST("/api/sys/user/modify",formData)
}


//退出
export const UserLoginOut = params => GET("/api/sys/user/loginout", params)

//home
//行业类型
export const GetIndustryType = params => GET("api/train/pt/list", params)
//科目类型
export const GetSubjectType = params => GET("/api/train/pc/list", params)
//我的收藏
export const GeteducollectList = params => GET(`/api/train/educollect/list`, params)
//添加收藏
export const AddEducollect = params => GET(`/api/train/educollect/collect/${params}`)
//删除收藏
export const RemoveEducollect = params => GET(`/api/train/educollect/uncollect/${params}`, params)
//我的下载
export const GetEdudownloadList = params => GET(`/api/train/edudownload/list`, params)
//我的学习
export const GetEdurecordList = params => GET(`/api/train/edurecord/list`, params)
//添加下载
export const AddEdudownload = params => GET(`/api/train/edudownload/download/${params}`, params)
//添加学习
export const AddEdurecord = params => {
  console.log(params)
  const formData = new FormData()
  formData.append("eduId", params.eduId)
  formData.append("startTime", params.startTime)
  formData.append("endTime", params.endTime)
  formData.append("learnTime", params.learnTime)
  return POST("/api/train/edurecord/learn", formData)
}

//原文列表
export const GetArticleList = params => GET("/api/train/edu/list", params)

//训练
//获取错题
export const GetIbankErrList = params => GET("/api/train/ibank/list/error", params)
//移除错题
export const DeleteErrFromList = params => GET(`/api/train/ibank/error/del/${params}`, params)

export const DeleteErrExpreOfList = params => GET(`/api/train/ibank/test/del/${params}`)
export const GetChapterList = params => GET(`/api/train/ibank/chapter/list`, params)






//测试
//测试记上报
export const SubmitTestList = params => {
  console.log(params)
  const formData = new FormData()
  formData.append("examType", params.examType)
  params.tpId && formData.append("tpId", params.tpId)
  params.pcId && formData.append("pcId", params.pcId)
  params.items.map( (item, index) => {
    formData.append(`items[${index}].id`, item.id)
    formData.append(`items[${index}].correct`, item.correct)
    formData.append(`items[${index}].answer`, item.answer)
    formData.append(`items[${index}].answerOld`, item.answerOld)
  } )
  return POST("/api/train/ibank/test", formData)
}

//测试记录
export const GetTestList = params =>  GET("/api/train/ibank/test/list", params)
// export const GetTestList = params =>  GET("/api/train/ibank", params)



//考试
//考试上报
export const SubmitPaperList = params => {
  console.log(params)
  const formData = new FormData()
  formData.append("tpId", params.tpId)
  formData.append("startTime", params.startTime)
  formData.append("endTime", params.endTime)

  params.items.map( (item, index) => {
    formData.append(`items[${index}].id`, item.id)
    formData.append(`items[${index}].tpiId`, item.tpiId)
    formData.append(`items[${index}].correct`, item.correct)
    formData.append(`items[${index}].answer`, item.answer)
    formData.append(`items[${index}].answerOld`, item.answerOld)
  } )
  
  return POST("/api/train/ibank/paper", formData)
}
//考试记录
export const GetPaperList = params => GET("/api/train/ibank/paper/list", params)
//考试题目byid
export const GetPaperListById = params => GET(`/api/train/ibank/test/examItem/list/${params}`, params)






//题库数据列表
// export const GetIbankList = params => POST("/api/train/ibank/list", params)

export const GetIbankList = params => {
  console.log(params)
  const formData = new FormData()

  //todo 城市和省找不到题，先注释
  // formData.append("province", params.province)
  // formData.append("city", params.city)
  // params.chapter && formData.append("chapter", params.chapter)
  // formData.append("level", params.level)
  formData.append("num", params.num)
  params.pcId && formData.append("pcId", params.pcId)
  params.typeId && formData.append("typeId", params.typeId)
  return POST("/api/train/ibank/list", formData)
}


