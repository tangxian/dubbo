package com.tangxian.controller;

import com.tangxian.alarm.AlarmProducer;
import org.apache.activemq.command.ActiveMQQueue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.jms.Destination;
import java.util.ArrayList;
import java.util.List;

/**
 * @author TANGXIAN
 * controller测试active
 */
@RestController
@RequestMapping("activetest")
public class ActiveMQController {
    @Autowired
    private AlarmProducer alarmProducer;

    @RequestMapping("test")
    public String test(String devicename){
        List<String> alarmStrList = new ArrayList<>();
        alarmStrList.add(devicename+"out fence01");
        alarmStrList.add(devicename+"out fence02");
        alarmStrList.add(devicename+"in fence01");
        alarmStrList.add(devicename+"in fence02");

        System.out.println("设备"+devicename+"出围栏报警");
        // 报警信息写入数据库
        System.out.println("报警数据写入数据库。。。");

        // 写入消息队列
        Destination destination = new ActiveMQQueue("mytest.queue");
        for (String alarmStr : alarmStrList) {
            alarmProducer.sendMessage(destination, alarmStr);
        }

        // 消息写进消息队列里就不管了

        // 下面两步骤移到activemq消费者里
        // 发送邮件
        // 发送短信

        return "success";
    }

    @RequestMapping("test2")
    public Object test2(){
        return "abc";
    }
}
