package com.tangxian.modular.system.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.tangxian.modular.system.dao.DevKeyMapper;
import com.tangxian.modular.system.model.DevKey;
import com.tangxian.modular.system.dao.DevKeyMapper;
import com.tangxian.modular.system.model.DevKey;
import com.tangxian.modular.system.service.IDevKeyService;
import com.tangxian.modular.system.service.IDevKeyService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
@Service(interfaceClass = IDevKeyService.class)
@org.springframework.stereotype.Service
public class DevKeyServiceImpl extends ServiceImpl<DevKeyMapper, DevKey> implements IDevKeyService {
	//@Autowired(required = false)
	@Resource
	private DevKeyMapper devKeyMapper;
	@Override
	public String sayHello() {
		// TODO Auto-generated method stub
		 return "Hello World-你好世界TANGXIAN";
	}
	@Override
	public DevKey getDevKeyById(Integer id){
		return this.baseMapper.getDevKeyById(id);
	}
}
