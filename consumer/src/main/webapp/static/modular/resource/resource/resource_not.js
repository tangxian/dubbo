/**
 * 资源管理管理初始化
 */
var Resource = {
    id: "ResourceTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Resource.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {
            field: 'SerialNumber',
            title: '序号',
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
        {title: '', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {
            title: '资源编码', field: 'resourcecode', visible: true, align: 'center', valign: 'middle',
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
            title: '资源类型', field: 'resourceItemName', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index) {
                return "<span style='display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;' title='" + value + "'>" + value + "</span>";
            }
        },
        {
            title: '出版社', field: 'publish', visible: true, align: 'center', valign: 'middle',width:'90px',
            formatter: function (value, row, index) {
                return "<span style='display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;' title='" + value + "'>" + value + "</span>";
            }
        },
        {title: '作者', field: 'author', visible: true, align: 'center', valign: 'middle',width:'80px'},
        {title: '资源状态', field: 'resourceStatusName', visible: true, align: 'center', valign: 'middle',width:'80px'},
        {
            title: '创建时间', field: 'time', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index) {
                return "<span style='display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;' title='" + value + "'>" + value + "</span>";
            }
        },
        {title: '录入人', field: 'userName', visible: true, align: 'center', valign: 'middle',width:'80px'},
        {
            title: '操作', field: '', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index, field) {
                return [
                    '<button type="button" onclick="Resource.openResourceUpdate(' + row["id"] + ')" class="RoleOfedit btn btn-primary  btn-sm" style="margin-right:15px;    margin-bottom: 0px;">编辑</button>',
                    '<button type="button" onclick="Resource.openResourcePutAway(' + row["id"] + ')" class="RoleOfedit btn btn-primary  btn-sm" style="margin-right:15px;    margin-bottom: 0px;">上架</button>'
                ].join('');
            }
        },
    ];
};

/**
 * 检查是否选中
 */
Resource.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        Resource.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加资源管理
 */
Resource.openAddResource = function () {
    var index = layer.open({
        type: 2,
        title: '添加资源管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/resource/resource_add'
    });
    this.layerIndex = index;
};

/**
 * 资源上架弹框
 */
Resource.openResourcePutAway = function (id) {
    var index = layer.open({
        type: 2,
        title: '资源上架',
        area: ['90%', '90%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/resource/resource_putaway/' + id
    });
    this.layerIndex = index;
};

/**
 * 编辑资源管理详情
 */
Resource.openResourceUpdate = function (id) {
    var index = layer.open({
        type: 2,
        title: '资源编辑',
        area: ['90%', '90%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/resource/resource_not_update/' + id
    });
    this.layerIndex = index;
};

/**
 * 编辑资源CDN
 */
Resource.openResourceCdnUpdate = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '资源CDN编辑',
            area: ['90%', '90%'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/resource/resource_cdn_update/' + Resource.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 打开查看资源管理详情
 */
Resource.openResourceDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '资源管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/resource/resource_update/' + Resource.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除资源管理
 */
Resource.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/resource/delete", function (data) {
            Feng.success("删除成功!");
            Resource.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("resourceId", this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询资源管理列表
 */
Resource.search = function () {
    var queryData = {};
    queryData['resourcename'] = $("#resourcename").val();
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    queryData['resourceitem'] = $("#resourceitem").val();
    queryData['resourcestatus'] = 1;
    Resource.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Resource.initColumn();
    var table = new BSTable(Resource.id, "/resource/list", defaultColunms);
    table.setPaginationType("server");
    var queryData = {};
    queryData['resourcestatus'] = 1;
    table.setQueryParams(queryData);
    table.setHeight(624);
    Resource.table = table.init();
    /**
     * 查询资源类型下拉框
     */
    var ajax = new $ax(Feng.ctxPath + "/dict/selectbyparentcodelist", function (data) {
        var strHtml = '<option value="0">全部</option>';
        $.each(data, function (key, val) {
            strHtml += '<option value="' + val.code + '">' + val.name + '</option>';
        })
        $("#resourceitem").html(strHtml);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax.set("code", "resource_item");
    ajax.start();
});
