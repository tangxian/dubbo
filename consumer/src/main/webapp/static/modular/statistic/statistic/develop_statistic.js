/**
 * 首页初始化
 */
var DevelopStatistic = {
    id: "DevelopTable",	//渠道表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};
/**
 * 初始化渠道表格的列
 */
DevelopStatistic.initColumn = function () {
    return [
        {field: 'selectItem', radio: true ,visible: false},
        {
            field: 'SerialNumber',
            title: '#',
            sortable: true,
            align: "center",
            width: 40,
            formatter: function (value, row, index) {
                //获取每页显示的数量
                var pageSize=$('#DevelopTable').bootstrapTable('getOptions').pageSize;
                //获取当前是第几页
                var pageNumber=$('#DevelopTable').bootstrapTable('getOptions').pageNumber;
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
 * 条件查询渠道统计列表 饼状图
 */
DevelopStatistic.search = function () {
    //列表
    var queryData = {};
    queryData['platform'] = $("#platform").val();
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    DevelopStatistic.table.refresh({query: queryData});
    //饼状图
    var ajax_app = new $ax(Feng.ctxPath + "/statistic/selectPlatformAppCountPieStatistic", function (data) {
        var appArr = [];
        var countArr = [];
        $.each(data, function (key, val) {
            appArr.push(val.platform);
            var appObj = new Object();
            appObj = {value: parseInt(val.appcount),name:val.platform};
            countArr.push(appObj);
        });
        DevelopStatistic.loadPlatform_countChart(appArr,countArr);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax_app.set("platform", $("#platform").val());
    ajax_app.set("beginTime", $("#beginTime").val());
    ajax_app.set("endTime", $("#endTime").val());
    ajax_app.start();
};
/**
 * 平台-应用数 饼状图
 */
DevelopStatistic.loadPlatform_countChart = function (XdataArr, YdataArr){
    var pieChart_platform = echarts.init(document.getElementById("platform_pie_chart"));
    var pieoption_platform = {
        title: {
            text: '应用数统计',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} 个 ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: XdataArr
        },
        calculable: true,
        series: [
            {
                name: '应用数',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                itemStyle : {
                    normal : {
                    	label : {
                            show : true,
                            formatter: '{b} :  {c}个  ({d}%)'
                        },
                        labelLine : {
                            show : true
                        }
                    }
                },
                data: YdataArr
            }
        ]
    };
    pieChart_platform.setOption(pieoption_platform);
    window.onresize = function () {
        pieChart_platform.resize();
    }
};


$(function () {
    //加载渠道表
    var channelColunms = DevelopStatistic.initColumn();
    var table = new BSTable(DevelopStatistic.id, "/statistic/selectDeveloperStatistic", channelColunms);
    table.setPaginationType("server");
    var queryData = {};
    table.setQueryParams(queryData);
    table.setHeight(512);
    DevelopStatistic.table = table.init();
    /**
     * 加载 平台-应用数 饼状图
     */
    var ajax_app = new $ax(Feng.ctxPath + "/statistic/selectPlatformAppCountPieStatistic", function (data) {
        var appArr = [];
        var countArr = [];
        $.each(data, function (key, val) {
            appArr.push(val.platform);
            var appObj = new Object();
            appObj = {value: parseInt(val.appcount),name:val.platform};
            countArr.push(appObj);
        });
        DevelopStatistic.loadPlatform_countChart(appArr,countArr);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax_app.start();

    /**
     * 查询平台类型下拉框
     */
    var ajax = new $ax(Feng.ctxPath + "/dict/selectbyparentcodelist", function (data) {
        var strHtml = '<option value="0">全部</option>';
        $.each(data, function (key, val) {
            strHtml += '<option value="' + val.code + '">' + val.name + '</option>';
        });
        $("#platform").html(strHtml);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax.set("code", "platform");
    ajax.start();
});
