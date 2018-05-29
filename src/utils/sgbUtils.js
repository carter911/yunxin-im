
let sgbUtils = Object.create(null)

/**
* 
* @param {项目角色id} id 
* @return 返回角色名称
*/
sgbUtils.getRoleNameById = function(id){
    if(typeof(id) != Number) {
        try {
            id = parseInt(id);
        }catch(err) {
            id = 0 ;
        }
    }

    switch(id) {
        case 1:
            return "店面经理";
         case 2:
            return "项目管家";
        case 3:
            return "设计师";
        case 4:
             return "内部工人";
        case 5:
             return "业主";
        case 6:
             return "观察者";
        case 7:
             return "副业主";
        case 8:
             return "工程部经理";
        case 9:
             return "质检员";
        case 11:
             return "工班长";
        case 12:
             return "行政部";
        case 13:
             return "行政部(客户)";
        case 14:
             return "行政部(施工)";
        case 15:
             return "主材经理";
        case 16:
             return "辅材经理";
        case 17:
             return  "主材供应商(内部)" ;
        case 18:
             return "主材安装工(内部)" ;
        case 19:
             return "软装经理";
        case 20:
             return "主材供应商(甲供)";
        case 21:
             return "主材安装工(甲供)";
        default:
            return "";     
    }
}

export default sgbUtils;

