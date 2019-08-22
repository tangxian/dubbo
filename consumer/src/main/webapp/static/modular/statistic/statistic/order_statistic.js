/**
 * 首页初始化
 */
var OrderStatistic = {
    id: "flot-dashboard-chart",
    seItem: null,
    table: null,
    layerIndex: -1
};

/**
 * 订单统计图表
 */
OrderStatistic.orderCharts = function (data_pay, data_order, maxcount) {
    var tickSizeNew = Math.ceil(data_pay.length/14);
    $('.chart').easyPieChart({
        barColor: '#f8ac59',
        //                scaleColor: false,
        scaleLength: 5,
        lineWidth: 4,
        size: 80
    });

    $('.chart2').easyPieChart({
        barColor: '#1c84c6',
        //                scaleColor: false,
        scaleLength: 5,
        lineWidth: 4,
        size: 80
    });

    var dataset = [
        {
            label: "订单",
            data: data_order,
            color: "#1ab394",
            bars: {
                show: true,
                align: "center",
                barWidth: 24 * 60 * 60 * 600,
                lineWidth: 0
            }

        }, {
            label: "金额",
            data: data_pay,
            yaxis: 2,
            color: "#464f88",
            lines: {
                lineWidth: 1,
                show: true,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 0.2
                    }, {
                        opacity: 0.2
                    }]
                }
            },
            splines: {
                show: false,
                tension: 0.6,
                lineWidth: 1,
                fill: 0.1
            },
        }
    ];


    var options = {
        xaxis: {
            mode: "time",
            tickSize: [tickSizeNew, "day"],
            tickLength: 0,
            axisLabel: "Date",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Arial',
            axisLabelPadding: 10,
            color: "#838383"
        },
        yaxes: [{
            position: "left",
            max: ordercountMax,
            color: "#838383",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Arial',
            axisLabelPadding: 3
        }, {
            position: "right",
            max: paycountMax,
            tickDecimals:2,
            clolor: "#838383",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: ' Arial',
            axisLabelPadding: 67
        }
        ],
        legend: {
            show: true,
            noColumns: 1,
            labelBoxBorderColor: "#000000",
            position: "nw"
        },
        tooltip: true,
        tooltipOpts: {
            content: "时间: %x<br/> %s: %y",
            xDateFormat: "%y-%0m-%0d"
        },
        grid: {
            hoverable: true,
            borderWidth: 0,
            color: '#838383'
        }
    };

    var previousPoint = null,
        previousLabel = null;

    $.plot($("#flot-dashboard-chart"), dataset, options);
};

function gd(year, month, day) {
    return new Date(year, month - 1, day).getTime() + 1000 * 60 * 60 * 24;
}

/**
 * 条件查询饼状图
 */
