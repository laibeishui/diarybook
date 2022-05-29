var fs=require('fs');
var ini=require('ini');
var path = require('path');
var basePath='C:/Users/MyDiary';

// 读取所有的ini 文件
exports.ReadIniDir=function(){
    var dataList=[];
    CheckFile(basePath)
    var diaryYearList=fs.readdirSync(basePath);
    if(diaryYearList.length!=0){
        diaryYearList.forEach((yitem)=>{
            var diaryMonthList=fs.readdirSync(basePath+'/'+yitem);
            if(diaryMonthList.length!=0){
                diaryMonthList.forEach((mitem)=>{
                    var diaryDayList=fs.readdirSync(basePath+'/'+yitem+'/'+mitem)
                    if(diaryDayList.length!=0){
                        diaryDayList.forEach((ditem)=>{
                            dataList.push(ReadIniFile(basePath+'/'+yitem+'/'+mitem+'/'+ditem))
                        })
                        dataList.sort(function (a, b) {return Date.parse(a.Date) - Date.parse(b.Date);});
                    }
                })
            }
        })
    }

    return dataList;
},

// 新增一个Ini 日记文件
exports.WriteIniFile=function(obj){
    var iniPath = GetPathByDate(obj.Date);
    obj.Date=DateFormat(obj.Date);
    fs.writeFileSync(iniPath, ini.stringify(obj,{ section: 'diary' }))
},

// 通过日期获取单个日记
exports.GetIniFileByDate =function(selectDate){
    var diaryFile={};
    var selectFilePath=GetPathByDate(selectDate);
    fs.existsSync(selectFilePath)
    if(fs.existsSync(selectFilePath)){
        diaryFile=ReadIniFile(selectFilePath)
    }
    return diaryFile;
}

// 读取一个Ini 文件
function ReadIniFile(path){
    var diary = ini.parse(fs.readFileSync(path, 'utf-8'));
    return diary.diary;
}

// 通过日期生成路径
function GetPathByDate(date){
    CheckFile(basePath);
    var year = date.getFullYear();
    CheckFile(path.join(basePath,year.toString()))

    var month = date.getMonth() + 1;
    CheckFile(path.join(basePath,year.toString(),month.toString()))
    var day = date.getDate();
    return path.join(basePath,year.toString(),month.toString(),"dairy" + day.toString() + ".ini");
}

// 检查文件夹是否已经创建
function CheckFile(checkPath){
    if(!fs.existsSync(checkPath)){
        fs.mkdir(checkPath,function(err){
            if(err)
                console.error(err);
            console.log('创建目录成功');
        });
    }
    else{
        console.log("目录已存在")
    }
}

// 修改存储date的格式
function DateFormat(date){
    return  date.getFullYear().toString()+'/'+(date.getMonth()+1).toString()+'/'+date.getDate().toString();
}
