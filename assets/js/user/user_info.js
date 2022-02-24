(function () {

    let form = layui.form
    let layer = layui.layer
    // 验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度在1 ~ 6 个字符之间'
            }
        }
    })
    initUserInfo()
    //获取数据
    //初始化用户基本信息
    function initUserInfo () {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败")
                } else {
                    //调用form.val 快速给表单赋值
                    form.val('formUserInfo', res.data)
                    
                }
            }
        })
    }

    //重置表单的按钮
    $('#btnReset').on('click', function (e) {
        //阻止默认行为
        e.preventDefault()
        //重新获取用户信息
        initUserInfo()
    })

    //提交事件
    $('.layui-form').on('submit', function (e) {
        //阻止表单默认提交事件
        e.preventDefault()
        //发起ajax请求
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            //this表示 layui-form serialize方法快速获取填写的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败")
                } else {
                    layer.msg("更新用户信息成功")
                    //重新调用页面方法(父页面的方法)，渲染用户信息
                    window.parent.getUserInfo()
                }
            }
        })

    })





})()