const spinner = document.querySelector(".spinner");
const frames = ['|','/','-','\\'];
let i = 0;

const spinInterval = setInterval(() => {
  spinner.textContent = frames[i % frames.length];
  i++;
}, 100); 

setTimeout(() => {
  clearInterval(spinInterval);
  document.getElementById('startup-screen').style.transition = "opacity 0.5s";
  document.getElementById('startup-screen').style.opacity = 0;
  setTimeout(() => {
    document.getElementById('startup-screen').style.display = 'none';
  }, 500);
}, 2000);