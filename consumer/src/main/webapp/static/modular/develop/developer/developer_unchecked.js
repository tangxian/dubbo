/**
 * 开发者管理管理初始化
 */
var Developer = {
    id: "DeveloperTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Developer.initColumn = function () {
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
                var pageSize = $('#DeveloperTable').bootstrapTable('getOptions').pageSize;
                //获取当前是第几页
                var pageNumber = $('#DeveloperTable').bootstrapTable('getOptions').pageNumber;
                //返回序号，注意index是从0开始的，所以要加上1
                return pageSize * (pageNumber - 1) + index + 1;
            }
        },
        {title: '', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {
            title: '账号', field: 'devaccount', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index) {
                return "<span style='display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;' title='" + value + "'>" + value + "</span>";
            }
        },
        {title: '联系人', field: 'contacts', visible: true, align: 'center', valign: 'middle',width:'80px'},
        {title: '应用名称', field: 'appname', visible: true, align: 'center', valign: 'middle'},
        {
            title: '公司名称', field: 'companyname', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index) {
                return "<span style='display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;' title='" + value + "'>" + value + "</span>";
            }
        },
        {
            title: '分成比例(%)', field: 'divideproportion', visible: true, align: 'center', valign: 'middle',width:'100px',
            formatter: function (value, row, index) {
                return value + '%';
            }
        },
        {title: '状态', field: 'statusName', visible: true, align: 'center', valign: 'middle',width:'60px'},
        {title: '备注', field: 'remark', visible: true, align: 'center', valign: 'middle'},
        {
            title: '操作', field: '', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index, field) {
                return [
                    '<button type="button" onclick="Developer.openDeveloperUpdate(' + row["id"] + ')" class="RoleOfedit btn btn-primary  btn-sm" style="margin-right:15px;    margin-bottom: 0px;">编辑</button>',
                    '<button type="button" onclick="Developer.openDeveloperAudit(' + row["id"] + ')" class="RoleOfedit btn btn-primary  btn-sm" style="margin-right:15px;    margin-bottom: 0px;">审核</button>'
                ].join('');
            }
        },
    ];
};

/**
 * 检查是否选中
 */
Developer.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        Developer.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加开发者管理
 */
Developer.openAddDeveloper = function () {
    var index = layer.open({
        type: 2,
        title: '添加开发者管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/developer/developer_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看开发者管理详情
 */
Developer.openDeveloperDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '开发者管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/developer/developer_update/' + Developer.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 打开查看开发者管理详情
 */
Developer.openDeveloperUpdate = function (id) {

    var index = layer.open({
        type: 2,
        title: '开发者管理详情',
        area: ['90%', '90%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/developer/developer_update/' + id
    });
    this.layerIndex = index;

};

/**
 * 打开查看开发者管理审核
 */
Developer.openDeveloperAudit = function (id) {

    var index = layer.open({
        type: 2,
        title: '开发者管理审核',
        area: ['90%', '90%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/developer/developer_audit/' + id
    });
    this.layerIndex = index;

};
/**
 * 删除开发者管理
 */
Developer.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/developer/delete", function (data) {
            Feng.success("删除成功!");
            Developer.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("developerId", this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询开发者管理列表
 */
Developer.search = function () {
    var queryData = {};
    queryData['devaccount'] = $("#devaccount").val();
    queryData['contacts'] = $("#contacts").val();
    queryData['appname'] = $("#appname").val();
    queryData['companyname'] = $("#companyname").val();
    queryData['status'] = 2;
    Developer.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Developer.initColumn();
    var table = new BSTable(Developer.id, "/developer/list", defaultColunms);
    table.setPaginationType("server");
    var queryData = {};
    queryData['status'] = 2;
    table.setQueryParams(queryData);
    table.setHeight(624);
    Developer.table = table.init();
});
