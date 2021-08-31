import React, { memo, useState } from "react";
import { useDispatch } from 'react-redux'
import { vGradeInfo } from '../../common/checkAuth'
import { Input, Button, Checkbox } from 'antd';
import { Toast } from 'antd-mobile';
import { CHANGE_LOGIN_STATUS, LOGIN_STATUS_HAS } from '@/store/actionTypes/index.type';


import { userReg, userLogin } from '@/interface'

import './index.less'

//模拟用户已登录
console.log(vGradeInfo('v4'))

// const FormItem = Form.Item;

const LoginComponent = props => {

    //组件内数据
    const [isNameLogin, setisNameLogin] = useState(1);
    const [userInfo, setuserInfo] = useState({
        uname: '',
        upass: '',
        isAgree: false
    });

    //redux
    const dispatch = useDispatch()

    const diffPageData = [
        {
            loginType: 'loginTypeName',
            userPlace: '请输入手机号',
            userPrefix: null,
            passPlace: '请输入6位短信密码',
            passPrefix: null,
            phoneWord: '获取短信密码',
            submitTitle: '注册/登录'
        },
        {
            loginType: 'loginTypeNumber',
            userPlace: '请输入用户名',
            userPrefix: <i className= {`loginIcon userIcon`} /> ,
            passPlace: '请输入密码',
            passPrefix: <i className= {`loginIcon keyIcon`} />,
            phoneWord: '忘记密码',
            submitTitle: '注册/登录'
        },
        {
            loginType: '',
            userPlace: '请输入密码',
            userPrefix: null,
            passPlace: '确定新密码',
            passPrefix: null,
            phoneWord: null,
            submitTitle: '确定'
        },
    ]
    



    //暂时没有手机登录功能
    // const getPhonePassWord = () => {
    //     console.log(isNameLogin)
    //     if (isNameLogin === 1) {
    //         setisNameLogin(!isNameLogin)
    //         Toast.info('请在个人中心重置密码！', 1);
    //         return 
    //     }
    //     console.log(1111)
    // }

    // 登录
    const loginSubmit = async status => {
        //没有点击同意return
        const { uname,  upass, isAgree } = userInfo
        if( isNameLogin !== 2 && !isAgree ){
            Toast.info('请同意用户协议！', 1);
            return 
        }

        let errData = {code: -1, message: '网络原因请稍后再试'}

        // 注册接口
        let isReg = (status === 'reg')? await userReg({ uname,  upass }).then(res => res).catch(err => err): errData
        
        //注册成功或登录按钮， 调用登录接口
        let isLogin = ( (isReg.code === 0) || status === 'login' ) ? await userLogin({ uname,  upass }).then(res => res).catch(err => err): errData

        //注册或者登录失败，给以提示
        if( ( isLogin.code !== 0) || ((status === 'reg') && isReg.code !== 0) ){
            let msg = (status === 'reg')? '账号已存在' : isLogin.message
            Toast.info(msg, 1);
        }

        // 成功时
        if( isLogin.code === 0 ){
            const { token, url, user } = isLogin.t
            await sessionStorage.setItem("c-token", token);
            await sessionStorage.setItem("c-imgUrl", url);
            await sessionStorage.setItem("c-uname", user.uname);
            // 更改redux
            dispatch({ type: CHANGE_LOGIN_STATUS, id: LOGIN_STATUS_HAS })
            //跳转
            setTimeout(() => {
                console.log(sessionStorage.getItem("c-token"))
                props.history.push('/app')
            }, 0);
        }
        
    }


    return (
        <div className = 'login' >
            {/* 右上角登陆方式 */}
            {/* 暂时没有手机登录功能 */}
            {
                // (isNameLogin !== 2) && <div className = {`loginTypeShow ${ diffPageData[isNameLogin].loginType }`}
                //     onClick = { e => setisNameLogin( Number(!isNameLogin) ) }>        
                // </div>
            }

            {/* 中间头像 */}
            <div className = 'loginUserPic'></div>

            {/* 输入框 */}
            <div className = 'loginUserKey'>
                <div className = 'loginUserKeyItem'>
                    <Input
                        placeholder = { diffPageData[isNameLogin].userPlace }
                        prefix={ diffPageData[isNameLogin].userPrefix }
                        bordered = { false }
                        size = 'middle '
                        onChange={ e => setuserInfo({...userInfo, uname:e.target.value }) }/>
                </div>
                
                <div className = 'loginUserKeyItem'>
                    <Input.Password  
                        placeholder= { diffPageData[isNameLogin].passPlace}
                        prefix={  diffPageData[isNameLogin].passPrefix } 
                        // 暂时没有手机登录功能
                        // suffix = { (isNameLogin !== 2) && <div className= {`loginRightIcon`} onClick = { e => getPhonePassWord()}>{ diffPageData[isNameLogin].phoneWord }</div> }
                        bordered = { false }
                        size = 'middle '
                        onChange={ e => setuserInfo({...userInfo, upass:e.target.value }) }/>
                </div>
            </div>

            {/* 底部 */}
            <div className = 'loginBottom'>
                <div>
                    {/* 暂时没有手机登录功能 */}
                    {/* <Button type="primary" block onClick = { e => loginSubmit()}>{ diffPageData[isNameLogin].submitTitle }</Button> */}
                    <Button type="primary" block onClick = { e => loginSubmit('login')}>登录</Button>
                    <Button type="primary" block onClick = { e => loginSubmit('reg')}>注册</Button>
                    {
                        (isNameLogin !== 2) && <Checkbox onChange={e => setuserInfo({...userInfo, isAgree:e.target.checked })} className = 'loginBottomMsg'>
                            登录代表你已阅读并同意<a href = '#'>《用户协议》</a>和<a href = '#'>《隐私政策》</a>并使用本机号码登录
                        </Checkbox>
                    }
                </div>
            </div>
        </div>



    )
}

export default memo(LoginComponent)