var now = new Date();                    //当前日期
var nowDayOfWeek = now.getDay();         //今天本周的第几天
var nowDay = now.getDate();              //当前日
var nowMonth = now.getMonth();           //当前月
var nowYear = now.getYear();             //当前年
nowYear += (nowYear < 2000) ? 1900 : 0;  //
var DateUtils = {
    /**
     * 扩展Date 对象格式化方法
     */
    expandDate: function () {
        Date.prototype.format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1,                 //月份
                "d+": this.getDate(),                    //日
                "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
                "H+": this.getHours(),                   //小时
                "m+": this.getMinutes(),                 //分
                "s+": this.getSeconds(),                 //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds()             //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    },
    /**
     * 获取具体年龄
     * @param {} beginStr
     * @param {} endStr
     * @return {}
     */
    getAgeInfo: function (beginStr, endStr) {
        var reg = new RegExp(/^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})(\s)(\d{1,2})(:)(\d{1,2})(:{0,1})(\d{0,2})$/);
        var beginArr = beginStr.match(reg);
        var endArr = endStr.match(reg);

        var days = 0;
        var month = 0;
        var year = 0;

        days = endArr[5] - beginArr[5];
        if (days < 0) {
            month = -1;
            days = 30 + days;
        }

        month = month + (endArr[3] - beginArr[3]);
        if (month < 0) {
            year = -1;
            month = 12 + month;
        }

        year = year + (endArr[1] - beginArr[1]);

        var yearString = year > 0 ? year + "岁" : "";
        var mnthString = month > 0 ? month + "月" : "";
        var dayString = days > 0 ? days + "天" : "";

        /*
         * 1 如果岁 大于等于1 那么年龄取 几岁 2 如果 岁等于0 但是月大于1 那么如果天等于0天小于3天 取小时 例如出生2天 就取 48小时
         */
        var result = "";
        if (year >= 1) {
            result = yearString + mnthString;
        } else {
            if (month >= 1) {
                result = days > 0 ? mnthString + dayString : mnthString;
            } else {
                var begDate = new Date(beginArr[1], beginArr[3] - 1, beginArr[5],
                    beginArr[7], beginArr[9], beginArr[11]);
                var endDate = new Date(endArr[1], endArr[3] - 1, endArr[5],
                    endArr[7], endArr[9], endArr[11]);

                var between = (endDate.getTime() - begDate.getTime()) / 1000;
                days = Math.floor(between / (24 * 3600));
                var hours = Math.floor(between / 3600 - (days * 24));
                var dayString = days > 0 ? days + "天" : "";
                result = days >= 3 ? dayString : days * 24 + hours + "小时";
            }
        }

        return result;
    },
    /**
     * 获取年龄，不满一天算天
     * @param {} birthday
     * @param {} today
     * @return {}
     */
    getAge: function (birthday, today) {
        var reg = new RegExp(/^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/);
        var beginArr = birthday.match(reg);
        var endArr = today.match(reg);

        var days = 0;
        var month = 0;
        var year = 0;

        days = endArr[5] - beginArr[5];
        if (days < 0) {
            month = -1;
            days = 30 + days;
        }

        month = month + (endArr[3] - beginArr[3]);
        if (month < 0) {
            year = -1;
            month = 12 + month;
        }

        year = year + (endArr[1] - beginArr[1]);

        var yearString = year > 0 ? year + "岁" : "";
        var mnthString = month > 0 ? month + "月" : "";
        var dayString = days > 0 ? days + "天" : "1天";

        /*
         * 1 如果岁 大于等于1 那么年龄取 几岁 2 如果 岁等于0 但是月大于1 name取几月 3 如果不足月， 则取天数 4 不满一天算一天
         */
        var result = "";
        if (year >= 1) {
            result = yearString + mnthString + dayString;
        } else {
            if (month >= 1) {
                result = days > 0 ? mnthString + dayString : mnthString;
            } else {
                result = dayString;
            }
        }
        return result;
    },
    /**
     * 获取月龄
     * @param {} birthday
     * @param {} today
     * @return {}
     */
    getMonthage: function (birthday, today) {
        var reg = new RegExp(/^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/);
        var beginArr = birthday.match(reg);
        var endArr = today.match(reg);

        var days = 0;
        var month = 0;
        var year = 0;

        days = endArr[5] - beginArr[5];
        if (days < 0) {
            month = -1;
            days = 30 + days;
        }

        month = month + (endArr[3] - beginArr[3]);
        if (month < 0) {
            year = -1;
            month = 12 + month;
        }

        year = year + (endArr[1] - beginArr[1]);

        var result = "";
        if (year >= 1) {
            result = (year * 12 + month + 1) + "个月";
        } else {
            if (month >= 1) {
                result = (month + 1) + "个月";
            } else {
                result = "1个月";
            }
        }
        return result;
    },
    //格式化日期：yyyy-MM-dd
    formatDate: function (date) {
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();

        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        return (myyear + "-" + mymonth + "-" + myweekday);
    },

    //获得某月的天数
    getMonthDays: function (myMonth) {
        var monthStartDate = new Date(nowYear, myMonth, 1);
        var monthEndDate = new Date(nowYear, myMonth + 1, 1);
        var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        return days;
    },

    //获得本季度的开始月份
    getQuarterStartMonth: function () {
        var quarterStartMonth = 0;
        if (nowMonth < 3) {
            quarterStartMonth = 0;
        }
        if (2 < nowMonth && nowMonth < 6) {
            quarterStartMonth = 3;
        }
        if (5 < nowMonth && nowMonth < 9) {
            quarterStartMonth = 6;
        }
        if (nowMonth > 8) {
            quarterStartMonth = 9;
        }
        return quarterStartMonth;
    },

    //获得本周的开始日期
    getWeekStartDate: function () {
        var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
        return DateUtils.formatDate(weekStartDate);
    },

    //获得本周的结束日期
    getWeekEndDate: function () {
        var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
        return DateUtils.formatDate(weekEndDate);
    },

    //获得本月的开始日期
    getMonthStartDate: function () {
        var monthStartDate = new Date(nowYear, nowMonth, 1);
        return DateUtils.formatDate(monthStartDate);
    },

    //获得本月的结束日期
    getMonthEndDate: function () {
        var monthEndDate = new Date(nowYear, nowMonth, DateUtils.getMonthDays(nowMonth));
        return DateUtils.formatDate(monthEndDate);
    },

    //获得本季度的开始日期
    getQuarterStartDate: function () {

        var quarterStartDate = new Date(nowYear, DateUtils.getQuarterStartMonth(), 1);
        return DateUtils.formatDate(quarterStartDate);
    },

    //获得本季度的结束日期
    getQuarterEndDate: function () {
        var quarterEndMonth = dateUtil.getQuarterStartMonth() + 2;
        var quarterStartDate = new Date(nowYear, quarterEndMonth, DateUtils.getMonthDays(quarterEndMonth));
        return DateUtils.formatDate(quarterStartDate);
    },

    //获得本年的开始日期
    getYearStartDate: function () {
        //获得当前年份4位年
        var currentYear = now.getFullYear();
        //本年第一天
        var currentYearFirstDate = new Date(currentYear, 0, 1);
        return DateUtils.formatDate(currentYearFirstDate);
    },

    //获得本年的结束日期
    getYearEndDate: function () {
        //获得当前年份4位年
        var currentYear = now.getFullYear();
        //本年最后
        var currentYearLastDate = new Date(currentYear, 11, 31);
        return DateUtils.formatDate(currentYearLastDate);
    },
    //获取当前日期的前(后)多少天 转换格式为YYYY-MM-DD
    getNextDateYMD: function(date,day){
        var dd = new Date(date);
        dd.setDate(dd.getDate() + day);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        return y + "-" + m + "-" + d;
    },
    //获取当前日期的前(后)多少天 转换格式为MM-DD
    getNextDateMD: function(date,day){
        var dd = new Date(date);
        dd.setDate(dd.getDate() + day);
        var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        return  m + "-" + d;
    },
    //获取当前日期的前(后)多少月 转换格式为YYYY-MM
    getNextMonthYM: function(date,month){
        var dd = new Date(date);
        dd.setMonth(dd.getMonth()+month+1);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        return  y + "-" + m;
    }
}