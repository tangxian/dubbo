package com.tangxian.dubbo.dao;

import com.tangxian.dubbo.entity.DevKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface DevKeyMapper {
    DevKey getDevKeyById(@Param("id") Integer id);
}
