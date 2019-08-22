register = function () {
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/mgr/register_user", function (data) {
        Feng.success("注册成功,请登录!");
        setTimeout(function () {
            window.location.href = "${ctxPath}/login";
        }, 1000);
    }, function (data) {
        Feng.error("注册失败!" + data.responseJSON.message + "!");
    });
    ajax.set("account", $("#account").val());
    ajax.set("email", $("#email").val());
    ajax.set("roleid", $("#roleid").val());
    ajax.set("password", $("#password").val());
    var emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if ($("#account").val().length == 0) {
        Feng.error("注册失败!请输入账号");
        return;
    }
    if ($("#email").val().length == 0) {
        Feng.error("注册失败!请输入邮箱");
        return;
    }
    if (!emailReg.test($("#email").val())) {
        Feng.error("注册失败!邮箱格式错误");
        return;
    }
    if ($("#password").val().length == 0) {
        Feng.error("注册失败!请输入密码");
        return;
    }
    if ($("#password_verify").val().length == 0) {
        Feng.error("注册失败!请输入确认密码");
        return;
    }
    ajax.start();
};

$(function () {
    //判断确认密码是否一致
    $("#password_verify").blur(function () {
        var password_verify = $("#password_verify").val();
        var password = $("#password").val();
        if (password_verify != password) {
            $("#password_verify").val("");
            $("#password_verify").css("border", "1px solid red");
            $("#error").html("<font color='red' size='3'>密码不一致</font>");
        } else if (password_verify == password) {
            $("#password_verify").removeAttr("style");
            $("#error").html("");
        }
    });
});