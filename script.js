function Item(data,checked) {
    this.data = data
    this.ischecked = checked
}

var items = []

function addItemToList() {
    var inputText = document.getElementById("inputText")
    var text = inputText.value
    var listitem = new Item(text,false)
    items.push(listitem)
    refresh()
}

function refresh() {
    var list = document.getElementById("itemsList")
    if(list != null) {
        list.parentNode.removeChild(list)
    }
    list = document.createElement("ul")
    list.setAttribute("id","itemsList")
    items.forEach(function (item,index,items) {
        var divElement = document.createElement("div")
        var checkboxElement = document.createElement("input")
        checkboxElement.setAttribute("type","checkbox")
        checkboxElement.checked = item.ischecked
        checkboxElement.addEventListener("click",function () {
            checkItem(item,index,items,checkboxElement.checked)
        })

        var listElement = document.createElement("li")

        if(items[index].ischecked) {
            var strike = document.createElement("s")
            strike.innerText = item.data
            listElement.appendChild(strike)
        }
        else
            listElement.innerText = item.data

        var upButton = document.createElement("button")
        upButton.innerText = "Up"
        upButton.addEventListener("click",function () {
            moveUp(item,index,items)
        })


        var downButton = document.createElement("button")
        downButton.innerText = "Down"
        downButton.addEventListener("click",function () {
            moveDown(item,index,items)
        })
        divElement.appendChild(checkboxElement)
        divElement.appendChild(listElement)
        if(index!=0)
            divElement.appendChild(upButton)
        if(index!=items.length-1)
            divElement.appendChild(downButton)
        list.appendChild(divElement)
    })
    document.body.appendChild(list)

}
function moveUp(item,index,items) {
    items[index] = items[index-1]
    items[index-1] = item
    refresh()
}

function moveDown(item,index,items) {
    items[index] = items[index+1]
    items[index+1] = item
    refresh()
}


function deleteUnchecked()
{
    items.forEach(function (item,index,items) {
        if(item.ischecked == true)
            items.splice(index,1)
    })
    refresh()
}

function checkItem(item,index,items,value) {
    items[index].ischecked = value
    refresh()
}

function sortList() {
    items.sort(function (a,b) {
        if(a.ischecked == true)
            return 1
        // else if(a.ischecked == b.ischecked)
        //     return 0
        else return -1
    })
    refresh()
}