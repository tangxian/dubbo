package com.tangxian.dubbo.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.tangxian.dubbo.dao.DevKeyMapper;
import com.tangxian.dubbo.entity.DevKey;
import com.tangxian.dubbo.service.IDevKeyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Service
@org.springframework.stereotype.Service
public class DevKeyServiceImpl implements IDevKeyService {
	@Autowired(required = false)
	private DevKeyMapper devKeyMapper;
	@Override
	public String sayHello() {
		// TODO Auto-generated method stub
		 return "Hello World-你好，世界TANGXIAN";
	}
	@Override
	public DevKey getDevKeyById(Integer id){
		return devKeyMapper.getDevKeyById(id);
	}
}
