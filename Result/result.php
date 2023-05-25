<?php
// 允許來自 http://127.0.0.1:5500 的請求訪問資源
header("Access-Control-Allow-Origin: 192.168.71.128:8080");

// 建立與 SQLite 資料庫的連接
$dbname = "/share/cloud_mini/cloud_mini.db";
try {
  $conn = new PDO("sqlite:$dbname");
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // 運行 SQLite 查詢，獲取需要的資料
  $stmt = $conn->prepare("SELECT * FROM schedule");
  $stmt->execute();
  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

  // 輸出 JSON 格式的資料
  header('Content-Type: application/json');
  echo json_encode($data);
  
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

// 關閉資料庫連接
$conn = null;
?>
