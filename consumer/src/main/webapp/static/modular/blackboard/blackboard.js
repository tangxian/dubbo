/**
 * 首页初始化
 */
var Blackboard = {
    id_develop: "DevelopTable",	//渠道表格id
    id_resource: "ResourceTable", //资源表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};
/**
 * 初始化渠道表格的列
 */
Blackboard.initColumn_develop = function () {
    return [
        {field: 'selectItem', radio: true, visible: false},
        {
            field: 'SerialNumber',
            title: '#',
            sortable: true,
            align: "center",
            width: 40,
            formatter: function (value, row, index) {
                //获取每页显示的数量
                var pageSize = $('#DevelopTable').bootstrapTable('getOptions').pageSize;
                //获取当前是第几页
                var pageNumber = $('#DevelopTable').bootstrapTable('getOptions').pageNumber;
                //返回序号，注意index是从0开始的，所以要加上1
                return pageSize * (pageNumber - 1) + index + 1;
            }
        },
        {title: '应用名称', field: 'appname', visible: true, align: 'center', valign: 'middle'},
        {title: '平台', field: 'platform', visible: true, align: 'center', valign: 'middle'},
        {title: '开发者', field: 'companyname', visible: true, align: 'center', valign: 'middle'},
        {title: '订单数', field: 'ordercount', visible: true, align: 'center', valign: 'middle'},
        {title: '销售额', field: 'orderamount', visible: true, align: 'center', valign: 'middle'}
    ];
};
/**
 * 查询每月订单图表数据
 */
Blackboard.selectMonthOrder = function () {
    var ajax = new $ax(Feng.ctxPath + "/statistic/selectOrderStatistic", function (data) {
        var ordercountArr = new Array();//订单数量数组
        var paycountArr = new Array();//订单支付数量数组
        var data_payArr = new Array();//时间-支付数量数组(传入flot chart图)
        var data_orderArr = new Array();//时间-订单数量数组(传入flot chart图)
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
        })
        paycountMax = Math.max.apply(Math, paycountArr);
        ordercountMax = Math.max.apply(Math, ordercountArr);
        var maxcount = paycountMax >= ordercountMax ? paycountMax : ordercountMax;
        Blackboard.orderCharts(data_payArr, data_orderArr, maxcount);
    }, function (data) {
        Feng.error("操作失败!" + data.responseJSON.message + "!");
    });
    ajax.set("beginTime", DateUtils.getMonthStartDate());
    ajax.set("endTime", DateUtils.getMonthEndDate());
    $("#order_month").addClass("active");
    $("#order_year").removeClass("active");
    ajax.start();
};
/**
 * 查询每年订单图表数据
 */
Blackboard.selectYearOrder = function () {
    var ajax = new $ax(Feng.ctxPath + "/statistic/selectOrderStatistic", function (data) {
    	var ordercountArr = new Array();//订单数量数组
        var paycountArr = new Array();//订单支付数量数组
        var data_payArr = new Array();//时间-支付数量数组(传入flot chart图)
        var data_orderArr = new Array();//时间-订单数量数组(传入flot chart图)
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
            data_payTempArr.push(parseInt(paycount));
            data_orderTempArr.push(time);
            data_orderTempArr.push(parseInt(ordercount));
            data_payArr.push(data_payTempArr);
            data_orderArr.push(data_orderTempArr);
        })
        paycountMax = Math.max.apply(Math, paycountArr);
        ordercountMax = Math.max.apply(Math, ordercountArr);
        var maxcount = paycountMax >= ordercountMax ? paycountMax : ordercountMax;
        Blackboard.orderCharts(data_payArr, data_orderArr, maxcount);
    }, function (data) {
        Feng.error("操作失败!" + data.responseJSON.message + "!");
    });
    ajax.set("beginTime", DateUtils.getYearStartDate());
    ajax.set("endTime", DateUtils.getYearEndDate());
    $("#order_year").addClass("active");
    $("#order_month").removeClass("active");
    ajax.start();
};

/**
 * 查询每月渠道表数据
 */
Blackboard.selectMonthDevelop = function () {
    var queryData = {};
    queryData['beginTime'] = DateUtils.getMonthStartDate();
    queryData['endTime'] = DateUtils.getMonthEndDate();
    $("#develop_month").addClass("active");
    $("#develop_year").removeClass("active");
    Blackboard.table_develop.refresh({query: queryData});
};

/**
 * 查询每年渠道表数据
 */
Blackboard.selectYearDevelop = function () {
    var queryData = {};
    queryData['beginTime'] = DateUtils.getYearStartDate();
    queryData['endTime'] = DateUtils.getYearEndDate();
    $("#develop_year").addClass("active");
    $("#develop_month").removeClass("active");
    Blackboard.table_develop.refresh({query: queryData});
};


