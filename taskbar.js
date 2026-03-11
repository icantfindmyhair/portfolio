function updateClock(){

const now = new Date();

const options = {
timeZone: "Asia/Singapore",
hour: "2-digit",
minute: "2-digit",
second: "2-digit",
hour12: false,
};

const time = now.toLocaleTimeString([], options);

document.getElementById("clock").textContent = time;

}

setInterval(updateClock, 1000);

updateClock();
