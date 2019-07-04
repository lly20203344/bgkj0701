//公共方法
var Vue = require('vue');
// Vue.http.options.credentials = true;
function requestAjax(url,param,dataForm = null,callBack,failBack=null) {
    let sessionId = sessionStorage.getItem('sessionId');
    console.log(sessionId, 'sessionId')
    let sendUrl = url + '?sessionId=' + sessionId;
    for(let item in dataForm){
        sendUrl = sendUrl + "&" + item + '=' + dataForm[item];
    }
    Vue.default.http.post(sendUrl,param,{headers:{'Content-Type':'application/json;charset=UTF-8',sessionId:sessionStorage.getItem('sessionId')},emulateJSON: true},{emulateJSON: true,credentials: true}).then(res => {
        callBack(res.data)
    }, res => {
        if(failBack){
            failBack(res.data)
        }
    });
}
function formSubmit(url,param,callBack,failBack=null) {
    Vue.default.http.post(url, param, {headers:{'Content-Type':'multipart/form-data',sessionId:sessionStorage.getItem('sessionId')},emulateJSON: true,sessionId:sessionStorage.getItem('sessionId')}).then(res => {
        callBack(res.data)
    }, res => {
        if(failBack){
            failBack(res.data)
        }
    });
}

function setCookie(name, value){
    var Days = 2;
    var exp = new Date();
    exp.setTime(exp.getTime()+Days*24*60*60*1000);
   // document.cookie = name + "=" + escape(value) ;
    document.cookie = name + "="+ escape(value) +";path=/;expires="+ exp.toGMTString();
}

//读取cookie：
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");　　
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}

module.exports = {
  requestAjax: requestAjax,
  formSubmit:formSubmit,
  getCookie:getCookie
}
