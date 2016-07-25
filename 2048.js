/**
 * Created by db on 16/7/23.
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
            //console.log(nodes[i]);
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

//将row分为一个以数组为元素的数组
function allNodesArray() {
    var nodes = getAllNodes()
    var row1 = nodes.slice(0, 4)
    var row2 = nodes.slice(4, 8)
    var row3 = nodes.slice(8, 12)
    var row4 = nodes.slice(12, 16)
    var rows = [row1,row2,row3,row4]
    return rows
}


//判断能否左移
function isMoveLeft() {
    var tempNodes = allNodesArray()
    var flag = false;
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 3; j++) {
            var curr = tempNodes[i][j].innerText
            var next = tempNodes[i][j+1].innerText
            if(curr == "" && next != "") {
                flag = true;
                return flag;
            }
            if(curr == next && curr !== "") {
                flag = true;
                console.log("temp-true")
                return flag;
            }
        }
    }
}

/****
 * 获取单行的节点内容，并赋值给nodeArr
 * @param row
 * @returns {Array}
 */
function getRowsInnerText(row) {
    var nodeArr = [];
    for(var i = 0;i < 4; i++) {
        if(row[i].innerText !== '') {
            nodeArr.push(row[i].innerText);
        }
    }
    return nodeArr;
}

/***
 * 根据传入的形参nodeArr，对nodeArr内容判断，如果相邻且相同则相加，否则不相加
 * 上述动作执行完毕后，将值赋给newrow
 * @param nodeArr
 * @returns {Array}
 */
function filterEmptyInner(nodeArr) {
    var newrow = []
    var t = 4;
    for(var k = 0; k < t; k++){
        var temp = 0;
        if(nodeArr[k]) {
            if( nodeArr[k] === nodeArr[k + 1]) {
                temp = Number(nodeArr[k]) + Number(nodeArr[k + 1]);
                k++;
                t += 1;
                newrow.push(temp);
            } else {
                newrow.push(nodeArr[k])
            }
        } else {
            newrow.push('');
        }
    }
    return newrow;
}

/***
 * 完成左移后赋值给row，row.innerText = newrow[]
 * @param row
 * @param newrow
 */
function completeMoveLeft(row,newrow) {
    for(var u = 0; u < 4; u++) {
        row[u].innerText = newrow[u];
        //console.log(row)
    }
}

/***
 * 实现左移函数
 * @param row
 */
function rowMoveLeft (row) {
    var nodeArr = getRowsInnerText(row)
    var newrow = filterEmptyInner(nodeArr)
    completeMoveLeft(row,newrow)
}


//2048程序初始化
function init(){
    var num1 = getRandomNum()
    var num2 = getRandomNum()
    var num3 = getRandomNum()
    var num4 = getRandomNum()

    var node1 = getRandomEmptyNode()
    node1.innerText = num1

    var node2 = getRandomEmptyNode()
    node2.innerText = num2

    var node3 = getRandomEmptyNode()
    node3.innerText = num3

    var node4 = getRandomEmptyNode()
    node4.innerText = num4
}

/***
 * 左移
 */
function moveLeft(){
    console.log('moveLeft')

    if(isMoveLeft()) {
        var nodes = getAllNodes()

        var row1 = nodes.slice(0, 4)
        rowMoveLeft(row1)

        var row2 = nodes.slice(4, 8)
        rowMoveLeft(row2)

        var row3 = nodes.slice(8, 12)
        rowMoveLeft(row3)

        var row4 = nodes.slice(12, 16)
        rowMoveLeft(row4)

        var mvLeft_EmptyNodes = getRandomEmptyNode()
        mvLeft_EmptyNodes.innerText = getRandomNum()
    }
}

function moveUp(){
    console.log('moveUp')
}

function moveRight(){
    console.log('moveRight')
}

function moveDown(){
    console.log('moveDown')
}

//程序的入口函数
function main(){
    init()

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

main()