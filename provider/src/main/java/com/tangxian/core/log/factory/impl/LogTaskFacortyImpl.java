package com.tangxian.core.log.factory.impl;

import cn.stylefeng.roses.core.util.SpringContextHolder;
import cn.stylefeng.roses.core.util.ToolUtil;
import com.alibaba.dubbo.config.annotation.Service;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.tangxian.core.log.factory.LogFactory;
import com.tangxian.modular.system.model.LoginLog;
import com.tangxian.core.common.constant.state.LogSucceed;
import com.tangxian.core.common.constant.state.LogType;
import com.tangxian.core.log.LogManager;
import com.tangxian.modular.system.dao.LoginLogMapper;
import com.tangxian.modular.system.dao.OperationLogMapper;
import com.tangxian.modular.system.model.LoginLog;
import com.tangxian.modular.system.model.OperationLog;
import com.tangxian.core.log.factory.ILogTaskFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.TimerTask;

/**
 * 日志操作任务创建工厂
 *
 * @author TANGXIAN
 * @date 2019年8月21日16:18:54
 */
@Component
@Service(interfaceClass = ILogTaskFactory.class)
@org.springframework.stereotype.Service
@DependsOn("springContextHolder")
@Transactional(readOnly = true)
public class LogTaskFacortyImpl implements ILogTaskFactory {

    private static Logger logger = LoggerFactory.getLogger(LogManager.class);
    private static LoginLogMapper loginLogMapper = SpringContextHolder.getBean(LoginLogMapper.class);
    private static OperationLogMapper operationLogMapper = SpringContextHolder.getBean(OperationLogMapper.class);

    @Override
    public TimerTask loginLog(Integer userId, String ip) {
        return new TimerTask() {
            @Override
            public void run() {
                try {
                    LoginLog loginLog = LogFactory.createLoginLog(LogType.LOGIN, userId, null, ip);
                    loginLogMapper.insert(loginLog);
                } catch (Exception e) {
                    logger.error("创建登录日志异常!", e);
                }
            }
        };
    }

    @Override
    public TimerTask loginLog(String username, String msg, String ip) {
        return new TimerTask() {
            @Override
            public void run() {
                LoginLog loginLog = LogFactory.createLoginLog(
                        LogType.LOGIN_FAIL, null, "账号:" + username + "," + msg, ip);
                try {
                    loginLogMapper.insert(loginLog);
                } catch (Exception e) {
                    logger.error("创建登录失败异常!", e);
                }
            }
        };
    }

    @Override
    public TimerTask exitLog(Integer userId, String ip) {
        return new TimerTask() {
            @Override
            public void run() {
                LoginLog loginLog = LogFactory.createLoginLog(LogType.EXIT, userId, null, ip);
                try {
                    loginLogMapper.insert(loginLog);
                } catch (Exception e) {
                    logger.error("创建退出日志异常!", e);
                }
            }
        };
    }

    @Override
    public TimerTask bussinessLog(Integer userId, String bussinessName, String clazzName, String methodName, String msg) {
        return new TimerTask() {
            @Override
            public void run() {
                OperationLog operationLog = LogFactory.createOperationLog(
                        LogType.BUSSINESS, userId, bussinessName, clazzName, methodName, msg, LogSucceed.SUCCESS);
                try {
                    operationLogMapper.insert(operationLog);
                } catch (Exception e) {
                    logger.error("创建业务日志异常!", e);
                }
            }
        };
    }

    @Override
    public TimerTask exceptionLog(Integer userId, Exception exception) {
        return new TimerTask() {
            @Override
            public void run() {
                String msg = ToolUtil.getExceptionMsg(exception);
                OperationLog operationLog = LogFactory.createOperationLog(
                        LogType.EXCEPTION, userId, "", null, null, msg, LogSucceed.FAIL);
                try {
                    operationLogMapper.insert(operationLog);
                } catch (Exception e) {
                    logger.error("创建异常日志异常!", e);
                }
            }
        };
    }
}
