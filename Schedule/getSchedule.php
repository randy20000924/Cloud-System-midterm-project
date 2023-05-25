<?php
// 允許來自 http://127.0.0.1:5500 的請求訪問資源
header("Access-Control-Allow-Origin: 192.168.71.128:8080");

// 建立與 SQLite 資料庫的連接
$db = new SQLite3('/share/cloud_mini/cloud_mini.db');

try {
  // 運行 SQLite 查詢，獲取需要的資料
  $results = $db->query('SELECT * FROM schedule');
  $data = [];

  while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
    array_push($data, $row);
  }

  // 輸出 JSON 格式的資料
  header('Content-Type: application/json');
  echo json_encode($data);

} catch(Exception $e) {
  echo "Connection failed: " . $e->getMessage();
}

// 關閉 SQLite 連線
$db->close();

?>
