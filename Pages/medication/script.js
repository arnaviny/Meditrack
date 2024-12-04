
document.addEventListener('DOMContentLoaded', () => {

    const mdnInput = document.getElementById("mdn-input");
const mdnName = document.getElementById("mdn-name");

mdnInput.onfocus = function () {
    mdnName.style.display = 'block';
    mdnInput.style.borderRadius = "5px 5px 0 0";  
};

for (let option of mdnName.options) {
    option.onclick = function () {
        mdnInput.value = option.value;
        mdnName.style.display = 'none';
        mdnInput.style.borderRadius = "5px";
    };
}

mdnInput.oninput = function () {
    currentFocus = -1;
    const text = mdnInput.value.toUpperCase();
    for (let option of mdnName.options) {
        if (option.value.toUpperCase().startsWith(text)) {
            option.style.display = "block";
        } else {
            option.style.display = "none";
        }
    }
};

let currentFocus = -1;
mdnInput.onkeydown = function (e) {
    if (e.keyCode == 40) {
        currentFocus++;
        addActive(mdnName.options);
    } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(mdnName.options);
    } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
            if (mdnName.options) mdnName.options[currentFocus].click();
        }
    }
};

function addActive(options) {
    if (!options) return false;
    removeActive(options);
    if (currentFocus >= options.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (options.length - 1);
    options[currentFocus].classList.add("active");
}

function removeActive(options) {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("active");
    }
}


    const populatePicker = (selector, start, end, pad = false) => {
        const wrapper = document.querySelector(`${selector} .swiper-wrapper`);
        for (let i = start; i <= end; i++) {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.textContent = pad ? String(i).padStart(2, '0') : i; 
            wrapper.appendChild(slide);
        }
    };

    populatePicker('.picker-left', 1, 99);
    populatePicker('.picker-right', 0, 99, true);

    const pickerLeft = new Swiper('.picker-left', {
        direction: 'vertical',
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        spaceBetween: 20,
    });

    const pickerRight = new Swiper('.picker-right', {
        direction: 'vertical',
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        spaceBetween: 20,
    });

    const updateAmountPresentor = () => {
        const leftValue = pickerLeft.slides[pickerLeft.activeIndex].textContent
        const rightValue = pickerRight.slides[pickerRight.activeIndex].textContent
        const amountPresentor = document.getElementById('amount-presentor');

        amountPresentor.textContent = `${leftValue} . ${rightValue}`

    }

    pickerLeft.on('slideChange', updateAmountPresentor);
    pickerRight.on('slideChange', updateAmountPresentor);



    const incrementButton = document.querySelector('.unit-button-container button:nth-child(2)');
    const decrementButton = document.querySelector('.unit-button-container button:nth-child(1)');

    incrementButton.addEventListener('click', () => {
        pickerRight.slideNext();
    });

    decrementButton.addEventListener('click', () => {
        pickerRight.slidePrev();
    });

    const manualLeft = document.getElementById('manual-input-left')
    const manualRight = document.getElementById('manual-input-right')

    manualRight.addEventListener("input", () => {
        const valueRight = manualRight.valueAsNumber;
        if (valueRight >= 0 && valueRight <= 99) {
            pickerRight.slideToLoop(valueRight + 1);

        }
        valueRight.blur();
    });

    manualLeft.addEventListener("input", () => {
        const valueLeft = manualLeft.valueAsNumber;
        if (valueLeft >= 0 && valueLeft <= 99) {
            pickerLeft.slideToLoop(valueLeft);
        }
        valueLeft.blur();
    });

const addButton = document.getElementById('mdn-submit-btn')
const mdnDiv = document.createElement('div')
mdnDiv.innerHTML = ``
document.body.appendChild(mdnDiv)

});