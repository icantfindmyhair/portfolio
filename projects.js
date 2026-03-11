function openProjectsWindow() {
    openWindow("Projects", 600, 150, 700, 400);

    fetch("projects.html")
      .then(res => res.text())
      .then(html => {
        const lastWindow = document.querySelector(".window:last-child");
        lastWindow.querySelector(".content").innerHTML = html;

        if(!document.querySelector('link[href="projects.css"]')) {
          const styleLink = document.createElement("link");
          styleLink.rel = "stylesheet";
          styleLink.href = "projects.css";
          document.head.appendChild(styleLink);
        }
      });
}

function openProjectWindow(projectName) {
    openWindow(projectName, null, null, 600, 550).then(win => {
      cleanedName = projectName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        fetch(`projects/${cleanedName}.html`)
          .then(res => res.text())
          .then(html => {
            win.querySelector(".content").innerHTML = html;
          });
    });
}