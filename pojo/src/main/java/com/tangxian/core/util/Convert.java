package com.tangxian.core.util;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;


public class  Convert{
	
	public static String indexOf(String context,String indexStr){
		 String str="";
		 if(Convert.filter(context).indexOf(Convert.filter(indexStr))>=0){str="√";}
		return str;
	}
	
	
	
	
	public static String cutLastZero(String swjgbm){
		swjgbm = Convert.filter(swjgbm);
		if(swjgbm.equals("")){
			return "";
		}
		String lastvalue = swjgbm.substring(swjgbm.length()-1, swjgbm.length());
		if(lastvalue.equals("0") && swjgbm.length()>5){
			swjgbm=swjgbm.substring(0, swjgbm.length()-1);
			swjgbm = cutLastZero(swjgbm);
		}
		return swjgbm;
	}
	
	
	 
	
 
	 //整数
	public static Integer integer(Object str){ 
		if(str==null|| "null".equals(str.toString()) || "".equals(str.toString())){
			return 0;
		}
		double number=Convert.filterDouble(str);
		DecimalFormat df = new DecimalFormat("0");
		return  Integer.parseInt(df.format(number));
	}
 
	 /**
	  * 导出最大条数控制
	  * @param total
	  * @return
	  */
	public static int daonum(int total){
		if(total>6000){
			return 6000;//65533
		}
		return total;
	}

	
	public static String sph(String sph){
		String str="00000000"+sph;
		return str.substring(str.length()-8, str.length());
	}
	
	
	public static String gettwonum(Object obj,boolean bool){
		if(bool){
			return fileterDouble(obj);
		}else{
			return fileterDouble(obj).replace("\u002e00", "");
		}
		
	}
	
	public static String gethref(Object obj,String url){
		String str="";
		if(Convert.filterDouble(obj)!=0){
			str="<a href=\"javascript:"+url+"\";>"+Convert.lendouble(obj)+"</a>";
		 
		 return str;
		}		
		return "";
	}
	
	
	/*2008-08-21 00:00:00.0
	 * 对日期格式进行截取
	 */
	public static String  subString0of10(Object obj){
		String str="";
		if(obj==null ){
			str="";
		}else if(obj.toString().trim().length()>10){
			str=obj.toString().trim().substring(0, 10);
		}else{
			str=obj.toString();
		}
		return str;
	}
	
	/*2008-08-21 00:00:00.0
	 * 对日期格式进行截取
	 */
	public static String  subString0of19(Object obj){
		String str="";
		if(obj==null ){
			str="";
		}else if(obj.toString().trim().length()>19){
			str=obj.toString().trim().substring(0, 19);
		}else{
			str=obj.toString();
		}
		return str;
	}
	
	//同比  (今年-去年)/去年*100
	public static String gettongbi(double nje,double qnje){
		if( nje-0==0 && qnje-0==0 ){
			return "0";
		}else if(nje!=0 && qnje-0==0){
			return "100";
		}else if(nje-0==0 && qnje!=0){
			return "<span  style='color:red;' >-100</span>";
		}else{
			double ys=(nje-qnje)/qnje*100;
			String str=fileterDouble(ys)+"";
			if(ys<0){
				str="<span  style='color:red;' >"+str+"</span>";
			}
		    return str;
		}
	}
	
	//占总比
	public static String getzhanbi(double je,double total){
		if(total==0){
			return "";
		}else{
			double zhanbi=je*1.0/total*100;
			if(zhanbi>100){zhanbi=100.00;}
			return fileterDouble(zhanbi);
		}
	}
	
	

	
	public static String filter(String str) {
		if (str==null || "null".equals(str.trim()) || "NULL".equals(str.trim())) {
			return "";
		} else {
			str = str.trim().replaceAll("&nbsp;","");
			return str;
		}
	}
	
	public static String filter(String str,int length) {
		if (str==null||"null".equals(str.trim())) {
			return "";
		} else {
			String old=str.trim();
			if(old.length()>length){
				str =old.substring(0, length)+"<br/>";
				if(old.length()>2*length){
					str+=filter(old.substring(length, old.length()), length);
				}else{
					str+=old.substring(length, old.length());
				}
			}
			return str;
		}
	}
	
