package com.tangxian;

import cn.stylefeng.roses.core.config.WebAutoConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.alibaba.dubbo.spring.boot.annotation.EnableDubboConfiguration;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication(exclude = WebAutoConfiguration.class)
@EnableDubboConfiguration
public class ConsumerApplication {
	private final static Logger logger = LoggerFactory.getLogger(ConsumerApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(ConsumerApplication.class, args);
		logger.info("ConsumerApplication is success Dubbo consumer启动成功!");
	}
}