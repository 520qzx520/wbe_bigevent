(function(){
    //校验规则
    let form = layui.form
    

    form.verify({
        pwd:  [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        
        //不能与原密码相同
        samePwd: function(value){
            if(value === $('[name=oldPwd]').val()){
                return "新旧密码不能相同"
        }
       },

       // 判断两次密码是否一致
       rePwd: function(value){
           if(value !== $('[name=newPwd]').val()){
               return "两次密码不一致"
           }
       }
    })

    //修改密码提交
    $('.layui-form').on("submit",function(e){
        // 阻止默认提交事件
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layui.layer.msg("原密码输入不正确")
                }else{
                    layui.layer.msg("更新密码成功")
                    //重置表单
                    $('.layui-form')[0].reset()
                }
            }
        })
    })



})()