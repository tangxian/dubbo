package com.tangxian.core.common.constant.dictmap;

import com.tangxian.core.common.constant.dictmap.base.AbstractDictMap;

public class DeveloperDict extends AbstractDictMap {

	@Override
	public void init() {
		put("id", "ID");
        put("devaccount", "邮箱账号");
        put("contacts", "联系人");
        put("appname", "应用名称");
        put("companyname", "企业名称");
        put("companycode", "企业统一信用码");
        put("companyaddress", "企业地址");
        put("phonenum", "安全电话");
        put("divideproportion", "分成比例");
	}

	@Override
	protected void initBeWrapped() {
		// TODO Auto-generated method stub
		
	}

}
