function openContactWindow() {

    openWindow('Contact', 150, 60, 400, 500).then(win => {

        const resizeHandle = win.querySelector(".resize-handle")
        if(resizeHandle) resizeHandle.remove()

        const maxBtn = win.querySelector(".maximize-btn")
        if(maxBtn) maxBtn.remove()

        fetch("contact.html")
            .then(res => res.text())
            .then(html => {
                win.querySelector(".content").innerHTML = html

                if(!document.querySelector('link[href="contact.css"]')){
                    const styleLink = document.createElement("link")
                    styleLink.rel = "stylesheet"
                    styleLink.href = "contact.css"
                    document.head.appendChild(styleLink)
                }
            })
    })
}