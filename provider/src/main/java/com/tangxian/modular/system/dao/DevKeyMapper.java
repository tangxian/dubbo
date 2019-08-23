package com.tangxian.modular.system.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.tangxian.modular.system.model.DevKey;
import org.apache.ibatis.annotations.Param;

public interface DevKeyMapper extends BaseMapper<DevKey> {
    DevKey getDevKeyById(@Param("id") Integer id);
}