	public static String filter(Object obj) {
		if (obj==null) {
			return "";
		} else {
			String str = obj.toString();
			str = str.trim();
			return str;
		}
	}
	
	public static String filter(String[] str) {
		if (str==null||str.length<=0) {
			return "";
		} else {
			StringBuffer sb = new StringBuffer();
			for(int i=0;i<str.length;i++){
				sb.append(str[i]).append(",");
			}
			String s = sb.toString();
			return s.substring(0,s.length()-1);
		}
	}
	
	public static String jspfilter(Object obj) {
		if (obj==null) {
			return "&nbsp;";
		}else{
			String str=obj.toString();
			if (str==null||"null".equals(str)) {
				return "&nbsp;";
			} else {
				str = str.trim();
				if(str.equals("")){
					return "&nbsp;";
				}
				return str;
			}
		}
	}
	
	public static String jspfilter(String str) {
		if (str==null||"null".equals(str)) {
			return "&nbsp;";
		} else {
			str = str.trim();
			if(str.equals("")){
				return "&nbsp;";
			}
			return str;
		}
	}
	
	
	
//	public static Integer filterInteger(String str) {
//		Integer value = new Integer(0);
//		if (str==null||"null".equals(str)) {
//			return value;
//		} else {
//			str = str.trim();
//			
//			try {
//				value = Integer.valueOf(str);
//			} catch (Exception e) {
//				return new Integer(0);
//			}
//		}
//		return value;
//	}
//	
//	public static Integer filterInteger(Object obj) {
//		Integer value = new Integer(0);
//		if (obj==null) {
//			return value;
//		} else {
//			String str = obj.toString();
//			str = str.trim();
//
//			if ("".equals(str)||"null".equalsIgnoreCase(str)) {
//				return value;
//			}
//			
//			try {
//				value = Integer.valueOf(str);
//			} catch (Exception e) {
////				e.printStackTrace();
//				return new Integer(0);
//			}
//		}
//		return value;
//	}
	
	public static Double filterDouble(Object obj) {
		Double value = new Double(0);
		if (obj==null) {
			return value;
		} else {
			String str = obj.toString();
			str = str.trim();

			if ("".equals(str)||"null".equalsIgnoreCase(str)) {
				return value;
			}
			
			try {
				value = Double.valueOf(str);
			} catch (Exception e) {
//				e.printStackTrace();
				return new Double(0);
			}
		}
		return value;
	}
	
