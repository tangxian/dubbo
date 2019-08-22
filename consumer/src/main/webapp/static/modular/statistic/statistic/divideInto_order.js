/**
 * 首页初始化
 */
var DivideIntoOrder = {
    id: "DivideIntoTable",
    seItem: null,
    table: null,
    layerIndex: -1,
    isFlag: 0,//导出功能 点击搜索才按条件查询 0未点击 1点击
    data: "" //封装查询条件
};
/**
 * 初始化订单分成表格的列
 */
DivideIntoOrder.initColumn = function () {
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
                var pageSize = $('#DivideIntoTable').bootstrapTable('getOptions').pageSize;
                //获取当前是第几页
                var pageNumber = $('#DivideIntoTable').bootstrapTable('getOptions').pageNumber;
                //返回序号，注意index是从0开始的，所以要加上1
                return pageSize * (pageNumber - 1) + index + 1;
            }
        },
        {title: '', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '订单号', field: 'ordernum', visible: true, align: 'center', valign: 'middle'},
        {
            title: '时间', field: 'time', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index) {
                return "<span style='display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;' title='" + value + "'>" + value + "</span>";
            }
        },
        {
            title: '资源名称', field: 'resourcename', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index) {
                return "<span style='display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;' title='" + value + "'>" + value + "</span>";
            }
        },
        {title: '应用名称', field: 'appname', visible: true, align: 'center', valign: 'middle'},
        {title: '用户ID', field: 'devuuid', visible: true, align: 'center', valign: 'middle'},
        {title: '平台', field: 'platform', visible: true, align: 'center', valign: 'middle'},
        {title: '数量', field: 'count', visible: true, align: 'center', valign: 'middle'},
        {title: '金额', field: 'amount', visible: true, align: 'center', valign: 'middle'},
        {title: '收入', field: 'income', visible: true, align: 'center', valign: 'middle'},
        {title: '流水号', field: 'serialnumber', visible: true, align: 'center', valign: 'middle'},
        {title: '状态', field: 'orderstatus', visible: true, align: 'center', valign: 'middle'},
        {
            title: '操作', field: '', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index, field) {
                return [
                    '<button type="button" onclick="DivideIntoOrder.openDivideIntoDetail(' + row["id"] + ')" class="RoleOfedit btn btn-primary  btn-sm" style="margin-right:15px;    margin-bottom: 0px;">详情</button>'
                ].join('');
            }
        }
    ];
};
/**
 * 打开查看订单分成详情
 */
DivideIntoOrder.openDivideIntoDetail = function (id) {
    var index = layer.open({
        type: 2,
        title: '订单分成详情',
        area: ['90%', '90%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/statistic/divideInto_order_detail/' + id
    });
    this.layerIndex = index;
};
/**
 * 导出Excel
 */
DivideIntoOrder.exportDivideIntoOrder = function () {
    window.location.href = "/export/exportDivideIntoOrderExcel" + DivideIntoOrder.data;
};
/**
 * 查询订单分成列表
 */
DivideIntoOrder.search = function () {
    if (DivideIntoOrder.isFlag == 1) {
        DivideIntoOrder.data = "";
    }
    DivideIntoOrder.isFlag = 1;
    var queryData = {};
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    DivideIntoOrder.data = "?beginTime=" + $("#beginTime").val() + "&endTime=" + $("#endTime").val();
    DivideIntoOrder.table.refresh({query: queryData});
};


$(function () {
    //加载分成订单表
    var defaultColunms = DivideIntoOrder.initColumn();
    var table = new BSTable(DivideIntoOrder.id, "/statistic/selectDivideIntoOrder", defaultColunms);
    table.setPaginationType("server");
    var queryData = {};
    table.setQueryParams(queryData);
    table.setHeight(624);
    DivideIntoOrder.table = table.init();
});
