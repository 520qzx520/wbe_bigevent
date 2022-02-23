(function(){
   
    //调用函数获取用户资料
    getUserInfo()

    //退出按钮，退出事件
    $('#btn_logout').on('click',function(){
        //弹出提示消息框，是否退出
        layer.confirm('是否退出登录?', {icon: 3, title:'提示'}, function(index){
            // 1 清空token
            localStorage.removeItem('token')
            // 2 跳转到登录页面
            location.href = '/login.html'
            // 3 关闭提示框
            layer.close(index);
          });
        
    })
})() 

//获取用户基本资料
    function getUserInfo(){
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res){
                if(res.status !== 0){
                   return layui.layer.msg("获取用户信息失败")
                }else{
                    //调用函数渲染用户头像
                    renderAvatar(res.data)
                }
            },

        
    })
    }

    //渲染用户头像
    function renderAvatar(userData){
        //1、获取用户名称
        let name = userData.nickname || userData.username
        //2、 设置欢迎文本
        $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
        // 3 按需渲染头像
        if(userData.user_pic){
            // 3.1 渲染图片头像 
            $('.text-avatar').hide()
            $('.layui-nav-img').attr('src', userData.user_pic).show()
           
        }else{
            // 3.2 渲染文字头像
             $('.layui-nav-img').hide()
             // 文字第一个字渲染到头像上
             let firstNameData = name[0].toUpperCase()
             $('.text-avatar').html(firstNameData).show()
        }
    }