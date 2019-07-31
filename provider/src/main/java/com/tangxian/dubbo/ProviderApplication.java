package com.tangxian.dubbo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.alibaba.dubbo.spring.boot.annotation.EnableDubboConfiguration;

@SpringBootApplication
@EnableDubboConfiguration
public class ProviderApplication {
	private final static Logger logger = LoggerFactory.getLogger(ProviderApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(ProviderApplication.class, args);
		logger.info("ApiApplication is success Dubbo Provider启动成功!");
	}
}
