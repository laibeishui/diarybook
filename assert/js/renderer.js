
var fileOperation = require('./fileOperation.js');

// 获取所有日记并添加日记的div
exports.AppendDiv=function(){
  var diaryData=fileOperation.ReadIniDir();
  var appendStr='';
  if(diaryData.length!=0){
    diaryData.forEach((item)=>{
      var content=base64Decode(item.Content);
      var weather=base64Decode(item.Weather);
      appendStr+='<div><h1>'+item.Date.replace('0:00:00','') +' | ' +GetDayOfWeek(item.Date) + ' | '+ weather+'</h1><p>'+content+'</p> </div>';
    })
  }
  $('#diary-content').prepend(appendStr)
  return diaryData.length;
}

// 保存日记
exports.SaveDiary=function(obj){
  obj.Date=new Date(Date.parse(obj.Date.replace(/-/g,  "/")));
  console.log(obj.Date)
  obj.Content=base64Encode(obj.Content);
  obj.Weather=base64Encode(obj.Weather);
  fileOperation.WriteIniFile(obj) 
}

// 获取单个日记
exports.GetDiaryByDate=function(date){
  var selectDate=new Date(Date.parse(date.replace(/-/g,  "/")));
  var diaryData=fileOperation.GetIniFileByDate(selectDate);
  console.log(diaryData)
  if(JSON.stringify(diaryData) != '{}'){
    diaryData.Content=base64Decode(diaryData.Content);
    diaryData.Weather=base64Decode(diaryData.Weather);
  }
  return diaryData;
}

// 通过日期获取星期几
function GetDayOfWeek(date){
  var daytemp=new Date(Date.parse(date));
  var today=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
  var week=today[daytemp.getDay()];
  return week;
}

// base64 加密
function base64Encode(input){
   var rv;
   rv = encodeURIComponent(input);
   console.log(rv)
   rv = unescape(rv);
   rv = window.btoa(rv);
   return rv;
}

// base64 解密
function base64Decode(input){
   rv = window.atob(input);
   console.log(rv);
   rv = escape(rv);
   rv = decodeURIComponent(rv);
   return rv;
}

















