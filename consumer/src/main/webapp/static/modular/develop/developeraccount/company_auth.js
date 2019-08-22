/**
 * 初始化开发者管理详情对话框
 */
var CompanyAuthDlg = {
	companyAuthData : {}
};

/**
 * 清除数据
 */
CompanyAuthDlg.clearData = function() {
    this.companyAuthData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
CompanyAuthDlg.set = function(key, val) {
    this.companyAuthData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
CompanyAuthDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 收集数据
 */
CompanyAuthDlg.collectData = function() {
	this.companyAuthData['contractfile'] = $("#contractfilefilename").val();
	this.companyAuthData['contractfilepath'] = $("#contractfile").val();
	this.companyAuthData['licensefilepath'] = $("#licensefile").val();
    this
    .set('id')
    .set('appname')
    .set('companyname')
    .set('companycode')
    .set('companyaddress')
    .set('contacts')
    .set('phonenum');
}


/**
 * 校验资料填写内容
 */
CompanyAuthDlg.validateview1 = function() {
	 var status = $("#status").val();
     if ($("#appname").val().length == 0) {
        Feng.error("请输入应用名称");
        return false;
     }
	 if ($("#companyname").val().length == 0) {
         Feng.error("请输入企业名称");
         return false;
     }
     if ($("#companycode").val().length == 0) {
         Feng.error("请输入企业信用码");
         return false;
     }
     if ($("#companyaddress").val().length == 0) {
         Feng.error("请输入企业地址");
         return false;
     }
     if ($("#contacts").val().length == 0) {
         Feng.error("请输入联系人");
         return false;
     }
     if ($("#phonenum").val().length == 0) {
         Feng.error("请输入手机号");
         return false;
     }
	 var regphone = /^(1[0-9][0-9])\d{8}$/;
     if(!regphone.test($("#phonenum").val())){
   	 	 Feng.error("请输入正确格式手机号"+$("#phonenum").val());
         return false;
     }
     var flag = false;
    if(status==2||status==1){
        //审核中或审核通过
    	 flag=true;
     }else{
    	 if ($("#verificationcode").val().length == 0) {
             Feng.error("请输入验证码");
             return false;
         }
    	 var ajax = new $ax(Feng.ctxPath + "/mgr/getVerificationCodeByPhonenum", function(data){
	        if(data.flag){
	        	flag = true;
	        }else{
	        	Feng.error("验证码不正确!");
	        	flag = false;
	        }
	     },function(data){
	        Feng.error("获取短信验证码失败!" + data.responseJSON.message + "!");
	     });
	     ajax.set("phonenum",$("#phonenum").val());
	     ajax.set("verificationcode",$("#verificationcode").val());
	     ajax.start();
     }
     return flag;
}

/**
 * 提交添加
 */
CompanyAuthDlg.addSubmit = function() {

    this.clearData();
    this.collectData();
    var contractfile = $("#contractfile").val();
    if(contractfile.length==0){
    	Feng.error("请上传合同附件");
    	return false;
    }
    var licensefile = $("#licensefile").val();
    if(licensefile.length==0){
    	Feng.error("请上传营业执照");
    	return false;
    }
    var submitFlag = false;
  //提交信息
    var ajax = new $ax(Feng.ctxPath + "/developeraccount/save_company_auth", function(data){
        Feng.success("提交成功，等待审核!");
        submitFlag = true;
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
        submitFlag = false;
    });
    ajax.set(this.companyAuthData);
    ajax.start();
    return submitFlag;
}
function fun(n){
    if(n>0){
        n--;
        $("#btn_verificationcode").html("获取验证码 "+n+"s");
        $("#btn_verificationcode").attr("disabled", true);
        setTimeout("fun("+n+")",1000)
    }      
    else{
    	$("#btn_verificationcode").html("获取验证码");
    $("#btn_verificationcode").attr("disabled", false);
    }
}
/**
 * 获取验证码
 */
CompanyAuthDlg.getVerificationCode = function() {
	var phonenum = $("#phonenum").val();
	$("#btn_verificationcode").attr("disabled", true);
	$("#btn_verificationcode").html("获取验证码 60s");
	setTimeout("fun(60)",1000)
	//获取验证码
	var ajax = new $ax(Feng.ctxPath + "/mgr/generateVerificationCode", function(data){
        console.log(data.verificationcode);
    },function(data){
        Feng.error("获取短信验证码失败!" + data.responseJSON.message + "!");
    });
    ajax.set("phonenum",phonenum);
    ajax.start();
	
}
