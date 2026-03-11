let windowCount = 0;
let topZ = 100;

let windowTemplate = null;

async function loadWindowTemplate() {
    if (!windowTemplate) {
        const res = await fetch("window.html");
        const html = await res.text();

        const template = document.createElement("template");
        template.innerHTML = html.trim();

        windowTemplate = template.content.firstElementChild;
    }
}

async function openWindow(title, startLeft = null, startTop = null, width = 600, height = 380) {

    await loadWindowTemplate();

    const layer = document.getElementById("window-layer");

    const win = windowTemplate.cloneNode(true);

    win.style.width = width + "px";
    win.style.height = height + "px";

    win.style.left = startLeft !== null
        ? startLeft + "px"
        : (200 + windowCount * 25) + "px";

    win.style.top = startTop !== null
        ? startTop + "px"
        : (20 + windowCount * 25) + "px";

    win.style.zIndex = ++topZ;

    layer.appendChild(win);

    win.querySelector(".window-title").textContent = title;

    win.addEventListener("mousedown", () => {
        win.style.zIndex = ++topZ;
    });

    windowCount++;

    return win;
}

// maximize and close
document.addEventListener("click", function(e){

    if(e.target.classList.contains("close-btn")){
        e.target.closest(".window").remove()
    }

    if(e.target.classList.contains("maximize-btn")){
        const win = e.target.closest(".window")

        if(!win.classList.contains("maximized")){
            win.dataset.prevTop = win.style.top
            win.dataset.prevLeft = win.style.left
            win.dataset.prevWidth = win.style.width
            win.dataset.prevHeight = win.style.height

            win.style.top="0"
            win.style.left="0"
            win.style.width="100vw"
            win.style.height="100vh"

            win.classList.add("maximized")
        }

        else{
            win.style.top=win.dataset.prevTop
            win.style.left=win.dataset.prevLeft
            win.style.width=win.dataset.prevWidth
            win.style.height=win.dataset.prevHeight

            win.classList.remove("maximized")
        }
    }
})

// drag and move
let dragTarget = null
let offsetX = 0
let offsetY = 0
let isDragging = false

let mouseX = 0
let mouseY = 0

document.addEventListener("mousedown", function(e){
    const titleBar = e.target.closest(".titlebar")
    if(titleBar){
        dragTarget = titleBar.closest(".window")
        offsetX = e.clientX - dragTarget.offsetLeft
        offsetY = e.clientY - dragTarget.offsetTop

        dragTarget.style.zIndex = ++topZ
        isDragging = true
        mouseX = e.clientX
        mouseY = e.clientY

        requestAnimationFrame(updateDrag)
    }
})

document.addEventListener("mousemove", function(e){
    if(isDragging){
        mouseX = e.clientX
        mouseY = e.clientY
    }
})

document.addEventListener("mouseup", function(){
    isDragging = false
    dragTarget = null
})

function updateDrag(){
    if(isDragging && dragTarget){
        let newX = mouseX - offsetX
        let newY = mouseY - offsetY

        const winWidth = dragTarget.offsetWidth
        const winHeight = dragTarget.offsetHeight
        const maxX = window.innerWidth - winWidth
        const maxY = window.innerHeight - winHeight

        if(newX < 0) newX = 0
        if(newY < 0) newY = 0
        if(newX > maxX) newX = maxX
        if(newY > maxY) newY = maxY

        dragTarget.style.left = newX + "px"
        dragTarget.style.top = newY + "px"

        requestAnimationFrame(updateDrag)
    }
}

// resize
let resizeTarget = null
let startWidth = 0
let startHeight = 0
let startX = 0
let startY = 0

document.addEventListener("mousedown", function(e){
  if(e.target.classList.contains("resize-handle")){
    resizeTarget = e.target.closest(".window")
    startWidth = resizeTarget.offsetWidth
    startHeight = resizeTarget.offsetHeight
    startX = e.clientX
    startY = e.clientY
    // bring to front
    resizeTarget.style.zIndex = ++topZ
    e.preventDefault()
  }
})

document.addEventListener("mousemove", function(e){
  if(resizeTarget){
    let newWidth = startWidth + (e.clientX - startX)
    let newHeight = startHeight + (e.clientY - startY)

    if(newWidth < 200) newWidth = 200
    if(newHeight < 150) newHeight = 150

    resizeTarget.style.width = newWidth + "px"
    resizeTarget.style.height = newHeight + "px"
  }
})

document.addEventListener("mouseup", function(){
  resizeTarget = null
})