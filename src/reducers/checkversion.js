/*
 * @Author: ShenJie 
 * @Date: 2018-10-13 20:32:20 
 * @Last Modified by: ShenJie
 * @Last Modified time: 2018-10-18 11:08:17
 * 检查有无新版发布
 */
import axios from '../https'
import AlertWindow from '../module/mo-alertWindow'

import { denytoupdateAction } from './user'
// console.log(denytoupdateAction);
import store from '../store'
console.log(store);


const thisversion = {
    ios: 201810181018,
    android: 201810181018
}
const userdenytoupdate = false
// await axios.reject('出错了');
const ua = navigator.userAgent.toLowerCase()



const judgeversion = function(cb_cancel) {

    // 获取用户是否拒绝过更新
    let denystate = store.getState().UserReducer.denytoupdate
    console.log(denystate);
    if(denystate){
        console.log('用户本次已拒绝过，不弹窗。');
        return
    }
    console.log('用户未曾拒绝，弹窗提示更新。');
    axios.post('/Game/AppLatestVer')
        .then(res=>{
            console.log(res);
            if (ua && ua.indexOf('iphone')>-1 
            && thisversion.ios < res.ios ) {
                console.log('ios有更新');
                
                // ios有更新
                AlertWindow.Confirm(
                    "有新版本可用，是否立即更新？", 
                    () => { 
                        console.log('ios：用户接受更新');
                        window.cordova.InAppBrowser.open('https://www.pgyer.com/qjDa', '_system', 'location=no')
                    },
                    ()=>{
                        // 取消
                        console.log('ios：用户拒绝更新');
                        denytoupdateAction()
                    })
            } else if (ua && ua.indexOf('android')>-1 
            && thisversion.android < res.android) {
                // android有更新
                console.log('android有更新');

                AlertWindow.Confirm({
                    title:'温馨提示',
                    txt:"有新版本可用，是否立即更新？"}, 
                    () => { 
                        console.log('安卓：用户接受更新');
                        window.cordova.InAppBrowser.open(res.apkdownload, '_system', 'location=no')
                    },
                    ()=>{
                        console.log('安卓：用户拒绝更新');
                        denytoupdateAction()                
                    })
            }
        })
        .catch(err=>{
            console.log(err);
            
        }) 
}
export default {
    thisversion,ua,judgeversion
}
