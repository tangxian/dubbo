package com.tangxian.core.util;

import org.apache.poi.hssf.usermodel.*;

import java.util.LinkedHashMap;
import java.util.List;

/**
 * HSSFWorkbook     excel的文档对象
 * HSSFSheet            excel的表单
 * HSSFRow               excel的行
 * HSSFCell                excel的格子单元
 * HSSFFont               excel字体
 * HSSFCellStyle         cell样式
 */
public class ExcelUtil {

    /**
     * 导出Excel
     *
     * @param sheetName sheet名称
     * @param title     标题
     * @param mapList   内容
     * @param wb        HSSFWorkbook对象
     * @return
     */
    public static HSSFWorkbook getHSSFWorkbook(String sheetName, String[] title, List<LinkedHashMap<String, Object>> mapList, HSSFWorkbook wb) {

        // 第一步，创建一个HSSFWorkbook，对应一个Excel文件
        if (wb == null) {
            wb = new HSSFWorkbook();
        }

        // 第二步，在workbook中添加一个sheet,对应Excel文件中的sheet
        HSSFSheet sheet = wb.createSheet(sheetName);

        // 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制
        HSSFRow row = sheet.createRow(0);

        // 第四步，创建单元格，并设置值表头 设置表头居中
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式

        //声明列对象
        HSSFCell cell = null;

        //创建标题
        for (int i = 0; i < title.length; i++) {
            cell = row.createCell(i);
            cell.setCellValue(title[i]);
            cell.setCellStyle(style);
        }
        //创建内容
        for (int i = 0; i < mapList.size(); i++) {
            row = sheet.createRow(i + 1);
            //设置列宽
            sheet.autoSizeColumn(i);
            sheet.setColumnWidth(i, sheet.getColumnWidth(i) * 17 / 10);
            LinkedHashMap<String, Object> map = mapList.get(i);
            Object[] objects = map.values().toArray();
            for (int j = 0; j < objects.length; j++) {
                //将内容按顺序赋给对应的列对象
                row.createCell(j).setCellValue(objects[j] + "");
            }
        }

        return wb;
    }
}
