var Blackboard_dev = {};

//分成订单数折线图
Blackboard_dev.divideamount = function (arr) {
    Morris.Line({
        element: 'divideamount',
        data: arr,
        xkey: 'time',
        ykeys: ['ordercount'],
        parseTime: false,
        resize: true,
        lineWidth: 4,
        labels: ['订单数'],
        lineColors: ['#1ab394'],
        pointSize: 5,
    });
};

//消费订单折线图
Blackboard_dev.consume = function (arr) {
    Morris.Line({
        element: 'consume',
        data: arr,
        xkey: 'time',
        ykeys: ['ordercount'],
        parseTime: false,
        resize: true,
        lineWidth: 4,
        labels: ['订单数'],
        lineColors: ['#1ab394'],
        pointSize: 5,
    });
};

//查询12个月前消费订单数折线图
Blackboard_dev.selectDeveloperAmountConsumeByMonth = function () {
    $("#consume").html("");
    $("#consume svg").remove();
    $("#customorder_month").removeClass("active");
    $("#customorder_year").addClass("active");
    var endTime = new Date();
    var ajax_consume = new $ax(Feng.ctxPath + "/statisticDevelop/selectDeveloperAmountConsumeByMonth", function (data) {
        var newDateArr = Blackboard_dev.setDataToArrByMonth(data, endTime);
        //加载折线图
        Blackboard_dev.consume(newDateArr);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax_consume.set("beginTime", DateUtils.getNextMonthYM(endTime, -12) + "-01");//设置时间为月份的第一天
    ajax_consume.set("endTime", DateUtils.getMonthEndDate());//设置时间为当前月的最后一天
    ajax_consume.start();
};

//查询30天前实例消费折线图
Blackboard_dev.selectDeveloperAmountConsumeByDay = function () {
    var endTime = new Date();//当前日期
    var beginTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000 * 30);//30天前
    $("#consume").html("");
    $("#consume svg").remove();
    $("#customorder_year").removeClass("active");
    $("#customorder_month").addClass("active");
    var ajax_consume = new $ax(Feng.ctxPath + "/statisticDevelop/selectDeveloperAmountConsumeByDay", function (data) {
        var newDateArr = Blackboard_dev.setDataToArrByDay(data, endTime);
        //加载折线图
        Blackboard_dev.consume(newDateArr);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax_consume.set("beginTime", DateUtils.formatDate(beginTime));
    ajax_consume.set("endTime", DateUtils.formatDate(endTime));
    ajax_consume.start();
};

//查询12个月前分成订单数折线图
Blackboard_dev.selectDeveloperAmountDivideByMonth = function () {
    $("#divideamount").html("");
    $("#divideamount svg").remove();
    $("#order_year").addClass("active");
    $("#order_month").removeClass("active");
    var endTime = new Date();
    var ajax_divideamount = new $ax(Feng.ctxPath + "/statisticDevelop/selectDeveloperAmountDivideByMonth", function (data) {
        var newDateArr = Blackboard_dev.setDataToArrByMonth(data, endTime);
        //加载折线图
        Blackboard_dev.divideamount(newDateArr);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax_divideamount.set("beginTime", DateUtils.getNextMonthYM(endTime, -12) + "-01");//设置时间为月份的第一天
    ajax_divideamount.set("endTime", DateUtils.getMonthEndDate());//设置时间为当前月的最后一天
    ajax_divideamount.start();
};

//查询30天前分成收入折线图
Blackboard_dev.selectDeveloperAmountDivideByDay = function () {
    var endTime = new Date();//当前日期
    var beginTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000 * 30);//30天前
    $("#divideamount").html("");
    $("#divideamount svg").remove();
    $("#order_year").removeClass("active");
    $("#order_month").addClass("active");
    var ajax_divideamount = new $ax(Feng.ctxPath + "/statisticDevelop/selectDeveloperAmountDivideByDay", function (data) {
        var newDateArr = Blackboard_dev.setDataToArrByDay(data, endTime);
        //加载折线图
        Blackboard_dev.divideamount(newDateArr);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax_divideamount.set("beginTime", DateUtils.formatDate(beginTime));
    ajax_divideamount.set("endTime", DateUtils.formatDate(endTime));
    ajax_divideamount.start();
};

//将时间和对应数据存入数组(按月存入)
Blackboard_dev.setDataToArrByMonth = function (data, endTime) {
    var arr = [];
    for (var i = -12; i < 0; i++) {//获取没有消费的日期 并显示在折线图
        var tempdate = DateUtils.getNextMonthYM(endTime, i);//转换格式为 yy-mm
        arr.push(tempdate);//将12个月日期存入数组
    }
    var newDateArr = [];//存入新的数据展示到折线图
    for (var i = 0; i < arr.length; i++) {
        var ordercount;
        var flag = 1;
        for (var j = 0; j < data.length; j++) {
            if (arr[i] != data[j]["time"]) {
                flag = 0;//当天没有消费
            } else {
                flag = 1;//当天有消费
                ordercount = data[j]["ordercount"];
                break;
            }
        }
        if (flag == 0) {//当天没有消费 给默认值0
            newDateArr.push({"ordercount": 0, "time": arr[i]});
        } else {//当天有消费 存入后台数据
            newDateArr.push({"ordercount": ordercount, "time": arr[i]});
        }
    }
    console.log(newDateArr)
    return newDateArr;
};


//将时间和对应数据存入数组(按天存入)
Blackboard_dev.setDataToArrByDay = function (data, endTime) {
    var arr = [];
    for (var i = -30; i <= 0; i++) {//获取没有消费的日期 并显示在折线图
        var tempdate = DateUtils.getNextDateMD(endTime, i);//转换格式为 mm-dd
        arr.push(tempdate);//将30天日期存入数组
    }
    var newDateArr = [];//存入新的数据展示到折线图
    for (var i = 0; i < arr.length; i++) {
        var ordercount;
        var flag = 1;
        for (var j = 0; j < data.length; j++) {
            if (arr[i] != data[j]["time"]) {
                flag = 0;//当天没有消费
            } else {
                flag = 1;//当天有消费
                ordercount = data[j]["ordercount"];
                break;
            }
        }
        if (flag == 0) {//当天没有消费 给默认值0
            newDateArr.push({"ordercount": 0, "time": arr[i]});
        } else {//当天有消费 存入后台数据
            newDateArr.push({"ordercount": ordercount, "time": arr[i]});
        }
    }
    return newDateArr;
};

//首页数据展示
Blackboard_dev.indexStatistic = function () {
    var ajax = new $ax(Feng.ctxPath + "/statisticDevelop/selectIndexStatistic", function (data) {
        $("#orderAmount").html(data.orderAmount);
        $("#orderCount").html(data.orderCount);
        $("#devCount").html(data.devCount);
        $("#resCount").html(data.resCount);
        $("#orderAllCount").html(data.orderAllCount);
        $("#orderMonthAmount").html(data.orderMonthAmount);
        $("#orderMonthCount").html(data.orderMonthCount);
        $("#CustomOrderAomount").html(data.CustomOrderAomount);
        $("#customorderAllCount").html(data.devCount);
        $("#customorderMonthCount").html(data.customorderMonthCount);
        $("#customorderMonthAmount").html(data.customorderMonthAmount);
    }, function (data) {
        Feng.error("操作失败!" + data.responseJSON.message + "!");
    });
    ajax.start();
};


$(function () {
    var ajax = new $ax(Feng.ctxPath + "/statisticDevelop/getSalemodel", function (data) {
        //统一零售价
        if (data == 1) {
            $("#income").show();//月收入
            $("#incomeOrderCount").show();//分成订单数
            $("#resourceCount").show();//资源数
            $("#DivideOrder").show();//分成订单图
            //初始化分成收入折线图(天)
            Blackboard_dev.selectDeveloperAmountDivideByDay();
            //加载首页数据
            Blackboard_dev.indexStatistic();
        }
        //统一定价
        if (data == 2) {
            $("#CustomOrder").show();//月消费
            $("#CustomOrdercount").show();//消费订单数
            $("#resourceCount").show();//资源数
            $("#ConsumeOrder").show();//消费订单图
            //初始化实例消费折线图 (天)
            Blackboard_dev.selectDeveloperAmountConsumeByDay();
            //加载首页数据
            Blackboard_dev.indexStatistic();
        }
        //未指定合作模式
        if (data == 0) {
            $("#income").show();//月收入
            $("#incomeOrderCount").show();//月分成订单数
            $("#CustomOrdercount").show();//月消费订单数
            $("#resourceCount").show();//资源数
            $("#ConsumeOrder").show();//消费订单图
            $("#DivideOrder").show();//分成订单图
            //初始化实例消费折线图 (天)
            Blackboard_dev.selectDeveloperAmountConsumeByDay();
            //初始化分成收入折线图(天)
            Blackboard_dev.selectDeveloperAmountDivideByDay();
            //加载首页数据
            Blackboard_dev.indexStatistic();
        }
    }, function (data) {
        Feng.error("加载失败")
    });
    ajax.start();
});







