//每次调用 get, post, ajax的时候 都会先调用这个函数
$.ajaxPrefilter(function(options){
  
    // 再发起Ajax 请求前 统一拼接请求根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // 统一为权限接口 设置headers请求头 ，相当于vue的路由拦截

    if(options.url.indexOf('/my/') !== -1){ 
        
       
        options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
           
    }
    //全局挂载 complete
    options.complete = function(res){
         // complete 函数中使用res.response.json 拿到服务器相应的数据
         if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
            localStorage.removeItem("token")
            location.href = '/login.html'
        }
    }
   
})