package com.tangxian.core.common.constant.dictmap;

import com.tangxian.core.common.constant.dictmap.base.AbstractDictMap;

public class ResourceDict extends AbstractDictMap {

    @Override
    public void init() {
        put("id", "ID");
        put("resourcecode", "资源编码");
        put("resourcename", "资源名称");
        put("resourceitem", "资源类型");
        put("publish", "出版社");
        put("author", "作者");
        put("intro", "简介");
        put("coverpicture", "封面图片");
        put("resourcefilepath", "资源文件路径");
        put("resourcefile", "资源文件");
        put("resourcefilecdnpath", "资源文件CDN路径");
    }

    @Override
    protected void initBeWrapped() {
        putFieldWrapperMethodName("resourceitem", "getResourceitemName");
        putFieldWrapperMethodName("intro", "getIntroName");
    }

}
