
export const LOCALHOST_ADDRESS = "http://localhost:3000";

export const PRO_ADDRESS = 'http://192.168.1.188:8889/'
export const DEV_ADDRESS = 'http://192.168.1.188:8889/'

console.log(window.location.origin)

export const baseURL = process.env.NODE_ENV ===  'production'? PRO_ADDRESS: `${window.location.origin}/agent`
// export const baseURL = process.env.NODE_ENV ===  'production'? PRO_ADDRESS: `${window.location.origin}/agent`
// export const baseURL = `${window.location.origin}/agent`
export const timeout = 8000

export const errData = {code: -1, message: '网络原因请稍后再试', t:[]}




