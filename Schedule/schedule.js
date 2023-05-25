////////////////////////////////////////////////////////////////load table
function loadTableFromMySQL() {
  fetch('http://192.168.71.128:8080/cloud_mini/Schedule/getSchedule.php')
    .then(response => response.json())
    .then(results => {
      let tableBody = $('#table-body');
      tableBody.empty(); // 清空表格
      
      results.forEach((result) => {
        let row = $('<tr>');
        row.append(`<td>${result.timestamp}</td>`);
        row.append(`<td>${result.status}</td>`);
        row.append(`<td>${result.c1}</td>`);
        row.append(`<td>${result.c2}</td>`);
        row.append(`<td>${result.c3}</td>`);

        if (result.status === "false" && result.c1 === "false" && result.c2 === "false" && result.c3 === "false") {
          let suspendButton = $('<button class="warning"><i class="fa fa-pause"></i></button>');
          suspendButton.click(function() {
            removeRow(row); // 透過自定義函式來暫停行
          });
          let actionContainer = $('<div class="action_container">');
          actionContainer.append(suspendButton);
          let cell = $('<td>');
          cell.append(actionContainer);
          row.append(cell);
        } else {
          let cell = $('<td>');
          row.append(cell);
        }

        tableBody.append(row); // 添加新行到表格中
      });
    })
    .catch(error => console.error(error));
}

////////////////////////////////////////////////////////////////delete function
function removeRow(row) {
  let timestamp = row.find('td:nth-child(1)').text(); // 取得該列的 timestamp
  fetch(`http://192.168.71.128:8080/cloud_mini/Schedule/deleteSchedule.php?timestamp=${timestamp}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      row.remove(); // 如果刪除成功，刪除該列
    } else {
      throw new Error('Failed to delete the row from database.'); // 若刪除失敗，拋出錯誤訊息
    }
  })
  .catch(error => console.error(error));
}

  
$(document).ready(function() {
  setInterval(loadTableFromMySQL, 1000);
});
  
