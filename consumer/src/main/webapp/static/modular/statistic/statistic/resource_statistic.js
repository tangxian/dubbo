/**
 * 首页初始化
 */
var ResourceStatistic = {
    id: "ResourceTable",	//渠道表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};
/**
 * 初始化资源表格的列
 */
ResourceStatistic.initColumn = function () {
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
        {title: '平台', field: 'platform', visible: true, align: 'center', valign: 'middle',width:'20%'},
        {title: '应用数量', field: 'appcount', visible: true, align: 'center', valign: 'middle',width:'13%'},
        {title: '订单数', field: 'ordercount', visible: true, align: 'center', valign: 'middle',width:'13%'},
        {title: '销售额', field: 'orderamount', visible: true, align: 'center', valign: 'middle',width:'13%'}
    ];
};
/**
 * 条件查询资源统计列表 饼状图
 */
ResourceStatistic.search = function () {
    //列表
    var queryData = {};
    queryData['platform'] = $("#platform").val();
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    ResourceStatistic.table.refresh({query: queryData});
    //饼状图
    var ajax_resource = new $ax(Feng.ctxPath + "/statistic/selectPlatformResourceCountPieStatistic", function (data) {
        var resourceArr = [];
        var countArr = [];
        $.each(data, function (key, val) {
            resourceArr.push(val.platform);
            var resourceObj = new Object();
            resourceObj = {value: parseInt(val.rescount), name: val.platform};
            countArr.push(resourceObj);
        })
        ResourceStatistic.loadResource_countChart(resourceArr, countArr);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax_resource.set("platform", $("#platform").val());
    ajax_resource.set("beginTime", $("#beginTime").val());
    ajax_resource.set("endTime", $("#endTime").val());
    ajax_resource.start();
};
/**
 * 平台-资源数统计 饼状图
 */
ResourceStatistic.loadResource_countChart = function (XdataArr, YdataArr) {
    var pieChart_resource = echarts.init(document.getElementById("resource_pie_chart"));
    var pieoption_resource = {
        title: {
            text: '资源数统计',
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
                name: '资源数',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                itemStyle : {
                    normal : {
                    	label : {
                            show : true,
                            formatter: '{b} : {c}条  ({d}%)'
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
    pieChart_resource.setOption(pieoption_resource);
    window.onresize = function () {
        pieChart_resource.resize();
    }
};


$(function () {
    //加载资源表
    var resourceColunms = ResourceStatistic.initColumn();
    var table = new BSTable(ResourceStatistic.id, "/statistic/selectResourceStatistic", resourceColunms);
    var queryData = {};
    table.setPaginationType("server");
    table.setQueryParams(queryData);
    table.setHeight(512);
    ResourceStatistic.table = table.init();
    /**
     * 加载 平台-资源数 饼状图
     */
    var ajax_resource = new $ax(Feng.ctxPath + "/statistic/selectPlatformResourceCountPieStatistic", function (data) {
        var resourceArr = [];
        var countArr = [];
        $.each(data, function (key, val) {
            resourceArr.push(val.platform);
            var resourceObj = new Object();
            resourceObj = {value: parseInt(val.rescount), name: val.platform};
            countArr.push(resourceObj);
        })
        ResourceStatistic.loadResource_countChart(resourceArr, countArr);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax_resource.start();
    /**
     * 查询资源类型下拉框
     */
    var ajax = new $ax(Feng.ctxPath + "/dict/selectbyparentcodelist", function (data) {
        var strHtml = '<option value="0">全部</option>';
        $.each(data, function (key, val) {
            strHtml += '<option value="' + val.code + '">' + val.name + '</option>';
        })
        $("#platform").html(strHtml);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax.set("code", "platform");
    ajax.start();
});
