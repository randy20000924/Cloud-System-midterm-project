let c1_cpu_prev = 0;
let c1_mem_prev = 0;
let c2_cpu_prev = 0;
let c2_mem_prev = 0;
let c3_cpu_prev = 0;
let c3_mem_prev = 0;

function loadTableFromMySQL() {
  fetch('http://192.168.71.128:8080/cloud_mini/Userate/getResource.php')
    .then(response => response.json())
    .then(results => {
      let allResults = results; // Assign the results to the variable

      const circles = document.querySelectorAll('.progress-ring__circle');

      circles.forEach((circle) => {
        const radiusCircle = circle.r.baseVal.value; 
        const circumference = 2 * Math.PI * radiusCircle; 
        const span = circle.closest('div').querySelector('span');

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        function setProgress(circleSpan, stopProgress, time, prevValue) {
          var change = circleSpan;
          var time = Math.round(time * 1000 / 100);
          let percent;
          if(stopProgress >= prevValue){
            percent = prevValue;
          }else{
            percent = 0;
          }
          console.log("percent:"+percent)
          let start = prevValue; // use prevValue as start value if it's not undefined
          change.innerHTML = start + "%";
          let interval = setInterval(() => {         
            if (percent == stopProgress) {
              const offset = circumference - percent / 100 * circumference;
              circle.style.strokeDashoffset = offset;
              clearInterval(interval);
            } else {
              const offset = circumference - percent / 100 * circumference;
              circle.style.strokeDashoffset = offset;
              change.innerHTML = stopProgress + "%";
              clearInterval(interval);
            }
            percent++;
          }, time);
        }


        if (circle.closest('.circle1')) {
          setProgress(span, allResults[0].cpu, 2, c1_cpu_prev);
        }
        else if (circle.closest('.circle2')) {
          setProgress(span, allResults[0].mem, 2, c1_mem_prev);
        }
        else if (circle.closest('.circle3')) {
          setProgress(span, allResults[1].cpu, 2, c2_cpu_prev);
        }
        else if (circle.closest('.circle4')) {
          setProgress(span, allResults[1].mem, 2, c2_mem_prev);
        }
        else if (circle.closest('.circle5')) {
          setProgress(span, allResults[2].cpu, 2, c3_cpu_prev);
        }
        else if (circle.closest('.circle6')) {
          setProgress(span, allResults[2].mem, 2, c3_mem_prev);
        }
        c1_cpu_prev = allResults[0].cpu;
        c1_mem_prev = allResults[0].mem;
        c2_cpu_prev = allResults[1].cpu;
        c2_mem_prev = allResults[1].mem;
        c3_cpu_prev = allResults[2].cpu;
        c3_mem_prev = allResults[2].mem;
      });
    })
    .catch(error => console.error(error));

}


$(document).ready(function() {
    loadTableFromMySQL()
    setInterval(loadTableFromMySQL, 5000);
});

