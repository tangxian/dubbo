package com.tangxian.dubbo.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.tangxian.dubbo.service.IBookService;

@Service
@org.springframework.stereotype.Service
public class BookServiceImpl implements IBookService{

	public String sayHello() {
		// TODO Auto-generated method stub
		 return "Hello World-你好，世界TANGXIAN";
	}
}
