package com.tangxian.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.tangxian.entity.DevKey;
import org.apache.ibatis.annotations.Param;

public interface DevKeyMapper extends BaseMapper<DevKey> {
    DevKey getDevKeyById(@Param("id") Integer id);
}
