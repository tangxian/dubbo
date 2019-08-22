@/*
    文件参数的说明:
    name : 名称
    id : id
@*/
<div class="form-group">
    <label class="col-sm-3 control-label">${name}</label>
    <div class="col-sm-9" style="top: -10px;">
    	<input class="form-control" readonly="readonly" id="${id}filename" type="text" style="width: 60%;display: inline-block;">
        <div class="upload-btn" id="${id}BtnId" style="display: inline-block;top: 10px;">
            <i class="fa fa-upload"></i>&nbsp;选择文件
        </div>
    </div>
    <input type="hidden" id="${id}" value=""/>
</div>
@if(isNotEmpty(underline) && underline == 'true'){
    <div class="hr-line-dashed"></div>
@}


