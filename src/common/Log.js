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

Log.success_msg = function(message) {
    this.$message({
        message: message,
        type: 'success'
      });
}

Log.formatTime = function(time) {
   if(time == undefined || time <= 0 ) return "";
   let intTime = parseInt(time) * 1000;
   return  new Date(intTime).toLocaleDateString() ;
}

