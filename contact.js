function openContactWindow() {

    openWindow('Contact', null, null, 400, 500)

    fetch("contact.html")
        .then(res => res.text())
        .then(html => {
            const lastWindow = document.querySelector(".window:last-child");
            lastWindow.querySelector(".content").innerHTML = html;

            const styleLink = document.createElement("link");
            styleLink.rel = "stylesheet";
            styleLink.href = "contact.css";
            document.head.appendChild(styleLink);
        });
}

const contactIcon = document.querySelector(".icon span:contains('Contact')").closest(".icon");
contactIcon.addEventListener("dblclick", openContactWindow);