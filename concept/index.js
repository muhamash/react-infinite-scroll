const circle = document.getElementById("circle");

const observer = new IntersectionObserver((items) => {
    const trackingInfo = items[0];

    console.log(items)
    if (trackingInfo.isIntersecting) {
        console.log("Circle is visible");
        // observer.disconnect();
    } else {
        console.log("Circle is not visible");
    }
});

observer.observe( circle );
console.log(observer, circle)