	public static Double filterDouble(String str) { 
		Double value = new Double(0);
		if (str==null||"null".equals(str)||"".equals(str)) {
			return value;
		} else {
			str = str.trim();
			try {
				value = Double.parseDouble(str);
			} catch (Exception e) {
				e.printStackTrace();
				return new Double(0);
			}
		}
		return value;
	}
	public static String fileterDouble(Object str){
		String value="";
		double sta=0.00;
		if(str==null||"null".equals(str.toString())||"".equals(str.toString())){
			return "0.00";
		}
		sta=Double.valueOf(str.toString()).doubleValue();
		DecimalFormat df = new DecimalFormat("0.00");
		if(sta==0){
			return value="0.00";
		}else {
			try{
				value=df.format(sta);
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		if(Convert.filterDouble(value)==0){value="0.00";}
		return (value);
	}

	 
	   //保留小数位数
	 public static String number(int size,double number){
		 	String str="0.";
		 	for (int i =1; i <=size; i++) {
		 		str+="0";
			}
		 	DecimalFormat df = new DecimalFormat(str);  
			 
			return df.format(number);
		}
	 
	 
	 
	public static String lendouble(Object str){
		String value="";
		double sta=0.00;
		if(str==null|| "null".equals(str.toString()) || "".equals(str.toString())){
			return "";
		}
		sta=Double.valueOf(str.toString()).doubleValue();
		DecimalFormat df = new DecimalFormat("0.00");
		if(sta==0){
			return value="0.00";
		}else {
			try{
				value=df.format(sta);
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		if(Convert.filterDouble(value)==0){value="0.0";}
		return (value);
	}
	public static String lendoublekong(Object str){
		String value="";
		double sta=0.00;
		if(str==null|| "null".equals(str.toString()) || "".equals(str.toString())){
			return "";
		}
		sta=Double.valueOf(str.toString()).doubleValue();
		DecimalFormat df = new DecimalFormat("0.00");
		if(sta==0){
			return value="";
		}else {
			try{
				value=df.format(sta);
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		if(Convert.filterDouble(value)==0){value="0.0";}
		return (value);
	}
	
	
	public static String fileDouble2(Object str){
		String value="";
		double sta=0.00;
		if(str==null||"null".equals(str.toString())||"".equals(str.toString())){
			return "";
		}
		sta=Double.valueOf(str.toString()).doubleValue();
		DecimalFormat df = new DecimalFormat("0.00");
		if(sta==0){
			return value=Double.toString(sta);
		}else {
			try{
				value=df.format(sta);
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		if(Convert.filterDouble(value)==0){value="0.00";}
		return (value);
	}
	
	public static String fileterGtDouble5(Object str){
		String value="0.00";
		double sta=0.00;
		
		DecimalFormat df = new DecimalFormat("0.00");
		
		if(str==null||"null".equals(str)||"".equals(str.toString())){
			return df.format(sta);
		}
		sta=Double.valueOf(str.toString()).doubleValue();
		if(sta==0){
			return value=df.format(sta);
		}else {
			try{
				value=df.format(sta);
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		return value;
	}
	
	public static Long filterLong(String str) {
		Long value = new Long(0);
		if (str==null||"null".equals(str)||"".equals(str)) {
			return value;
		} else {
			str = str.trim();
			
			try {
				value = Long.valueOf(str);
			} catch (Exception e) {
				e.printStackTrace();
				return new Long(0);
			}
		}
		return value;
	}
	
	public static Long filterLong(Object obj) {
		Long value = new Long(0);
		if (obj==null) {
			return value;
		} else {
			try {
				value = Long.valueOf(obj.toString());
			} catch (Exception e) {
				e.printStackTrace();
				return new Long(0);
			}
		}
		return value;
	}
	
	public static String toString(Integer obj) {
		String str = "";
		if (obj!=null){
			str = obj.toString();
		}
		return str;
	}
	
	public static String toString(Double obj) {
		String str = "";
		if (obj!=null){
			str = obj.toString();
		}
		return str;
	}
	
	public static String toString(Float obj) {
		String str = "";
		if (obj!=null){
			str = obj.toString();
		}
		return str;
	}
	
	public static String toString(String obj) {
		String str = "";
		if (obj!=null&&!"null".equalsIgnoreCase(obj)){
			str = obj;
		}
		return str;
	}
	
	public static String toStringOfHtml(String obj) {
		String str = "&nbsp;";
		if (obj!=null&&!"".equalsIgnoreCase(obj.trim())&&!"null".equalsIgnoreCase(obj.trim())){
			str = obj;
		}
		return str;
	}
	
	public static String toIntOfHtml(String obj) {
		String str = "0";
		if (obj!=null&&!"".equalsIgnoreCase(obj.trim())&&!"null".equalsIgnoreCase(obj.trim())){
			str = obj;
		}
		return str;
	}
	
	public static String filterDate(Object obj) {
		String str = "没有申报记录";
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		if (obj!=null&&!(obj.equals(""))){
			Date dt=(Date)obj;
			str="最后申报时间："+sdf.format(dt);
		}
		return str;
	}
	
	public static String toStringOfHtml(Date obj) {
		String str = "&nbsp;";
		if (obj!=null&&!"".equals(obj)){
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			str = sdf.format(obj);
		}
		return str;
	}
	

	public static String toString(Date obj) {
		String str = " ";
		if (obj!=null&&!"".equals(obj)){
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			str = sdf.format(obj);
		}
		return str;
	}

	public static String substring(Object obj,int len) {
		String str =Convert.filter(obj);
		if(str.length()>len){str=str.substring(0, len)+"...";}
		return str;
	}
	public static String substringdate(Object obj,int len) {
		String str =Convert.filter(obj);
		if(str.length()>len){str=str.substring(0, len);}
		return str;
	}
	public static String toStringO(Date obj) {
		String str = " ";
		if (obj!=null&&!"".equals(obj)){
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			str = sdf.format(obj);
		}
		return str;
	}
	
	public static String toStringOfHtml(Double obj) {
		String str = "&nbsp;";
		if (obj!=null){
			str = obj.toString();
		}
		return str;
	}
	
	public static String toStringOfHtml(Float obj) {
		String str = "&nbsp;";
		if (obj!=null){
			str = obj.toString();
		}
		return str;
	}
	
	public static String toStringOfHtml(Integer obj) {
		String str = "&nbsp;";
		if (obj!=null){
			str = obj.toString();
		}
		return str;
	}
	

	public static int parseInt(double je) {		 
		return Integer.parseInt(je+"");
	}
	
	public static int parseInt(String je) {		 
		return Integer.parseInt(je);
	}
	 
    /**
	 * 提供精确的加法运算。
	 * 
	 * @param v1
	 *            被加数
	 * @param v2
	 *            加数
	 * @return 两个参数的和
	 */
    public static double add(double v1,double v2){
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return b1.add(b2).doubleValue();
    }
    
    /**
	 * 提供精确的减法运算。
	 * 
	 * @param v1
	 *            被减数
	 * @param v2
	 *            减数
	 * @return 两个参数的差
	 */
    public static double sub(double v1,double v2){
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return b1.subtract(b2).doubleValue();
    } 
    
    /**
	 * 提供精确的乘法运算。
	 * 
	 * @param v1
	 *            被乘数
	 * @param v2
	 *            乘数
	 * @return 两个参数的积
	 */
    public static double mul(double v1,double v2){
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return b1.multiply(b2).doubleValue();
    }
 
    /**
	 * 提供（相对）精确的除法运算，当发生除不尽的情况时，精确到 小数点以后10位，以后的数字四舍五入。
	 * 
	 * @param v1
	 *            被除数
	 * @param v2
	 *            除数
	 * @return 两个参数的商
	 */
    public static double div(double v1,double v2){
        return div(v1,v2,10);
    }
 
    /**
	 * 提供（相对）精确的除法运算。当发生除不尽的情况时，由scale参数指 定精度，以后的数字四舍五入。
	 * 
	 * @param v1
	 *            被除数
	 * @param v2
	 *            除数
	 * @param scale
	 *            表示表示需要精确到小数点以后几位。
	 * @return 两个参数的商
	 */
    public static double div(double v1,double v2,int scale){
        if(scale<0){
            throw new IllegalArgumentException(
                "The scale must be a positive integer or zero");
        }
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return b1.divide(b2,scale,BigDecimal.ROUND_HALF_UP).doubleValue();
    }
 
    /**
	 * 提供精确的小数位四舍五入处理。
	 * 
	 * @param v
	 *            需要四舍五入的数字
	 * @param scale
	 *            小数点后保留几位
	 * @return 四舍五入后的结果
	 */
    public static double round(double v,int scale){
        if(scale<0){
            throw new IllegalArgumentException(
                "The scale must be a positive integer or zero");
        }
        BigDecimal b = new BigDecimal(Double.toString(v));
        BigDecimal one = new BigDecimal("1");
        return b.divide(one,scale,BigDecimal.ROUND_HALF_UP).doubleValue();
    }
	
    /**
	 * 检查数据是否为double型(不包含负数)
	 * 
	 * @param str
	 * @return true-是,false-否
	 */
    public static boolean isDouble(String str){
    	boolean flag = false;
    	if (str!=null && !"".equals(str)){
    		String regex = "^\\s*[\\d]*.?[\\d]{0,2}\\s*$";
    		if (str.matches(regex)){
    			flag = true;
    		}
    	}
    	return flag;
    }
    
    /**
	 * 检查数据是否为double型
	 * 
	 * @param str
	 * @return true-是,false-否
	 */
    public static boolean isDoubleWithMinus(String str){
    	boolean flag = false;
    	if (str!=null && !"".equals(str)){
    		String regex = "^\\s*[-_－—―]?[\\d]*.?[\\d]{0,2}\\s*$";
    		if (str.matches(regex)){
    			flag = true;
    		}
    	}
    	return flag;
    }
   
   //数字加，号
	public static String toStringOfComma(String obj) {
		String str = "0.00";
		String cStr = "0.00";
		String backStr = ".00";
		StringBuffer suf = new StringBuffer();
		if (obj!=null&&!"".equals(obj)) {
			try{
				cStr = (obj);
			}catch (Exception e) {
				System.out.println(obj);
			}
			if(cStr.indexOf(".")>-1){
			str = cStr.substring(0, cStr.indexOf("."));
			backStr = cStr.substring(cStr.indexOf("."), cStr.length());
			}else{
				str = cStr;
			}
			int c = str.length() % 3;
			int b = str.length() / 3;
			for (int i = 0; i <= b; i++) {
				suf.append(str.substring(c + i * 3 - 3 < 0 ? 0 : c + i * 3 - 3, c + i * 3) + ((c == 0 && i == 0) || i == b ? "" : ","));
			}
			return (suf.toString() + backStr);
		}
		return "0.00";
	}
	
	
	//数字加，号
	public static String toStringOfComma(double obj) {
		DecimalFormat df = new DecimalFormat("0.00");
		String str = "0.00";
		String cStr = "0.00";
		String backStr = ".00";
		StringBuffer suf = new StringBuffer();
		if (obj!=0.00) {
			try{
				cStr = df.format(obj);;
			}catch (Exception e) {
				System.out.println(obj);
			}
			if(cStr.indexOf(".")>-1){
			str = cStr.substring(0, cStr.indexOf("."));
			backStr = cStr.substring(cStr.indexOf("."), cStr.length());
			}else{
				str = cStr;
			}
			int c = str.length() % 3;
			int b = str.length() / 3;
			for (int i = 0; i <= b; i++) {
				suf.append(str.substring(c + i * 3 - 3 < 0 ? 0 : c + i * 3 - 3, c + i * 3) + ((c == 0 && i == 0) || i == b ? "" : ","));
			}
			return (suf.toString() + backStr);
		}
		return "0.00";
	}
	
	static SimpleDateFormat sim = new SimpleDateFormat("yyyy-MM-dd");
	
	/*
	 * 比较时间判断是否最新，传入被比较时间和判断天数
	 * 
	 * 
	 * 
	 */
	public static boolean isNEW(String date,int dateNum){
		Calendar cal = Calendar.getInstance();
		Date date_1,date_2;
		try {
			date_1 = sim.parse(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			return false;
			//e.printStackTrace();
		}

		cal.add(Calendar.DAY_OF_MONTH, dateNum);
		date_2 = cal.getTime();

		if(date_1.after(date_2)){
			return true;
		}else{
			return false;
		}
	}
	

	/**
	 * 将0显示为 ""
	 * @param num
	 * @return
	 */
	public static String delZero(String num){
		if(num.equals("0")||num.equals("0.0")||num.equals("0.00")){
			return "";
		}
		return num;
	}
	
	/**
	 * 判断是该字符串是否为数据
	 * @param str
	 * @return boolean
	 */
	public static boolean isNumeric(String str){
		for(int i = str.length();--i>=0;){
			if(!Character.isDigit(str.charAt(i))){
				return false;
			}
		}
		return true;
	}
	public static String  getPrimaryID(int wei){
		//17+6=23
		Calendar cal= Calendar.getInstance(); 
    	String sjyf = DateHelper.format(cal.getTime(),"yyyyMMddHHmmssSSS")+ran(wei);    	
    	return sjyf;
	}
    
	private static String ran(int wei){ 
		
		 Random random=new Random();
		 String str="";
		 while(str.length()<wei){//控制长度
			 str+=random.nextDouble();
			 str=str.replaceAll("0.", "");
		 }		    	
		 return str.substring(0,wei);
	}
	
	/** 
     * 获取现在时间 
     * @return返回字符串格式yyyyMMddHHmmss 
     */  
      public static String getStringDate() {  
             Date currentTime = new Date();  
             SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");  
             String dateString = formatter.format(currentTime);  
             return dateString;  
          }  
      /** 
       * 由年月日时分秒+3位随机数 
       * 生成流水号 
       * @return 
       */  
      public static String GetSerialNum(){  
          String t = getStringDate();  
          int x=(int)(Math.random()*900)+100;  
          String serial = t + x;  
          return serial;  
      }  
      /**
       * 获取客户端IP
       * @param request
       * @return
       */
      public static String getIpAddr(HttpServletRequest request) {
          String ip = request.getHeader("x-forwarded-for");  
          if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
              ip = request.getHeader("Proxy-Client-IP");  
          }  
          if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
              ip = request.getHeader("WL-Proxy-Client-IP");  
          }  
          if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
              ip = request.getRemoteAddr();  
          }  
          return ip;  
      }  
}

