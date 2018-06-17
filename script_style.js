function Item(data,checked) {
    this.data = data
    this.ischecked = checked
}

var items = []
function checkLocal() {
    if((localStorage["jsonList"] !== undefined)) {
        items = JSON.parse(localStorage["jsonList"])
        refresh()
    }
}
checkLocal()
function addItemToList() {
    var inputText = getData()
    if(inputText === "" || inputText == null)
        return
    var listitem = new Item(inputText,false)
    items.push(listitem)
    localStorage["jsonList"] = JSON.stringify(items)
    refresh()
}

function refresh() {
    var list = document.getElementById("itemsList")
    if(list != null) {
        list.parentNode.removeChild(list)
    }
    list = document.createElement("div")
    list.setAttribute("class","container")
    list.setAttribute("id","itemsList")
    items.forEach(function (item,index,items) {
        var divElement = makeItem(item.data,index)
        var checkBox = divElement.getElementsByClassName("checkedBoxList")[0]
        checkBox.checked = item.ischecked
        checkBox.addEventListener("click",function () {
            checkItem(item,index,items,checkBox.checked)
        })
        if(item.ischecked) {
            var strike = document.createElement("s")
            strike.innerText = item.data
            var actualDataItem = divElement.getElementsByClassName("actualListData")[0]
            var parentNode = actualDataItem.parentNode
            parentNode.removeChild(actualDataItem)
            var newDivElement = document.createElement("div")
            newDivElement.setAttribute("class","col-md actualListData")
            newDivElement.appendChild(strike)
            parentNode.appendChild(newDivElement)
        }
        var upButton = divElement.getElementsByClassName("up-icon")[0]
        upButton.addEventListener("click",function () {
            moveUp(item,index,items)
        })
        var downButton = divElement.getElementsByClassName("down-icon")[0]
        downButton.addEventListener("click",function () {
            moveDown(item,index,items)
        })
        var crosssButton = divElement.getElementsByClassName("cross-icon")[0]
        crosssButton.addEventListener("click",function () {
            crossItem(item,index,items)
        })
        if(index==0)
            upButton.parentNode.removeChild(upButton)
        if(index==items.length-1)
            downButton.parentNode.removeChild(downButton)
        list.appendChild(divElement)
    })
    document.body.appendChild(list)
}


function getData()
{
    var inputField = document.getElementById("inputText")
    var inputData = inputField.value
    inputField.value = ""
    return inputData
}

function makeItem(data,index)
{
    var singleListitem = "<div class=\"card bg-dark text-white\">\n" +
        "        <div class=\"card-body row\">\n" +
        "            <div class=\"custom-control custom-checkbox col-md-7\" style=\"padding-left: 2rem\">\n" +
        "                <input type=\"checkbox\" class=\"custom-control-input checkedBoxList\" id=\"checkedbox-id"+ index +"\">\n" +
        "                <label class=\"custom-control-label\" for=\"checkedbox-id"+index +"\"><div class=\"col-md actualListData\" >" + data +
        "                </div></label>\n" +
        "            </div>\n" +
        "            <div class=\"col-md-1\">\n" +
        "                <div style=\"font-size:20px; color:Tomato\" class=\"icons-fa up-icon\" >\n" +
        "                    <i class=\"fas fa-chevron-up\"></i>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <div class=\"col-md-1\">\n" +
        "                <div style=\"font-size:20px; color:Tomato\" class=\"icons-fa down-icon\">\n" +
        "                    <i class=\"fas fa-chevron-down\"></i>\n" +
        "                </div>\n" +
        "        </div>\n" +
        "            <div class=\"col-md-1\">\n" +
        "                <div style=\"font-size:20px; color:Red\" class=\"icons-fa cross-icon\">\n" +
        "                    <i class=\"fas fa-times-circle\"></i>\n" +
        "                </div>\n" +
        "        </div>\n" +
        "        </div>\n" +
        "    </div>"
        var item = document.createElement("div")
        item.innerHTML = singleListitem
        return item
}


function deleteUnchecked()
{
    var newItemsList = []
    items.forEach(function (item,index,items) {
        if(item.ischecked !== true)
            newItemsList.push(item)
    })
    items = newItemsList
    localStorage["jsonList"] = JSON.stringify(items)
    refresh()
}

function checkItem(item,index,items,value) {
    items[index].ischecked = value
    localStorage["jsonList"] = JSON.stringify(items)
    refresh()
}

function sortList() {
    items.sort(function (a,b) {
        if(a.ischecked == true)
            return 1
        else return -1
    })
    localStorage["jsonList"] = JSON.stringify(items)
    refresh()
}

function moveUp(item,index,items) {
    items[index] = items[index-1]
    items[index-1] = item
    localStorage["jsonList"] = JSON.stringify(items)
    refresh()
}

function moveDown(item,index,items) {
    items[index] = items[index+1]
    items[index+1] = item
    localStorage["jsonList"] = JSON.stringify(items)
    refresh()
}

function crossItem(item,index,items) {
    items.splice(index,1)
    localStorage["jsonList"] = JSON.stringify(items)
    refresh()
}