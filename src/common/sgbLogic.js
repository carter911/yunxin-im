
/**
 * 施公宝业务逻辑
 * @version 1.0.4
 */

let sgb = Object.create(null)
 /**
  * 获取未读的提醒
  * @param {boolean} showUnRead 
  * @param {Array} remindList 
  */
 sgb.getSuitableTaskList = function (showUnRead, remindList){
    if(!showUnRead) {
        return remindList;
    }

    let result = []  ;
    remindList.forEach(remind => {
        if(remind.isLike === 0) {
            result.push(remind);
        }
    });

    if (result.length > 2) {
        return result.slice(0,2);
    }else {
        let len = result.length;
        for(let i = 0 ; i < Math.min(2 - len, remindList.length) ; i++) {
            if(remindList[i].isLike !== 0) {
                result.push(remindList[i]);
            }
        }
    }


    console.log("-------getSuitablTaskList----", result);

   return result; 
}

export default sgb;