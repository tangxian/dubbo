var Developeramount = {};


//分成收入折线图
Developeramount.divideamount = function (arr) {
    Morris.Line({
        element: 'divideamount',
        data: arr,
        xkey: 'time',
        ykeys: ['amount'],
        parseTime: false,
        resize: true,
        lineWidth: 4,
        labels: ['金额'],
        lineColors: ['#1ab394'],
        pointSize: 5,
    });
};


//实例消费折线图
Developeramount.consume = function (arr) {
    Morris.Line({
        element: 'consume',
        data: arr,
        xkey: 'time',
        ykeys: ['amount'],
        parseTime: false,
        resize: true,
        lineWidth: 4,
        labels: ['消费'],
        lineColors: ['#1ab394'],
        pointSize: 5,
    });
};


//查询12个月前实例消费折线图
Developeramount.selectDeveloperAmountConsumeByMonth = function () {
    $("#consume").html("");
    $("#consume svg").remove();
    $("#AmountConsumeByDay").removeClass("active");
    $("#AmountConsumeByMonth").addClass("active");
    var endTime = new Date();
    var ajax_consume = new $ax(Feng.ctxPath + "/developeraccount/selectDeveloperAmountConsumeByMonth", function (data) {
        var newDateArr = Developeramount.setDataToArrByMonth(data, endTime);
        //加载折线图
        Developeramount.consume(newDateArr);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax_consume.set("beginTime", DateUtils.getNextMonthYM(endTime, -12) + "-01");//设置时间为月份的第一天
    ajax_consume.set("endTime", DateUtils.getMonthEndDate());//设置时间为当前月的最后一天
    ajax_consume.start();
};


//查询30天前实例消费折线图
Developeramount.selectDeveloperAmountConsumeByDay = function () {
    var endTime = new Date();//当前日期
    var beginTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000 * 30);//30天前
    $("#consume").html("");
    $("#consume svg").remove();
    $("#AmountConsumeByMonth").removeClass("active");
    $("#AmountConsumeByDay").addClass("active");
    var ajax_consume = new $ax(Feng.ctxPath + "/developeraccount/selectDeveloperAmountConsumeByDay", function (data) {
        var newDateArr = Developeramount.setDataToArrByDay(data, endTime);
        //加载折线图
        Developeramount.consume(newDateArr);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax_consume.set("beginTime", DateUtils.formatDate(beginTime));
    ajax_consume.set("endTime", DateUtils.formatDate(endTime));
    ajax_consume.start();
};


//查询12个月前分成收入折线图
Developeramount.selectDeveloperAmountDivideByMonth = function () {
    $("#divideamount").html("");
    $("#divideamount svg").remove();
    $("#AmountDivideByMonth").addClass("active");
    $("#AmountDivideByDay").removeClass("active");
    var endTime = new Date();
    var ajax_divideamount = new $ax(Feng.ctxPath + "/developeraccount/selectDeveloperAmountDivideByMonth", function (data) {
        var newDateArr = Developeramount.setDataToArrByMonth(data, endTime);
        //加载折线图
        Developeramount.divideamount(newDateArr);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax_divideamount.set("beginTime", DateUtils.getNextMonthYM(endTime, -12) + "-01");//设置时间为月份的第一天
    ajax_divideamount.set("endTime", DateUtils.getMonthEndDate());//设置时间为当前月的最后一天
    ajax_divideamount.start();
};


//查询30天前分成收入折线图
Developeramount.selectDeveloperAmountDivideByDay = function () {
    var endTime = new Date();//当前日期
    var beginTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000 * 30);//30天前
    $("#divideamount").html("");
    $("#divideamount svg").remove();
    $("#AmountDivideByMonth").removeClass("active");
    $("#AmountDivideByDay").addClass("active");
    var ajax_divideamount = new $ax(Feng.ctxPath + "/developeraccount/selectDeveloperAmountDivideByDay", function (data) {
        var newDateArr = Developeramount.setDataToArrByDay(data, endTime);
        //加载折线图
        Developeramount.divideamount(newDateArr);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax_divideamount.set("beginTime", DateUtils.formatDate(beginTime));
    ajax_divideamount.set("endTime", DateUtils.formatDate(endTime));
    ajax_divideamount.start();
};


//将时间和对应数据存入数组(按月存入)
Developeramount.setDataToArrByMonth = function (data, endTime) {
    var arr = [];
    for (var i = -12; i < 0; i++) {//获取没有消费的日期 并显示在折线图
        var tempdate = DateUtils.getNextMonthYM(endTime, i);//转换格式为 yy-mm
        arr.push(tempdate);//将12个月日期存入数组
    }
    var newDateArr = [];//存入新的数据展示到折线图
    for (var i = 0; i < arr.length; i++) {
        var amount;
        var flag = 1;
        for (var j = 0; j < data.length; j++) {
            if (arr[i] != data[j]["time"]) {
                flag = 0;//当天没有消费
            } else {
                flag = 1;//当天有消费
                amount = data[j]["amount"];
                break;
            }
        }
        if (flag == 0) {//当天没有消费 给默认值0
            newDateArr.push({"amount": 0, "time": arr[i]});
        } else {//当天有消费 存入后台数据
            newDateArr.push({"amount": amount, "time": arr[i]});
        }
    }
    console.log(newDateArr)
    return newDateArr;
};


//将时间和对应数据存入数组(按天存入)
Developeramount.setDataToArrByDay = function (data, endTime) {
    var arr = [];
    for (var i = -30; i <= 0; i++) {//获取没有消费的日期 并显示在折线图
        var tempdate = DateUtils.getNextDateMD(endTime, i);//转换格式为 mm-dd
        arr.push(tempdate);//将30天日期存入数组
    }
    var newDateArr = [];//存入新的数据展示到折线图
    for (var i = 0; i < arr.length; i++) {
        var amount;
        var flag = 1;
        for (var j = 0; j < data.length; j++) {
            if (arr[i] != data[j]["time"]) {
                flag = 0;//当天没有消费
            } else {
                flag = 1;//当天有消费
                amount = data[j]["amount"];
                break;
            }
        }
        if (flag == 0) {//当天没有消费 给默认值0
            newDateArr.push({"amount": 0, "time": arr[i]});
        } else {//当天有消费 存入后台数据
            newDateArr.push({"amount": amount, "time": arr[i]});
        }
    }
    return newDateArr;
};


$(function () {
    var ajax = new $ax(Feng.ctxPath + "/developeraccount/getSalemodel", function (data) {
        if (data == 1) {
            //初始化分成收入折线图(天)
            Developeramount.selectDeveloperAmountDivideByDay();
            $("#ConsumeOrder").toggle();
        }
        if (data == 2) {
            //初始化实例消费折线图 (天)
            Developeramount.selectDeveloperAmountConsumeByDay();
            $("#DivideOrder").toggle();
        }
        if (data == 0) {
            //初始化实例消费折线图 (天)
            Developeramount.selectDeveloperAmountConsumeByDay();
            //初始化分成收入折线图(天)
            Developeramount.selectDeveloperAmountDivideByDay();
        }
    }, function (data) {
        Feng.error("加载失败")
    });
    ajax.start();
});
