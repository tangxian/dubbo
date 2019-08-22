package com.tangxian.service;

import com.alibaba.dubbo.config.annotation.Service;
import com.baomidou.mybatisplus.service.IService;
import com.tangxian.entity.DevKey;

@Service
public interface IDevKeyService extends IService<DevKey> {
	String sayHello();
	DevKey getDevKeyById(Integer id);
}
