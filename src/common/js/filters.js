import Vue from 'vue'

/**
 *
 * 截取字符串,部分显示;
 * 默认截取前100个字符;
 */
Vue.filter('subStr', function(str, num = 100) {
    return str.length > num ? (str.substr(0, num) + "...") : str.substr(0, num)
})

/*时间戳转换*/
Vue.filter('timeFilter', function(str, type) {
    if (!str) {
        return '- -'
    }
    str = String(str).length <= 10 ? str * 1000 : str;
    let formatTime = (a) => parseInt(a) < 10 ? '0' + parseInt(a) : parseInt(a);
    let t = new Date(str);
    let year = t.getFullYear();
    let month = formatTime(t.getMonth() + 1);
    let day = formatTime(t.getDate());
    let hours = formatTime(t.getHours());
    let minutes = formatTime(t.getMinutes());
    let seconds = formatTime(t.getSeconds());
    if (type == "ymd") {
        return `${year}-${month}-${day}`;
    } else if (type == 'hms') {
        return `${hours}:${minutes}:${seconds}`;
    } else if (type == 'ms') {
        return `${minutes}:${seconds}`;
    } else if (type == 'ymdhm') {
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    } else if (type == "article") {
        //6月13号 13:00
        return `${month}月${day}号 ${hours}:${minutes}`

    } else if (type == "order") {
        //6月13号 13:00
        return `${year}年${month}月${day}号`

    } else {
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
})
/*日期转换*/
Vue.filter('dateFilter', function(str) {
    return str.slice(0, 4) + '-' + str.slice(4, 6) + '-' + str.slice(6);
});


// 页面使用方式:   item.time | timeFilter('')