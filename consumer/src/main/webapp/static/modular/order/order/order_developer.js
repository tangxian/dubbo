/**
 * 订单管理管理初始化
 */
var Order = {
    id: "OrderTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    isFlag: 0,//导出功能 点击搜索才按条件查询 0未点击 1点击
    data: "" //封装查询条件
};

/**
 * 初始化表格的列
 */
Order.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {
            field: 'SerialNumber',
            title: '#',
            sortable: true,
            align: "center",
            width: 40,
            formatter: function (value, row, index) {
                //获取每页显示的数量
                var pageSize = $('#OrderTable').bootstrapTable('getOptions').pageSize;
                //获取当前是第几页
                var pageNumber = $('#OrderTable').bootstrapTable('getOptions').pageNumber;
                //返回序号，注意index是从0开始的，所以要加上1
                return pageSize * (pageNumber - 1) + index + 1;
            }
        },
        {title: '', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {
            title: '订单号', field: 'ordernum', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index) {
                return "<span style='display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;' title='" + value + "'>" + value + "</span>";
            }
        },
        {
            title: '创建时间', field: 'time', visible: true, align: 'center', valign: 'middle',
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
        {
            title: '应用名称', field: 'appname', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index) {
                return "<span style='display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;' title='" + value + "'>" + value + "</span>";
            }
        },
        {
            title: '用户ID', field: 'devuuid', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index) {
                return "<span style='display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;' title='" + value + "'>" + value + "</span>";
            }
        },
        {
            title: '平台', field: 'platform', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index) {
                return "<span style='display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;' title='" + value + "'>" + value + "</span>";
            }
        },
        {title: '数量', field: 'count', visible: true, align: 'center', valign: 'middle'},
        {title: '金额', field: 'amount', visible: true, align: 'center', valign: 'middle'},
        {title: '支付方式', field: 'paytype', visible: true, align: 'center', valign: 'middle'},
        {
            title: '流水号', field: 'serialnumber', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index) {
                return "<span style='display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;' title='" + value + "'>" + value + "</span>";
            }
        },
        {title: '订单状态', field: 'orderstatus', visible: true, align: 'center', valign: 'middle'},
        {
            title: '操作', field: '', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index, field) {
                return [
                    '<button type="button" onclick="Order.openOrderDetail(' + row["id"] + ')" class="RoleOfedit btn btn-primary  btn-sm" style="margin-right:15px;    margin-bottom: 0px;">详情</button>'
                ].join('');
            }
        }
    ];
};

/**
 * 检查是否选中
 */
Order.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        Order.seItem = selected[0];
        return true;
    }
};
/**
 * 导出Excel
 */
Order.exportDevelop = function () {
    window.location.href = "/export/exportOrderExcel?ordertype=" + 1 +Order.data;
};
/**
 * 点击添加订单管理
 */
Order.openAddOrder = function () {
    var index = layer.open({
        type: 2,
        title: '添加订单管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/order/order_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看订单管理详情
 */
/*Order.openOrderDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '订单管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/order/order_update/' + Order.seItem.id
        });
        this.layerIndex = index;
    }
};*/

/**
 * 打开查看订单详情
 */
Order.openOrderDetail = function (id) {
    var index = layer.open({
        type: 2,
        title: '订单管理详情',
        area: ['90%', '90%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/order/order_detail/' + id
    });
    this.layerIndex = index;
};
/**
 * 删除订单管理
 */
Order.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/order/delete", function (data) {
            Feng.success("删除成功!");
            Order.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("orderId", this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询订单管理列表
 */
Order.search = function () {
    if (Order.isFlag == 1) {
        Order.data = "";
    }
    Order.isFlag = 1;
    var queryData = {};
    queryData['ordernum'] = $("#ordernum").val();
    queryData['appname'] = $("#appname").val();
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    queryData['devuuid'] = $("#devuuid").val();
    queryData['platform'] = $("#platform").val();
    queryData['paytype'] = $("#paytype").val();
    queryData['orderstatus'] = $("#orderstatus").val();
    queryData['ordertype'] = 1;
    Order.data =  "&ordernum=" + $("#ordernum").val() + "&appname=" + $("#appname").val() + "&beginTime=" + $("#beginTime").val() + "&endTime=" + $("#endTime").val() + "&devuuid=" + $("#devuuid").val() + "&platform=" + $("#platform").val() + "&paytype=" + $("#paytype").val() + "&orderstatus=" + $("#orderstatus").val();
    Order.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Order.initColumn();
    var table = new BSTable(Order.id, "/order/list", defaultColunms);
    table.setPaginationType("server");
    var queryData = {};
    queryData['ordertype'] = 1;
    table.setQueryParams(queryData);
    table.setHeight(624);
    Order.table = table.init();
    /**
     * 查询平台类型下拉框
     */
   /* var ajax = new $ax(Feng.ctxPath + "/dict/selectbyparentcodelist", function (data) {
        var strHtml = '<option value="0">全部</option>';
        $.each(data, function (key, val) {
            strHtml += '<option value="' + val.code + '">' + val.name + '</option>';
        })
        $("#platform").html(strHtml);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax.set("code", "platform");
    ajax.start();*/
    /**
     * 查询支付方式下拉框
     */
/*
    var ajax = new $ax(Feng.ctxPath + "/dict/selectbyparentcodelist", function (data) {
        var strHtml = '<option value="0">全部</option>';
        $.each(data, function (key, val) {
            strHtml += '<option value="' + val.code + '">' + val.name + '</option>';
        })
        $("#paytype").html(strHtml);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax.set("code", "paytype");
    ajax.start();
*/

    /**
     * 查询订单状态下拉框
     */
   /* var ajax = new $ax(Feng.ctxPath + "/dict/selectbyparentcodelist", function (data) {
        var strHtml = '<option value="0">全部</option>';
        $.each(data, function (key, val) {
            strHtml += '<option value="' + val.code + '">' + val.name + '</option>';
        })
        $("#orderstatus").html(strHtml);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax.set("code", "orderstatus");
    ajax.start();*/

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
