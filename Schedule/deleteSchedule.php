<?php
// 允許所有來自網域的請求訪問資源
header("Access-Control-Allow-Origin: 192.168.71.128:8080");

// 建立與 SQLite 資料庫的連接
$db = new SQLite3('/share/cloud_mini/cloud_mini.db');

// 檢查連線是否成功
if (!$db) {
    // 設置 HTTP 狀態碼為 500 Internal Server Error，表示連接資料庫時發生錯誤
    http_response_code(500);
    echo "Connection failed: " . $db->lastErrorMsg();
    exit;
}

try {
    // 從 HTTP DELETE 請求中取得要刪除的資料的 timestamp
    $timestamp = $_GET["timestamp"];

    // 運行 SQLite 查詢，刪除該列資料
    $stmt = $db->prepare("DELETE FROM schedule WHERE timestamp = :timestamp");
    $stmt->bindValue(':timestamp', $timestamp, SQLITE3_TEXT);
    $stmt->execute();

    // 設置 HTTP 狀態碼為 204 No Content，表示已成功刪除資料
    http_response_code(204);

} catch(Exception $e) {
    // 設置 HTTP 狀態碼為 500 Internal Server Error，表示刪除資料時發生錯誤
    http_response_code(500);
    echo "Connection failed: " . $e->getMessage();
}

// 關閉 SQLite 連線
$db->close();

?>