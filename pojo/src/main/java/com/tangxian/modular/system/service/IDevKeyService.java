package com.tangxian.modular.system.service;

import com.alibaba.dubbo.config.annotation.Service;
import com.baomidou.mybatisplus.service.IService;
import com.tangxian.modular.system.model.DevKey;

@Service
public interface IDevKeyService extends IService<DevKey> {
	String sayHello();
	DevKey getDevKeyById(Integer id);
}
