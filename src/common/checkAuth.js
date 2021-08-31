
import { allRoles } from '../resource'

//登录时判断身份
let saveRole = 'v1'
export const vGradeInfo = function(role = saveRole) {
  if(!(this instanceof vGradeInfo)) return new vGradeInfo(role); 
  saveRole = role
  !this[role] && console.log('Error: Please enter the correct parameters!')
  return this[role] || this['v1']
}
//挂载所有角色
vGradeInfo.prototype = allRoles

//检查参数是否在拿到的权限列表里 ,includes是===
export const hasPermission = permissions => vGradeInfo().showAuth.includes(permissions)

//dom的显示级别  HOCAuth(<div show_grade = "7">555555555555</div>)
export const HOCAuth = BaseComponent => {
  const { show_grade } = BaseComponent.props
  return hasPermission(String(show_grade))? BaseComponent: null;
};


/*
用法: { HOCAuth(<div show_grade = "4">555555555555</div>) }
*/












// export class AuthWrapper extends React.Component {
//   render() {
//     return checkAuth(this.props.functionName, this.props.menuId) && this.props.children;
//   }
// }


// import React from 'react';
// // import PropTypes from 'prop-types'

// /**
//  * 校验当前用户是否有功能编码对应的权限
//  * @param {string} functionName
//  */
// export function checkAuth(functionName, menuId) {
//   if (functionName) {
//     let functionsList; //[{menuId:0,btnCode:"add"},{menuId:2,btnCode:"del"}]
//     if (sessionStorage.getItem('permissionsButtonList')) {
//       functionsList = JSON.parse(sessionStorage.getItem('permissionsButtonList');)
//     } else {
//       return false;
//     }
//     //这边有一个菜单ID-主要是为了兼容复用同一个组件情况
//     if (menuId) {
//       functionsList = functionsList.filter((item) => {
//         return item.menuId == menuId
//       })
//     }
  
//     const functions = functionName.split(',');
//     const flag = functions.some((value) =>
//       functionsList.some((func) => func.buttonCode == value.trim())
//     );
//     return flag;
//   } else {
//     return false;
//   }
// }


// /**
//  * 权限组件封装
//  */
// export class AuthWrapper extends React.Component {
//   render() {
//     return checkAuth(this.props.functionName, this.props.menuId) && this.props.children;
//   }
// }

// AuthWrapper.propTypes = {
//   functionName: PropTypes.string,
//   menuId: PropTypes.string,
// }