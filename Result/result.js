var timestamp;

function init() {
  var urlParams = new URLSearchParams(window.location.search);
  timestamp = urlParams.get('timestamp');
  setInterval(loadTimestampFromMySQL, 1000);
}

function loadTimestampFromMySQL() {
  fetch('http://192.168.71.128:8080/cloud_mini/Result/result.php')
    .then(response => response.json())
    .then(results => {
      results.forEach((result) => {
        if (result.timestamp.padStart(6, '0') == timestamp && result.status != "false") {
          var pw = document.querySelector(".neonText");
          pw.innerHTML = result.status;
        }else if(result.timestamp.padStart(6, '0') == timestamp && result.c1 == "true"&& result.c2 == "true"&& result.c3 == "true"){
          var pw = document.querySelector(".neonText");
          pw.innerHTML = "Too hard for me..";
        }
      });
    })
    .catch(error => console.error(error));
}

$(document).ready(function() {
  init();
});
