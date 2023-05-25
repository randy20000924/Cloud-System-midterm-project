<?php

ini_set('display_errors','1');
error_reporting(E_ALL);

$dirPath = "/share/cloud_mini/share/";
$timestamp = date("His");
$fileName = $timestamp . ".pdf";
$filePath = $dirPath . $fileName;

$dbPath = "/share/cloud_mini/cloud_mini.db";

function InsertTimestamp($dbPath, $timestamp) {
    try {
        $db = new PDO("sqlite:$dbPath");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
        $stmt = $db->prepare("INSERT INTO `schedule`(`timestamp`) VALUES (?)");
        $stmt->execute([$timestamp]);
    
    } catch(PDOException $e) {
        http_response_code(500);
        echo "Connection failed: " . $e->getMessage();
    }
}

if($_FILES["fileUpload"]["error"] > 0) {
    echo "ERROR.\n";
} else {
    move_uploaded_file($_FILES["fileUpload"]["tmp_name"], $filePath);
    chmod($filePath, 0777); // Set the file permission to 777
    echo "File uploaded successfully.";

    InsertTimestamp($dbPath, $timestamp);

    // Save the file name to session storage
    session_start();
    $_SESSION["fileUpload"] = $fileName;
    session_write_close();
}
header("Location: http://192.168.71.128:8080/cloud_mini/Result/result.html?timestamp=$timestamp");

exit; // Make sure to exit the script after the redirection
?>