OrderStatistic.search_pie_chart = function () {
    var ajax_order = new $ax(Feng.ctxPath + "/statistic/selectOrderPieStatistic", function (data) {
        var platformArr = [];
        var countArr = [];
        var amountArr = [];
        $.each(data, function (key, val) {
            platformArr.push(val.platform);
            var orderObj = new Object();
            orderObj = {value: parseInt(val.ordercount), name: val.platform};
            countArr.push(orderObj);
            var amountObj = new Object();
            amountObj = {value: parseFloat(val.orderamount), name: val.platform};
            amountArr.push(amountObj);
        });
        //加载平台订单占比圆形图
        OrderStatistic.loadOrder_countChart(platformArr, countArr);
        //加载平台金额占比圆形图
        OrderStatistic.loadOrder_amountChart(platformArr, amountArr);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax_order.set("appname", $("#appname").val());
    ajax_order.set("beginTime", $("#beginTime_pie_chart").val());
    ajax_order.set("endTime", $("#endTime_pie_chart").val());
    ajax_order.start();
};
/**
 * 条件订单折现图
 */
OrderStatistic.search_dashboard_chart = function () {
    var ajax = new $ax(Feng.ctxPath + "/statistic/selectOrderStatistic", function (data) {
        var ordercountArr = new Array();
        var paycountArr = new Array();
        var data_payArr = new Array();
        var data_orderArr = new Array();
        $.each(data, function (key, val) {
            var ordercount = val.ordercount;
            var ordertime = val.ordertime;
            var paycount = val.paycount;
            ordercountArr.push(ordercount);
            paycountArr.push(paycount);
            var data_payTempArr = new Array();
            var ordertimeArr = ordertime.split("-");
            var data_orderTempArr = new Array();
            var time = gd(parseInt(ordertimeArr[0]), parseInt(ordertimeArr[1]), parseInt(ordertimeArr[2]));
            data_payTempArr.push(time);
            data_payTempArr.push(paycount);
            data_orderTempArr.push(time);
            data_orderTempArr.push(parseInt(ordercount));
            data_payArr.push(data_payTempArr);
            data_orderArr.push(data_orderTempArr);
        });
        paycountMax = Math.max.apply(Math, paycountArr);
        ordercountMax = Math.max.apply(Math, ordercountArr);
        var maxcount = paycountMax >= ordercountMax ? paycountMax : ordercountMax;
        OrderStatistic.orderCharts(data_payArr, data_orderArr, maxcount);
    }, function (data) {
        Feng.error("操作失败!" + data.responseJSON.message + "!");
    });
    ajax.set("platform", $("#platform").val());
    ajax.set("beginTime", $("#beginTime").val());
    ajax.set("endTime", $("#endTime").val());
    ajax.start();
};

/**
 * 平台-订单饼状图
 */

var pieChart_order;
OrderStatistic.loadOrder_countChart = function (XdataArr, YdataArr) {
    pieChart_order = echarts.init(document.getElementById("order_pie_chart"));
    var pieoption_order = {
        title: {
            text: '订单统计',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} 条 ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: XdataArr
        },
        calculable: true,
        series: [
            {
                name: '订单数量',
                type: 'pie',
                radius: '40%',
                center: ['50%', '60%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: '{b} :  {c} 条  ({d}%)'
                        },
                        labelLine: {
                            show: true
                        }
                    }
                },
                data: YdataArr
            }
        ]
    };
    pieChart_order.setOption(pieoption_order);
};

/**
 * 平台-金额饼图
 */
var pieChart_amount;
OrderStatistic.loadOrder_amountChart = function (XdataArr, YdataArr) {
    pieChart_amount = echarts.init(document.getElementById("amount_pie_chart"));
    var pieoption_amount = {
        title: {
            text: '销售额统计',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} 元 ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: XdataArr
        },
        calculable: true,
        series: [
            {
                name: '销售额',
                type: 'pie',
                radius: '40%',
                center: ['50%', '60%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: '{b} :  {c}元  ({d}%)'
                        },
                        labelLine: {
                            show: true
                        }
                    }
                },
                data: YdataArr
            }
        ]
    };
    pieChart_amount.setOption(pieoption_amount);
    window.onresize = function () {
        pieChart_amount.resize();
        pieChart_order.resize();
    }
};

