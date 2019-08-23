package com.tangxian.core.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期帮助类
 * 
 * @author TANGXIAN
 * 
 */
public class DateHelper {
	public static String alltime = "yyyy-MM-dd HH:mm:ss.SSS";
	public static String LONG_PATTERN = "yyyy-MM-dd HH:mm:ss";
	public static String SHORT_PATTERN = "yyyy-MM-dd";
	private static String DEFAULT_PATTERN = "yyyy-MM-dd HH:mm:ss";
	public static String HMS = "HH:mm:ss";
	public static String HMSSSS = "HH:mm:ss.SSS";

	/**
	 * 年份计算
	 * @param date
	 * @param add
	 * @return
	 */
	public static String getyearadd(String yyyymmdd,int add){
		SimpleDateFormat sdf=null;
		 if(yyyymmdd.length()>19){
			 sdf=new SimpleDateFormat(alltime);
		 }else if(yyyymmdd.length()>10){
			 sdf=new SimpleDateFormat(LONG_PATTERN);
		 }else {
			 sdf=new SimpleDateFormat(SHORT_PATTERN);
		 }
		Calendar cal=Calendar.getInstance();
		try {
			cal.setTime(sdf.parse(yyyymmdd));
			cal.add(Calendar.YEAR, add);			
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return sdf.format(cal.getTime());
	}
	
	/**
	 * 月份计算
	 * @param date
	 * @param add
	 * @return
	 */
	public static String getmonthadd(String yyyymmdd,int add){
		SimpleDateFormat sdf=null;
		 if(yyyymmdd.length()>19){
			 sdf=new SimpleDateFormat(alltime);
		 }else if(yyyymmdd.length()>10){
			 sdf=new SimpleDateFormat(LONG_PATTERN);
		 }else {
			 sdf=new SimpleDateFormat(SHORT_PATTERN);
		 }
		Calendar cal=Calendar.getInstance();
		try {
			cal.setTime(sdf.parse(yyyymmdd));
			cal.add(Calendar.MONTH, add);			
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return sdf.format(cal.getTime());
	}
	
	/**
	 * 天计算
	 * @param date
	 * @param add
	 * @return
	 */
	public static String getdayadd(String yyyymmdd,int add){
		SimpleDateFormat sdf=null;
		 if(yyyymmdd.length()>19){
			 sdf=new SimpleDateFormat(alltime);
		 }else if(yyyymmdd.length()>10){
			 sdf=new SimpleDateFormat(LONG_PATTERN);
		 }else {
			 sdf=new SimpleDateFormat(SHORT_PATTERN);
		 }
		Calendar cal=Calendar.getInstance();
		try {
			cal.setTime(sdf.parse(yyyymmdd));
			cal.add(Calendar.DATE, add);			
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return sdf.format(cal.getTime());
	}
	/**
	 * 天计算
	 * @param date
	 * @param add
	 * @return
	 */
	public static String getdayadd(int add){
		SimpleDateFormat sdf=new SimpleDateFormat(SHORT_PATTERN);
		Calendar cal=Calendar.getInstance();
		cal.add(Calendar.DAY_OF_MONTH, add);
		
		return sdf.format(cal.getTime());
	}
	 /**
     * 得到全部时间
     * @return
     */
    public static String getalltime(){
    	return getymdd(alltime);
    }
    
    public static String getymdd(String pattern){
    	SimpleDateFormat sdf = new SimpleDateFormat(pattern);
    	Calendar cal=Calendar.getInstance();
    	return sdf.format(cal.getTime());
    }
	/**
	 * 日期相差多少月
	 * @param date
	 * @param add
	 * @return
	 */
	public static int getmonthdiff(String mintime,String maxtime){
		if(Integer.parseInt(mintime.replaceAll("-", ""))>Integer.parseInt(maxtime.replaceAll("-", ""))){
			return -1;
		}
		 int changemonth=0;
		while(!mintime.substring(0, 7).equals(maxtime.substring(0, 7))){
			mintime=getmonthadd(mintime, 1);changemonth++;
		} 
		return changemonth;
	}
	
	/**
	 * 日期相差多少
	 * @param date
	 * @param add
	 * @return
	 */
	public static long compareDate(String time1,String time2,String pattern){
		Date date1 = parseDate(time1, pattern);
		Date date2 = parseDate(time2, pattern);
		
		return date1.getTime()-date2.getTime();
	}
	
	public static String format(Date date) {
		return format(date, DEFAULT_PATTERN);
	}

	public static String format(Date date, String pattern) {
		if (date == null)
			return "";
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		return sdf.format(date);
	}


	/**
	  * 时间戳转换为字符串
	  * @param time
	  * @return
	  */
	 public static String timestamp2Str(Timestamp time) {
		 Date date = null;
		 if(null != time){
			 date = new Date(time.getTime());
		 }
		 return format(date, DEFAULT_PATTERN);
	 }

	 /**
	  * 字符串转换时间戳
	  * @param str
	  * @return
	  */
	 public static Timestamp str2Timestamp(String str) {
		 Date date = getDate();
		 if(!str.equals("")){
			 date = parseDate(str, DEFAULT_PATTERN);
		 }
		 return new Timestamp(date.getTime());
	 }


	public static Date parseDate(String dateStr) {
		return parseDate(dateStr, "yyyy-MM-dd HH:mm:ss");
	}

	public static Date parseDate(String dateStr, String pattern) {
		if ((dateStr == null) || (dateStr.trim().equals(""))
				|| (dateStr.trim().equals("null"))) {
			return null;
		}

		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		try {
			return sdf.parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}

	}

	public static java.sql.Date parseSqlDate(String dateStr, String pattern) {
		Date date = parseDate(dateStr, pattern);
		return new java.sql.Date(date.getTime());
	}

	public static java.sql.Date parseSqlDate(String dateStr) {
		return parseSqlDate(dateStr, "yyyy-MM-dd");
	}

	public static String getFirstDayOfMonth(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);

		return format(c.getTime(), "yyyy-MM") + "-01";
	}

	public static String getLastDayOfMonth(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(2, 1);
		c.set(5, 1);
		c.add(5, -1);

		return format(c.getTime(), "yyyy-MM-dd");
	}

	public static String getPreMonthOfToday(Date date, String pattern) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(2, -1);
		return format(c.getTime(), pattern);
	}

	public static Date  getDate(){
		Calendar c = Calendar.getInstance();
		return c.getTime();
	}
		
	/**
	 * 得到年
	 * @return
	 */
	public static int getYear() {
		Calendar cal = Calendar.getInstance();
		return cal.get(Calendar.YEAR);
	}
	public static int getMonth(){
		Calendar calendar = Calendar.getInstance();
		return calendar.get(Calendar.MONTH);
	}
	public static int getDayOfMonth(){
		Calendar calendar = Calendar.getInstance();
		return calendar.get(Calendar.DAY_OF_MONTH);
	}
	public static String getTime(){
		Calendar cal = Calendar.getInstance();
		return format(cal.getTime(), LONG_PATTERN);
	}
	/**
	 * String数字串转成日期样式String date="20140604172356";
	 * 2014-06-04 17:23:56
	 * @param date
	 * @return
	 */
	public static String stringFormatdate(String date){
		String tempdate="";
		if(date.length()==8){
			tempdate=date.substring(0,4)+"-"+date.substring(4,6)+"-"+date.substring(6,8);
		}else if(date.length()==14){
			tempdate=date.substring(0,4)+"-"+date.substring(4,6)+"-"+date.substring(6,8)+" "+date.substring(8,10)+":"+date.substring(10,12)+":"+date.substring(12,14);
		}
		return tempdate;
	}
	/**
	 * 获取当前时间的前、后几分钟
	 * @param nowDate
	 * @param minNum
	 * @return
	 */
	public static Date getDateMinAdd(Date nowDate,int minNum){
		Calendar calendar = Calendar.getInstance();
        calendar.setTime(nowDate);
        calendar.add(Calendar.MINUTE, minNum);// 正数为传入时间的后?分钟，负数为前?分钟
        return calendar.getTime();
	}
	/**
	 * 获取当前时间的前、后几秒钟
	 * @param nowDate
	 * @param secondNum
	 * @return
	 */
	public static Date getDateSecondAdd(Date nowDate,int secondNum){
		Calendar calendar = Calendar.getInstance();
        calendar.setTime(nowDate);
        calendar.add(Calendar.SECOND, secondNum);// 正数为传入时间的后?秒钟，负数为前?秒钟
        return calendar.getTime();
	}
	/**
	 * 获取流水号
	 * @return
	 */
	public static String getNumberForPK(){
    	String id="";
    	SimpleDateFormat sf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
    	String temp = sf.format(new Date());
		int random=(int) (Math.random()*10000);
		id=temp+random;
		return id;
	}
	public static void main(String[] args) {
		System.out.println(DateHelper.getNumberForPK());
	}
}
