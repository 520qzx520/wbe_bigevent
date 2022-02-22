(function(){
    //点击 去注册账号的连接
    $('#link_reg').on('click', function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击 去登录的连接
    $('#link_login').on('click', function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui 获取form对象
    var form = layui.form
    let layer = layui.layer

    //校验规则
    //自定义校验规则
    form.verify({
        // 用户名的校验规则
        userName:  function(){ //value：表单的值、item：表单的DOM对象
            let username = $('.layui-form-item [name=username]').val()
            if(/(^\_)|(\__)|(\_+$)/.test(username)){
              return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(username)){
              return '用户名不能全为数字';
            }
        },
        // 密码的校验
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],

        //校验两次密码是否相等
        repwd: function(value){
            //父盒子为reg-box name为password的属性,拿到输入的密码框的值
            let pwd = $('.reg-box [name=password]').val()
            if(pwd !== value){
                return "两次输入的密码不一致"
            }
        }


    })

    //注册
    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        //阻止默认行为
        e.preventDefault()

        let data = {
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        }
        //发起ajax的post请求 还有参数值
        $.post('/api/reguser',data,function(res){
            if(res.status !== 0){
                return  layer.msg(res.message);
            }
            layer.msg('注册成功');

            //模拟用户点击跳转
            $('#link_login').click()
        })
    })

    //登录
    //登录表单的提交事件
    $('#form_login').submit(function(e){
        //阻止默认行为
        e.preventDefault()
        // 发生请求
        $.ajax({
            url: '/api/login',
            method: "POST",
            //Jquery 中的方法 快速获取表单参数
            data: $(this).serialize(),
            success: function(res){
               if(res.status !== 0){
                   return layer.msg("登录失败")
               }else{
                   layer.msg("登陆成功")

                   //存储token的值
                   localStorage.setItem('token',res.token)
            
                   //成功跳转到主页
                   location.href = '/index.html'
               }
               

            }

        })
    })













})()