$(function () {
    //获取当前日期
    var myDate = new Date();
    var nowY = myDate.getFullYear();
    var nowM = myDate.getMonth() + 1;
    var nowD = myDate.getDate();
    var endDate = nowY + "-" + (nowM < 10 ? "0" + nowM : nowM) + "-" + (nowD < 10 ? "0" + nowD : nowD);//当前日期
    //console.log(enddate);
    //获取三十天前日期
    var lw = new Date(myDate - 1000 * 60 * 60 * 24 * 30);//最后一个数字30可改，30天的意思
    var lastY = lw.getFullYear();
    var lastM = lw.getMonth() + 1;
    var lastD = lw.getDate();
    var startDate = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD);//三十天之前日期
    //console.log(startdate);
    //设置默认显示当前日期到前30天的统计记录
    $("#beginTime").val(startDate);
    $("#endTime").val(endDate);
    //加载订单图表数据
    var ajax_order = new $ax(Feng.ctxPath + "/statistic/selectOrderStatistic", function (data) {
        var ordercountArr = new Array();
        var paycountArr = new Array();
        var data_payArr = new Array();
        var data_orderArr = new Array();
        $.each(data, function (key, val) {
            var ordercount = val.ordercount;
            var ordertime = val.ordertime;
            var paycount = val.paycount;
            ordercountArr.push(ordercount);
            paycountArr.push(paycount);
            var ordertimeArr = ordertime.split("-");
            var data_payTempArr = new Array();
            var data_orderTempArr = new Array();
            var time = gd(parseInt(ordertimeArr[0]), parseInt(ordertimeArr[1]), parseInt(ordertimeArr[2]));
            data_payTempArr.push(time);
            data_payTempArr.push(paycount);
            data_orderTempArr.push(time);
            data_orderTempArr.push(parseInt(ordercount));
            data_payArr.push(data_payTempArr);
            data_orderArr.push(data_orderTempArr);
        });
        paycountMax = Math.max.apply(Math, paycountArr);
        ordercountMax = Math.max.apply(Math, ordercountArr);
        var maxcount = paycountMax >= ordercountMax ? paycountMax : ordercountMax;
        OrderStatistic.orderCharts(data_payArr, data_orderArr, maxcount);
    }, function (data) {
        Feng.error("操作失败!" + data.responseJSON.message + "!");
    });
    ajax_order.set("beginTime", $("#beginTime").val());
    ajax_order.set("endTime", $("#endTime").val());
    ajax_order.start();


    /**
     * 订单总数 最近一个月订单,销售额数据展示
     */
    var ajax_details = new $ax(Feng.ctxPath + "/statistic/selectDetailStatistic", function (data) {
        $("#orderAllCount").html(data.orderAllCount);
        $("#orderMonthAmount").html(data.orderMonthAmount);
        $("#orderMonthCount").html(data.orderMonthCount);
    }, function (data) {
        Feng.error("操作失败!" + data.responseJSON.message + "!");
    });
    ajax_details.start();
    /**
     * 查询资源类型下拉框
     */
    var ajax_resource = new $ax(Feng.ctxPath + "/dict/selectbyparentcodelist", function (data) {
        var strHtml = '<option value="0">全部</option>';
        $.each(data, function (key, val) {
            strHtml += '<option value="' + val.code + '">' + val.name + '</option>';
        })
        $("#platform").html(strHtml);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax_resource.set("code", "platform");
    ajax_resource.start();

    //加载平台-订单 平台-金额 饼状图
    var ajax_order = new $ax(Feng.ctxPath + "/statistic/selectOrderPieStatistic", function (data) {
        var platformArr = [];
        var countArr = [];
        var amountArr = [];
        $.each(data, function (key, val) {
            platformArr.push(val.platform);
            var orderObj = new Object();
            orderObj = {value: parseInt(val.ordercount), name: val.platform};
            countArr.push(orderObj);
            var amountObj = new Object();
            amountObj = {value: parseFloat(val.orderamount), name: val.platform};
            amountArr.push(amountObj);
        });
        //加载平台订单占比圆形图
        OrderStatistic.loadOrder_countChart(platformArr, countArr);
        //加载平台金额占比圆形图
        OrderStatistic.loadOrder_amountChart(platformArr, amountArr);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax_order.start();

    /**
     * 查询应用名称下拉框
     */
    var ajax_appname = new $ax(Feng.ctxPath + "/developer/selectAppname", function (data) {
        var strHtml = '<option value="">请选择应用</option>';
        $.each(data, function (key, val) {
            strHtml += '<option value="' + val.appname + '">' + val.appname + '</option>';
        })
        $("#appname").html(strHtml);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax_appname.start();
});
