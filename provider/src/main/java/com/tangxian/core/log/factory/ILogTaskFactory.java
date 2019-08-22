package com.tangxian.core.log.factory;

import com.alibaba.dubbo.config.annotation.Service;

import java.util.TimerTask;

/**
 * 日志操作任务创建工厂
 *
 * @author TANGXIAN
 * @date 2019年8月21日16:11:59
 */
@Service
public interface ILogTaskFactory {
    TimerTask loginLog(Integer userId, String ip);

    TimerTask loginLog(String username, String msg, String ip);

    TimerTask exitLog(Integer userId, String ip);

    TimerTask bussinessLog(Integer userId, String bussinessName, String clazzName, String methodName, String msg);

    TimerTask exceptionLog(Integer userId, Exception exception);
}
