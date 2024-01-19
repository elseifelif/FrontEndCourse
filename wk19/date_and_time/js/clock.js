function showTime() {
    const today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    let day = today.toLocaleDateString("tr-TR");
  
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
  
    let time = hour + ":" + min + ":" + sec + " " + day;
    document.getElementById('myClock').innerText = time;
    setTimeout(showTime, 1000);
  }
  
  function askName() {
    let name = prompt("Lütfen isminizi yazınız.");
    document.getElementById('myName').innerText = name;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    askName();
    showTime();
  });
