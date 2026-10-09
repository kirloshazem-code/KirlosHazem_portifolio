document.addEventListener("DOMContentLoaded", () => {

    const images = document.querySelectorAll(".gallery-image");
    const viewer = document.getElementById("imageViewer");
    const viewerImage = document.getElementById("viewerImage");
    const viewerClose = document.getElementById("viewerClose");

    images.forEach(image => {

        image.addEventListener("click", () => {

            viewerImage.src = image.src;
            viewer.classList.add("active");

        });

    });


    viewerClose.addEventListener("click", () => {

        viewer.classList.remove("active");

    });


    viewer.addEventListener("click", (e) => {

        if (e.target === viewer) {
            viewer.classList.remove("active");
        }

    });


    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {
            viewer.classList.remove("active");
        }

    });

});