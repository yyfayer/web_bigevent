$(function(){
    $(".go-reg").on("click",function () { 
        $("#loginBox").hide()
        $("#regBox").show()
    })
    $(".go-login").on("click",function () { 
        $("#regBox").hide()
        $("#loginBox").show()
    })
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        repwd:function(value){
            let pwd =$("#regBox [name=password]").val() 
            if(pwd !== value){
                return '两次密码不一致！'
            }
        }
      }); 
    $("#form-reg").on("submit",function(e){
        e.preventDefault()
        $.post("/api/reguser"), {username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()},function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            $("form-login").click()
        }
    })
    $("#form-login").on("submit",function(e){
        e.preventDefault()
        console.log(111)
        location.href = "/index.html"
        // location.href = "https://www.baidu.com"
        // e.preventDefault()
        // $.ajax({
        //     url:"http://www.liulongbin.top:3007/api/login",
        //     method:"POST",
        //     data:$(this).serialize(),
        //     success: function(res){
        //         if(res.status !== 0){
        //             return layer.msg("登录失败！")
        //         }
        //         layer.msg("登录成功！")
        //         localStorage.setItem("token",res.token)
        //         location.href = "/index.html"

        //     }
        // })
    })
})