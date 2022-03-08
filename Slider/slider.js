function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.getElementById(totalCounter),
        current = document.getElementById(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 0;
    let offset = 0;

    function slideChangeVisual() {
        current.textContent = slideIndex + 1 < 10 ? `0${slideIndex+1}` : slideIndex + 1;
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex].style.opacity = '1';
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
    total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;
    current.textContent = slideIndex + 1 < 10 ? `0${slideIndex+1}` : slideIndex + 1;
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width;
    });
    slider.style.position = 'relative';
    const dotsIndicator = document.createElement('ol'),
        dots = [];
    dotsIndicator.classList.add('carousel-indicators');
    slider.append(dotsIndicator);
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dotsIndicator.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex + 1 == slides.length) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        slideChangeVisual();
    });
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == 0) {
            slideIndex = slides.length - 1;
        } else {
            slideIndex--;
        }
        slideChangeVisual();
    });
    dots.forEach(dot => {
        dot.addEventListener('click', event => {
            event.preventDefault();
            const slideTo = event.target.getAttribute('data-slide-to');
            offset = deleteNotDigits(width) * (slideTo);
            slideIndex = +slideTo;
            slidesField.style.transform = `translateX(-${offset}px)`;
            slideChangeVisual();
        });
    });

}
export default slider;