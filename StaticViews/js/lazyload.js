let lazyLoadTimeout = null;

onInitLazyLoad();

function onInitLazyLoad() {
    if ("IntersectionObserver" in window)
        lazyLoadAuto();
    else
        lazyLoadManual();
    
    console.log("Enabled lazy-loading of images!");
}

function lazyLoadAuto() {
    console.log("Using IntersectionObserver.");

    const observer = new IntersectionObserver((entries, _) => {
        entries.forEach(o => {
            if (o.isIntersecting) {
                const image = o.target;
                image.src = image.dataset.src;
                image.classList.remove("lazy-load");
                observer.unobserve(image);
            }
        });
    });

    [].forEach.call(document.getElementsByClassName("lazy-load"), o => {
        observer.observe(o);
    });
}

function lazyLoadManual() {
    document.addEventListener("scroll", lazyLoadManualCallback);
    window.addEventListener("resize", lazyLoadManualCallback);
    window.addEventListener("orientationChange", lazyLoadManualCallback);
}

function lazyLoadManualCallback() {
    console.log("Using timeouts.");
    if(lazyLoadTimeout) {
        clearTimeout(lazyLoadTimeout);
    }

    let lazyLoadImages = document.getElementsByClassName("lazy-load");

    lazyLoadTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset;
        lazyLoadImages.forEach(o => {
            if(o.offsetTop < (window.innerHeight + scrollTop)) {
                o.src = o.dataset.src;
                o.classList.remove("lazy-load");
            }
        });

        if(lazyLoadImages.length === 0) {
            document.removeEventListener("scroll", lazyLoadManualCallback);
            window.removeEventListener("resize", lazyLoadManualCallback);
            window.removeEventListener("orientationChange", lazyLoadManualCallback);
        }
        
    }, 20);
}