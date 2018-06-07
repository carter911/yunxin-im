/**
 * 使用localStorage管理存储sgb临时数据
 * 
 * 目前主要存储 
 * 1. 项目基本信息： 全部项目 进行中项目 已延期项目 已结束项目
 * 
 */

 var sgb_storage = {
     
    /**
     * 存储数据
     */
    setStorage: function(key, value , duration = 30 * 60 * 1000) {
        if(null == value || undefined == value) return ;
        
        var data = {
            value : value ,
            expiryTime: !duration || isNaN(duration) ? 0 : new Date().getTime() + parseInt(duration)
        }

        localStorage[key] = JSON.stringify(data)
    },
    
    /**
     * 获取相对应的storage
     */
    getStorage:function(key) {
        var data = localStorage[key] ;
        if(!data || data === "null") {
            return null ;
        }

        var now = new Date().getTime();
        var obj ;
        try {
            obj = JSON.parse(data);
        }catch(error) {
            return null ;
        }

        if(obj.expiryTime === 0 || obj.expiryTime > now) {
            return obj.value ;
        }

        return null ;
    },

    removeStorage : function(key) {
        localStorage.removeItem[key];
    } ,

    removeAllProjectInfo() {
        localStorage.clear();
        console.log("----removeAllProjectInfo------->>>") ;
    }
 }

 export default sgb_storage ;