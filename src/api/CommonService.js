import moment from "moment";

export const CommonService = {
  REGEX_NUMBER: /^[0-9]*$/,
  
  REGEX_PHONE_NUMBER: /^\+?(?:[0-9]??).{9,12}[0-9]/,
  
  REGEX_EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  changeAlias: function (alias) {
    if (!alias) {
      return alias;
    }
    let str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a'); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e'); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i'); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o'); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u'); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y'); 
    str = str.replace(/đ/g, 'd');
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|“|”|"|&|#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
    str = str.replace(/ + /g, ' ');
    str = str.trim(); 
    str = str.replace(/\s/g, '-');
    return str;
  },

  getCovertedTime: function(date, FORMAT_TIME) {
    if (!date) {
      return date;
    }
    return moment(date).format(FORMAT_TIME || "DD/MM/YYYY");
  },

}
