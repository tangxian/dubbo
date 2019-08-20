package com.tangxian.dubbo.alarm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import javax.jms.Destination;

/**
 * 报警消息producer
 * @author TANGXIAN
 */
@Component
public class AlarmProducer {
    @Autowired
    private JmsTemplate jmsTemplate;
    public void sendMessage(Destination destination, String message){
        this.jmsTemplate.convertAndSend(destination, message);
    }
}
