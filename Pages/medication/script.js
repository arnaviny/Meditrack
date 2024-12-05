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
        const leftValue = pickerLeft.slides[pickerLeft.activeIndex].textContent;
        const rightValue = pickerRight.slides[pickerRight.activeIndex].textContent;
        const amountPresentor = document.getElementById('amount-presentor');

        amountPresentor.textContent = `${leftValue}.${rightValue}`;
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

    const manualLeft = document.getElementById('manual-input-left');
    const manualRight = document.getElementById('manual-input-right');

    manualRight.addEventListener("input", () => {
        const valueRight = manualRight.valueAsNumber;
        if (valueRight >= 0 && valueRight <= 99) {
            pickerRight.slideToLoop(valueRight + 1);
        }
    });

    manualLeft.addEventListener("input", () => {
        const valueLeft = manualLeft.valueAsNumber;
        if (valueLeft >= 0 && valueLeft <= 99) {
            pickerLeft.slideToLoop(valueLeft);
        }
    });

    const addButton = document.getElementById('mdn-submit-btn');
    addButton.addEventListener('click', (event) => {
        event.preventDefault();

        const medicineName = mdnInput.value;
        const dosage = document.getElementById('amount-presentor').textContent;
        const unit = document.getElementById('unit-type').value;

        if (!medicineName) {
            alert(`Please select or enter medicine name`);
            return;
        }

        createHistoryItem(medicineName, dosage, unit);
    });

    function createHistoryItem(medicineName, dosage, unit, timestamp = null) {
        const historyContainer = document.getElementById('mdn-history-container');
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';

        const textElement = document.createElement('p');
        textElement.textContent = `${medicineName}: ${dosage}${unit}`;

        const timestampElement = document.createElement('span');
        timestampElement.className = 'timestamp-text';
        timestampElement.textContent = timestamp || getCurrentTimestamp();

        function getCurrentTimestamp() {
            const currentTime = new Date();
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            };
            return currentTime.toLocaleString('en-US', options);
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-button';

        deleteButton.addEventListener('click', () => {
            const confirmDelete = confirm('Delete Item?');
            if (confirmDelete) {
                historyItem.remove();
            }
        });

        historyItem.appendChild(textElement);
        historyItem.appendChild(timestampElement);
        historyItem.appendChild(deleteButton);

        historyContainer.appendChild(historyItem);
    }

    const updateButton = document.getElementById('save-history-btn');
    updateButton.addEventListener('click', () => {
        const historyItems = document.querySelectorAll('.history-item');
        const historyData = [];

        historyItems.forEach(item => {
            const text = item.querySelector('p').textContent;
            const timestamp = item.querySelector('.timestamp-text').textContent;

            const [medicineName, rest] = text.split(':');
            const [dosage, unit] = rest.trim().split(/(?<=\d)(?=[a-zA-Z])/);

            historyData.push({
                medicineName: medicineName.trim(),
                dosage: dosage.trim(),
                unit: unit.trim(),
                timestamp: timestamp.trim(),
            });
        });

        const historyJSON = JSON.stringify(historyData);
        localStorage.setItem('medicineHistory', historyJSON);

        console.log('Saved to local storage:', historyJSON);
        alert('History has been updated and saved!');
    });

    const loadHistory = () => {
        const storedData = localStorage.getItem('medicineHistory');
        if (storedData) {
            const historyData = JSON.parse(storedData);

            historyData.forEach(({ medicineName, dosage, unit, timestamp }) => {
                createHistoryItem(medicineName, dosage, unit, timestamp);
            });
        }
    };

    loadHistory();
});
