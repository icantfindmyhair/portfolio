let windowCount = 0
let topZ = 100

function openWindow(title, startLeft = null, startTop = null, width = 600, height = 380){
    fetch("window.html")
    .then(res => res.text())
    .then(html => {
        const layer = document.getElementById("window-layer")
        const wrapper = document.createElement("div")
        wrapper.innerHTML = html
        const win = wrapper.firstElementChild

        win.style.width = width + "px"
        win.style.height = height + "px"

        win.style.left = startLeft !== null ? startLeft + "px" : (200 + windowCount*25) + "px"
        win.style.top  = startTop  !== null ? startTop + "px"  : (120 + windowCount*25) + "px"

        win.style.zIndex = ++topZ
        layer.appendChild(win)

        win.querySelector(".window-title").textContent = title

        win.addEventListener("mousedown", () => {
            win.style.zIndex = ++topZ
        })

        windowCount++
    })
}