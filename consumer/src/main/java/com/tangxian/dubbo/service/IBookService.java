package com.tangxian.dubbo.service;

import com.tangxian.dubbo.entity.DevKey;

public interface IBookService {
	String sayHello();
	DevKey getDevKeyById(Integer id);
}
