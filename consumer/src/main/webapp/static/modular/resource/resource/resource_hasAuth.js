/**
 * 资源管理管理初始化
 */
var AuthResource = {
    id: "AuthResourceTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
AuthResource.initColumn = function () {
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
                var pageSize = $('#AuthResourceTable').bootstrapTable('getOptions').pageSize;
                //获取当前是第几页
                var pageNumber = $('#AuthResourceTable').bootstrapTable('getOptions').pageNumber;
                //返回序号，注意index是从0开始的，所以要加上1
                return pageSize * (pageNumber - 1) + index + 1;
            }
        },
        {title: '', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '', field: 'usecode', visible: false, align: 'center', valign: 'middle'},
        {title: '资源ID', field: 'resourcecode', visible: true, align: 'center', valign: 'middle'},
        {title: '资源名称', field: 'resourcename', visible: true, align: 'center', valign: 'middle'},
        {title: '授权类型', field: 'salemodel', visible: true, align: 'center', valign: 'middle'},
        {title: '价格', field: 'price', visible: true, align: 'center', valign: 'middle'},
        {title: '封面图片', field: 'coverpicture', visible: true, align: 'center', valign: 'middle'},
        {
            title: '操作', field: '', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index, field) {
                return [
                    '<button type="button" onclick="AuthResource.openDlg(' + row["usecode"] + ')" class="RoleOfedit btn btn-primary  btn-sm" style="margin-right:15px; margin-bottom: 0px;">复制引用代码</button>',
                ].join('');
            }
        },
    ];
};
//弹出复制面板
AuthResource.openDlg = function (usecode) {
    if ($("#identifier").is(":hidden")) {//隐藏
        $("#use_code").val(usecode);
        $('#identifier').modal('show');
    } else {//未隐藏
        AuthResource.get_modal(usecode).modal("show");
    }
};
//复制引用代码
AuthResource.copyAndClose = function () {
    $("#use_code").select();//选中文本内容
    document.execCommand("copy"); // 执行浏览器复制命令
    Feng.success("复制成功");
    $('#identifier').modal('hide');
};
AuthResource.get_modal = function (content) {
    var modal = $('<div class="modal" id="identifier" style="overflow: auto;" tabindex="-1">\
			<div class="modal-dialog">\
				<div class="modal-content">\
					<div class="modal-header">\
						<a type="button" class="close"\
							data-dismiss="modal" aria-hidden="true">&times;</a>\
						<h4 class="modal-title">编辑HTML</h4>\
					</div>\
					<div class="modal-body ui-front">\
						<textarea class="form-control" readonly id="use_code"\
							style="min-height: 200px; margin-bottom: 10px;\
							font-family: Monaco, Fixed">' + content + '</textarea>\
						<button class="RoleOfedit btn btn-primary  btn-sm" onclick="AuthResource.copyAndClose()">确认</button>\
					</div>\
				</div>\
			</div>\
			</div>').appendTo(document.body);
    return modal;
};


$(function () {
    var defaultColunms = AuthResource.initColumn();
    var table = new BSTable(AuthResource.id, "/resource/selectResourceHasAuth", defaultColunms);
    table.setPaginationType("server");
    var queryData = {};
    queryData['AuthResourcestatus'] = 2;
    table.setQueryParams(queryData);
    table.setHeight(624);
    AuthResource.table = table.init();
});
