$(function () {
    $(".go-reg").on("click", function () {
        $("#loginBox").hide()
        $("#regBox").show()
    })
    $(".go-login").on("click", function () {
        $("#regBox").hide()
        $("#loginBox").show()
    })
    let form = layui.form
    let layer = layui.layer
    form.verify({
        //自定义pwd校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let pwd = $("#regBox [name=password]").val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    });
    $("#formReg").on("submit", function (e) {
        e.preventDefault()
        $.post("/register", {
            username: $('#formReg [name=username]').val(),
            password: $('#formReg [name=password]').val()
        }, function (res) {
            if (res.status !== 0)
                return layer.msg(res.message)
        })
    })

    $("#form-login").on("submit", function (e) {
        e.preventDefault()

        $.ajax({
            url: "/login",
            method: "POST",
            data: $(this).serialize(),
            success: function (res) {
                if (res.message !== '登录成功') {
                    return layer.msg("登录失败！")
                }
                layer.msg("登录成功！")
                localStorage.setItem("token", res.token)
                location.href = "/index.html"
            }
        })
    })
})