/**
 * 查询每月资源统计表数据
 */
Blackboard.selectMonthResource = function () {
    var queryData = {};
    queryData['beginTime'] = DateUtils.getMonthStartDate();
    queryData['endTime'] = DateUtils.getMonthEndDate();
    $("#resource_month").addClass("active");
    $("#resource_year").removeClass("active");
    Blackboard.table_resource.refresh({query: queryData});
};

/**
 * 查询每年资源统计表数据
 */
Blackboard.selectYearResource = function () {
    var queryData = {};
    queryData['beginTime'] = DateUtils.getYearStartDate();
    queryData['endTime'] = DateUtils.getYearEndDate();
    $("#resource_year").addClass("active");
    $("#resource_month").removeClass("active");
    Blackboard.table_resource.refresh({query: queryData});
};
/**
 * 初始化资源表格的列
 */
Blackboard.initColumn_resource = function () {
    return [
        {field: 'selectItem', radio: true, visible: false},
        {
            field: 'SerialNumber',
            title: '#',
            sortable: true,
            align: "center",
            width: 40,
            formatter: function (value, row, index) {
                //获取每页显示的数量
                var pageSize = $('#ResourceTable').bootstrapTable('getOptions').pageSize;
                //获取当前是第几页
                var pageNumber = $('#ResourceTable').bootstrapTable('getOptions').pageNumber;
                //返回序号，注意index是从0开始的，所以要加上1
                return pageSize * (pageNumber - 1) + index + 1;
            }
        },
        {title: '资源名称', field: 'resourcename', visible: true, align: 'center', valign: 'middle'},
        {title: '平台', field: 'platform', visible: true, align: 'center', valign: 'middle'},
        {title: '应用数量', field: 'appcount', visible: true, align: 'center', valign: 'middle'},
        {title: '订单数', field: 'ordercount', visible: true, align: 'center', valign: 'middle'},
        {title: '销售额', field: 'orderamount', visible: true, align: 'center', valign: 'middle'}
    ];
};
/**
 * 订单统计图表
 */
Blackboard.orderCharts = function (data_pay, data_order, maxcount) {
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
    return new Date(year, month - 1, day).getTime() + 86400000;
}

//首页数据展示
Blackboard.indexStatistic = function () {
    var ajax = new $ax(Feng.ctxPath + "/statistic/selectIndexStatistic", function (data) {
        $("#orderAmount").html(data.orderAmount);
        $("#orderCount").html(data.orderCount);
        $("#devCount").html(data.devCount);
        $("#resCount").html(data.resCount);
        $("#orderAllCount").html(data.orderAllCount);
        $("#orderMonthAmount").html(data.orderMonthAmount);
        $("#orderMonthCount").html(data.orderMonthCount);
    }, function (data) {
        Feng.error("操作失败!" + data.responseJSON.message + "!");
    });
    ajax.start();
};


$(function () {
    //加载首页数据
    Blackboard.indexStatistic();
    //加载订单统计图表
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
        })
        paycountMax = Math.max.apply(Math, paycountArr);
        ordercountMax = Math.max.apply(Math, ordercountArr);
        var maxcount = paycountMax >= ordercountMax ? paycountMax : ordercountMax;
        Blackboard.orderCharts(data_payArr, data_orderArr, maxcount);
    }, function (data) {
        Feng.error("操作失败!" + data.responseJSON.message + "!");
    });
    ajax.set("beginTime", DateUtils.getYearStartDate());
    ajax.set("endTime", DateUtils.getYearEndDate());
    ajax.start();


    //加载渠道统计表
    var developColunms = Blackboard.initColumn_develop();
    var table_develop = new BSTable(Blackboard.id_develop, "/statistic/selectDeveloperStatistic", developColunms);
    table_develop.setPaginationType("server");
    var developQueryData = {};
    developQueryData['beginTime'] = DateUtils.getYearStartDate();
    developQueryData['endTime'] = DateUtils.getYearEndDate();
    console.log(table_develop.data);
    table_develop.setQueryParams(developQueryData);
    table_develop.setHeight(512);
    Blackboard.table_develop = table_develop.init();

    //加载资源统计表
    var resourceColunms = Blackboard.initColumn_resource();
    var table_resource = new BSTable(Blackboard.id_resource, "/statistic/selectResourceStatistic", resourceColunms);
    var resourceQueryData = {};
    resourceQueryData['beginTime'] = DateUtils.getYearStartDate();
    resourceQueryData['endTime'] = DateUtils.getYearEndDate();
    table_resource.setPaginationType("server");
    table_resource.setQueryParams(resourceQueryData);
    table_resource.setHeight(512);
    Blackboard.table_resource = table_resource.init();

});
