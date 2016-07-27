/**
 * Created by Rubby on 16/7/23.
 */

/***
 * 返回随机整数，该随机整数
 * @param min  整数min
 * @param max  整数max
 * @returns {*}   >=min <= max
 */
function getRandomInt(min, max){
    return min + Math.floor(Math.random() * (max - min + 1))
}

/****
 * 返回整数2或者4，因为我们对程序只需要随机生成2或者4
 * @returns {number} 整数2或者4
 */
function getRandomNum(){
    var arr = [2, 4]
    var index = getRandomInt(0, 1)
    return arr[index]
}

/***
 * 返回页面内节点的innerText值为空的所有节点
 * @returns {Array} 节点数组
 */
function getAllEmptyNodes(){
    var emptyNodes = []
    var nodes = document.getElementsByTagName('td')
    for(var i = 0; i < nodes.length; i++){
        if(nodes[i].innerText == ''){
            emptyNodes.push(nodes[i])
        }
    }
    return emptyNodes
}

/****
 * 返回一个随机的内容为空的节点
 * @returns {*}
 */
function getRandomEmptyNode(){
    var emptyNodes = getAllEmptyNodes()
    if(emptyNodes.length == 0){
        return null
    }
    var randomIndex = getRandomInt(0, emptyNodes.length - 1)
    return emptyNodes[randomIndex]
}

/****
 * 获取所有节点
 * @returns {Array.<T>}
 */
function getAllNodes(){
    return Array.prototype.slice.call(document.getElementsByTagName('td'))
}

//获取所有节点，取出所有节点数据，并将数据放入数组move_dataArray中
function move_dataArray() {
    var allNodes = getAllNodes(); //获取所有节点
    var move_dataArray = [];
    for(var i = 0; i < 16; i++) {
        var temp_num = allNodes[i].innerText;
        if(temp_num == "") {
            move_dataArray.push(0);//空值时以0代替
        } else {
            move_dataArray.push(Number(temp_num));
        }
    }
    return move_dataArray;
}

//生成一个符合移动需要的---左移---二维数组
function moveLeft_dataArray() {
    var moveLight_dataArray = move_dataArray();
    var temp_num1 = moveLight_dataArray.slice(0,4);
    var temp_num2 = moveLight_dataArray.slice(4,8);
    var temp_num3 = moveLight_dataArray.slice(8,12);
    var temp_num4 = moveLight_dataArray.slice(12,16);
    var tempData_dataArray;
        tempData_dataArray = [temp_num1,temp_num2,temp_num3,temp_num4];
    return tempData_dataArray;
}

//生成一个符合移动需要的---右移---二维数组
function moveRight_dataArray() {
    var moveRight = moveLeft_dataArray();
    var tempData_dataArray;
    tempData_dataArray = [moveRight[0].reverse(),moveRight[1].reverse(),moveRight[2].reverse(),moveRight[3].reverse()];
    return tempData_dataArray;
}

//生成一个符合移动需要的---上移---二维数组
function moveTop_dataArray() {
    var moveTop_dataArray = move_dataArray();
    var temp_num1 = [],temp_num2 = [],temp_num3 = [],temp_num4 = [];
    for(var i = 0; i < 16; i++) {
        var t = i % 4;
        switch (t) {
            case 0: temp_num1.push(moveTop_dataArray[i]);break;
            case 1: temp_num2.push(moveTop_dataArray[i]);break;
            case 2: temp_num3.push(moveTop_dataArray[i]);break;
            case 3: temp_num4.push(moveTop_dataArray[i]);break;
        }
    }
    var tempData_dataArray;
    tempData_dataArray = [temp_num1,temp_num2,temp_num3,temp_num4];
    return tempData_dataArray;
}

//生成一个符合移动需要的---下移---二维数组
function moveDown_dataArray() {
    var tempdata = moveTop_dataArray();
    var tempData_dataArray;
    tempData_dataArray = [tempdata[0].reverse(),tempdata[1].reverse(),tempdata[2].reverse(),tempdata[3].reverse()];
    return tempData_dataArray;
}

//判断移动条件是否成立，需要传入参数Array，即move？？？？_dataArray
function canMoveOrNot(array) {
    var ifMove = array;
    var flag = false;
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 3; j++) {
            var curr = ifMove[i][j];
            var next = ifMove[i][j+1];
            if(curr == 0 && next != 0) {
                flag = true;
                return flag;
            } else if(curr != 0 && curr == next) {
                flag = true;
                return flag;
            }
        }
    }
}

//对子数组逐个去除空位，并且将位数不够四位的值赋值0，需要传入参数Array,即move？？？？_dataArray
function filterEmptyLocationWith0(array) {
    var newArray = [];
    console.log(array);
    for(var i = 0; i < 4; i++) {
        if(array[i] > 0) {
            newArray.push(array[i]);
        }
    }
    for(var j = 3;j > newArray.length - 1; j-- ) {
        newArray.push(0);
    }
    return newArray;
}

