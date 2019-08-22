package com.tangxian.entity;

import java.util.Date;
import java.io.Serializable;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;

/**
 * <p>
 * 开发者key表
 * </p>
 *
 * @author   TANGXIAN
 * @since 2019-07-11
 */
@TableName("dev_key")
public class DevKey extends Model<DevKey> implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    /**
     * 应用名称
     */
    private String appname;
    /**
     * 应用类型
     */
    private String apptype;
    /**
     * 应用简介
     */
    private String appintro;
    /**
     * appkey
     */
    private String appkey;
    /**
     * secretkey
     */
    private String secretkey;
    /**
     * 创建时间
     */
    private Date time;
    /**
     * 开发者APPID
     */
    private Integer developerid;
    /**
     * 备注
     */
    private String remark;
    /**
     * 创建用户id
     */
    private Integer userid;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAppname() {
        return appname;
    }

    public void setAppname(String appname) {
        this.appname = appname;
    }

    public String getApptype() {
        return apptype;
    }

    public void setApptype(String apptype) {
        this.apptype = apptype;
    }

    public String getAppintro() {
        return appintro;
    }

    public void setAppintro(String appintro) {
        this.appintro = appintro;
    }

    public String getAppkey() {
        return appkey;
    }

    public void setAppkey(String appkey) {
        this.appkey = appkey;
    }

    public String getSecretkey() {
        return secretkey;
    }

    public void setSecretkey(String secretkey) {
        this.secretkey = secretkey;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public Integer getDeveloperid() {
        return developerid;
    }

    public void setDeveloperid(Integer developerid) {
        this.developerid = developerid;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return "DevKey{" +
        ", id=" + id +
        ", appname=" + appname +
        ", apptype=" + apptype +
        ", appintro=" + appintro +
        ", appkey=" + appkey +
        ", secretkey=" + secretkey +
        ", time=" + time +
        ", developerid=" + developerid +
        ", remark=" + remark +
        ", userid=" + userid +
        "}";
    }
}
