window.addEventListener('scroll', function(e) {
    if (this.scrollY > document.getElementById('header-bar').offsetHeight) {
        document.getElementById('navigate-bar').classList.add('sticky-navigate-bar');
    } else {
        document.getElementById('navigate-bar').classList.remove('sticky-navigate-bar');
    }
});

window.addEventListener('resize', (e) => {
    document.getElementById('carousel-nav').style.transform = '';
});

const containerOffset = document.querySelector('.carousel-mid').scrollWidth;
document.getElementById('carousel-left-btn').addEventListener('click', e => {
    var element = document.getElementById('carousel-nav');
    var container = document.querySelector('.carousel-mid');
    var x = parseFloat(element.style.transform.replace(/[^\d.-]/g, ''));
    if (container.scrollWidth - 40 <= container.clientWidth) {
        element.style.transform = `translateX(-${containerOffset - container.clientWidth}px)`;
    } else if (isNaN(x)) {
        element.style.transform = 'translateX(-40px)';
    } else {
        element.style.transform = `translateX(${x - 40}px)`;
    }
});

document.getElementById('carousel-right-btn').addEventListener('click', e => {
    var element = document.getElementById('carousel-nav');
    var x = parseFloat(element.style.transform.replace(/[^\d.-]/g, ''));
    if (x + 40 >= 0) {
        element.style.transform = '';
    } else {
        element.style.transform = `translateX(${x + 40}px)`;
    }
});