//执行相加操作(有相加条件，即执行相加操作)，需要传入参数Arr，addNums函数会将参数转换为filterEmptyLocationWith0的形参
function addNums(array) {
    var Array = filterEmptyLocationWith0(array);
    var newrow = [];
    var t = 4;
    for(var k = 0; k < t; k++){
        var temp = 0;
        if(Array[k] > 0) {
            if( Array[k] === Array[k + 1]) {
                temp = Array[k] + Array[k + 1];
                k++;
                t += 1;
                newrow.push(temp);
            } else {
                newrow.push(Array[k])
            }
        } else {
            newrow.push(0);
        }
    }
    return newrow;
}

//处理数据（二维数组拆分,相加条件存在则执行相加操作,否则不相加，后再逆向赋值给一个新数组）
function handleData(moveDirect,single) {
    var Array = moveDirect;
    var dA1 = Array[0];
    var newAr1 = addNums(dA1);
    var dA2 = Array[1];
    var newAr2 = addNums(dA2);
    var dA3 = Array[2];
    var newAr3 = addNums(dA3);
    var dA4 = Array[3];
    var newAr4 = addNums(dA4);
    var newMArrs = [];
    if(single == 39 || single == 40) {
        newMArrs.push(newAr1.reverse());
        newMArrs.push(newAr2.reverse());
        newMArrs.push(newAr3.reverse());
        newMArrs.push(newAr4.reverse());
    } else if(single == 37 || single == 38) {
        newMArrs.push(newAr1);
        newMArrs.push(newAr2);
        newMArrs.push(newAr3);
        newMArrs.push(newAr4);
    } else {}
    console.log(newMArrs);
    return newMArrs;
}

//将二维数组还原成一维数组
function multiArrayToSingleArray(moveDirect,single) {
    var allNodes = handleData(moveDirect,single);
    var newNodes = [];
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            if(single == 37 || single == 39) {
                if(allNodes[i][j] > 0) {
                    newNodes.push(allNodes[i][j]);
                } else {
                    newNodes.push(0);
                }
            } else if(single == 38 || single == 40) {
                if(allNodes[i][j] > 0) {
                    newNodes[i + j*4] = allNodes[i][j];
                } else {
                    newNodes[i + j*4] = 0;
                }
            } else {}
        }
    }
    return newNodes;
}

//渲染各个节点
function renderData(moveDirect,single) {
    var newNodes = multiArrayToSingleArray(moveDirect,single);
    var oldNodes = getAllNodes();
    for(var m = 0; m < 16; m++) {
        if(newNodes[m] > 0) {
            oldNodes[m].innerText = newNodes[m];
        } else {
            oldNodes[m].innerText = "";
        }
    }
}

//移动条件成立，则执行移动操作
function moveDatas(moveDirect,single) {
    var temp_ifMove = canMoveOrNot(moveDirect);//能否移动
    if(temp_ifMove) {
        renderData(moveDirect,single);
        var emptyNodes = getRandomEmptyNode();
        emptyNodes.innerText = getRandomNum();
    }
}

//左移
function moveLeft(){
    console.log('moveLeft')
    var single = 37;
    var moveDirect = moveLeft_dataArray();
    moveDatas(moveDirect,single);
}

//上移
function moveUp(){
    console.log('moveUp')
    var single = 38;
    var moveDirect = moveTop_dataArray();
    moveDatas(moveDirect,single);
}

//右移
function moveRight(){
    console.log('moveRight');
    var single = 39;
    var moveDirect = moveRight_dataArray();
    moveDatas(moveDirect,single);
}

//下移
function moveDown(){
    console.log('moveDown')
    var single = 40;
    var moveDirect = moveDown_dataArray();
    moveDatas(moveDirect,single);
}

//2048程序初始化
function init(){
    var num1 = getRandomNum()
    var num2 = getRandomNum()
    //var num3 = getRandomNum()
    //var num4 = getRandomNum()

    var node1 = getRandomEmptyNode()
    node1.innerText = num1

    var node2 = getRandomEmptyNode()
    node2.innerText = num2

    //var node3 = getRandomEmptyNode()
    //node3.innerText = num3
    //
    //var node4 = getRandomEmptyNode()
    //node4.innerText = num4
}

//动作监听函数,各个动作函数入口
function actionLinstener() {
    document.addEventListener('keyup', function(event){
        var keyCode = event.keyCode

        if(keyCode == 37){
            moveLeft()
        }else if(keyCode == 38){
            moveUp()
        }else if(keyCode == 39){
            moveRight()
        }else if(keyCode == 40){
            moveDown()
        }else{
        }
    }, false)
}

//程序的入口函数
function main(){
    init();
    actionLinstener()
}

main();