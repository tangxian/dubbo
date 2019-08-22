package com.tangxian.controller;

import com.tangxian.service.IDevKeyService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;

/**
 * @author TANGXIAN
 * controller测试dubbo
 */
@RestController
@RequestMapping("dubbotest")
public class DubboController {

	@Reference
	IDevKeyService bookService;
	@RequestMapping("test")
	public String testDubbo(){
		return bookService.sayHello();
	}

	@RequestMapping("test2")
	public Object testDubbo2(){
		return bookService.getDevKeyById(3);
	}
}
