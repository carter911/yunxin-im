export default Log ;

function Log(){}

Log.DEFAULT_IMAGE = function(){
    return "http://images.e-shigong.com/ic_launcher.png"
}

Log.PAGE_SIZE = function(){
    return 15 ;
}

Log.L = function(obj) {
   console.log(obj);
}

Log.L2 = function(msg,obj) {
    console.log(msg) ;
    console.log(obj);
}

Log.success_msg = function(message) {
    // this.$message({
    //     message: message,
    //     type: 'success'
    //   });
}

Log.formatTime = function(time) {
   if(time == undefined || time <= 0 ) return "";
   let intTime = parseInt(time) * 1000;
   return  new Date(intTime).toLocaleDateString() ;
}

/**
 * 获取image 前缀
 */
Log.getImageSuffix = function() {
    return "http://images.e-shigong.com/";
}

/**
 * 获取一个新随机的image上传Url
 */
Log.getRandomImageFileName = function(){
    return "web/" + (new Date().getTime())+ "_" + Math.floor((Math.random() * 80000) + 1)  + ".jpg";
}

//各种权限设置
//任务上传图片
Log.TASK_UPLOAD_PICTURE = function() {
    return "307";
}

//任务上传权限
Log.TASK_UP_LOAD = function(){
    return "302";
}

//内部任务审核
Log.TASK_INNER_TASK_CHECK = function(){
    return "306";
}

//业主任务审核
Log.TASK_CHECK_OUTER_CHECK = function(){
    return "305";
}