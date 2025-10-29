//新增数据函数
function addRow(){
    var table = document.getElementById('table');
    
    // 检查并移除空表格提示
    if (table.rows.length === 2) {
        var firstDataRow = table.rows[1];
        var firstCell = firstDataRow.cells[0];
        // 如果当前行是提示行，则删除它
        if (firstCell.colSpan === 3) {
            table.deleteRow(1);
        }
    }

    //获取插入的位置
    var length = table.rows.length;

    //插入行节点
    var newRow = table.insertRow(length);

    //插入列节点对象
    var nameCol = newRow.insertCell(0);
    var phoneCol = newRow.insertCell(1);
    var actionCol = newRow.insertCell(2);

    //修改节点文本内容
    nameCol.innerHTML = '未命名';
    phoneCol.innerHTML = '无联系方式';
    actionCol.innerHTML = '<button onclick="editRow(this)">编辑</button><button onclick="deleteRow(this)">删除</button>';
}

//删除数据函数
function deleteRow(button){
    var row=button.parentNode.parentNode;
    console.log(row);
    row.parentNode.removeChild(row);
    
    // 删除后检查是否还有数据行
    checkTableEmpty();
}

//编辑数据函数
function editRow(button){
    console.log(button);
    var row=button.parentNode.parentNode;
    var name=row.cells[0];
    var phone=row.cells[1];

    var inputName=prompt("请输入名字：", name.innerHTML);
    // 如果用户点击取消，prompt返回null，直接返回不修改
    if (inputName === null) {
        return;
    }

    var inputPhone=prompt("请输入联系方式：", phone.innerHTML);
    // 同样检查第二个prompt
    if (inputPhone === null) {
        return;
    }

    // 只有当用户没有取消时才更新内容
    name.innerHTML=inputName;
    phone.innerHTML=inputPhone;
}

// 检查表格是否为空
function checkTableEmpty() {
    var table = document.getElementById('table');
    // 如果只有表头行（没有数据行）
    if (table.rows.length <= 1) {
        // 添加提示行
        var newRow = table.insertRow(1);
        var emptyCell = newRow.insertCell(0);
        emptyCell.colSpan = 3; // 合并3列
        emptyCell.innerHTML = '<div style="text-align: center; padding: 40px; color: #999; font-style: italic;">暂无数据，请点击"新增数据"按钮添加</div>';
        emptyCell.style.backgroundColor = '#f9f9f9';
    }
}

// 页面加载时检查表格状态
window.onload = function() {
    checkTableEmpty();
};