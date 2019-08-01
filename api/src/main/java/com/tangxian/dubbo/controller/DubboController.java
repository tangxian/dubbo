package com.tangxian.dubbo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.tangxian.dubbo.service.IBookService;

@RestController
public class DubboController {

	@Reference
	IBookService bookService;
	@RequestMapping("test")
	public String testDubbo(){
		return bookService.sayHello();
	}

	@RequestMapping("test2")
	public Object testDubbo2(){
		return bookService.getDevKeyById(3);
	}
}
