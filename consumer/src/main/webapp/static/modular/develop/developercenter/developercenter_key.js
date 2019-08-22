/**
 * 开发者管理KEY管理初始化
 */
var DevelopercenterKey = {
	layerIndex: -1
};


/**
 * 点击添加开发者管理KEY
 */
DevelopercenterKey.openAddDevKey = function () {
    var index = layer.open({
        type: 2,
        title: '添加开发者KEY',
        area: ['90%', '90%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/developercenter/key_add'
    });
    this.layerIndex = index;
};
/**
 * 点击修改开发者管理KEY
 */
DevelopercenterKey.openEditKey = function(id){
    var index = layer.open({
        type: 2,
        title: '编辑开发者KEY',
        area: ['90%', '90%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/developercenter/key_edit/'+id
    });
    this.layerIndex = index;
};

/**
 *重新生成key
 */
DevelopercenterKey.rebuildKey =function(id){
    var ajax = new $ax(Feng.ctxPath + "/developercenter/rebuildKey/"+id , function(data) {
        $("#appkey"+id).text(data.appKey);
        $("#secretkey"+id).text(data.screctKey);
        Feng.success("重置成功!");
    },function (data) {
        Feng.error("重置失败!" + data.responseJSON.message + "!");
    });
    ajax.start();
}

$(function () {
	
});
