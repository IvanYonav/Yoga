window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');



    let hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };

    hideTabContent(1);

    let showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    };

    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;

                }

            }
        }

    });

    //timer

    let deadline = '2018-12-16';

    let getTimeRemaining = (endtime) => {
        let dateDiff = (new Date()).getTimezoneOffset() * 60 * 1000;
        let t = Date.parse(endtime) - Date.parse(new Date()) + dateDiff,
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    let timeFormat = (time) => {
        let result = time;
        if (time < 0) {
            result = '00';
        } else if (time < 10) {
            result = '0' + time;
        }
        return result;
    };

    let setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            hours.textContent = timeFormat(t.hours);
            minutes.textContent = timeFormat(t.minutes);
            seconds.textContent = timeFormat(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }

    };
    setClock('timer', deadline);

    //modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        btnDescr = document.querySelectorAll('.description-btn');

    function showModal() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = "hidden";
    }

    more.addEventListener('click', function () {
        showModal.call(this);
    });

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = "";
    });

    for (let i = 0; i < btnDescr.length; i++) {
        btnDescr[i].addEventListener('click', function () {
            showModal.call(this);
        });
    }

    //form

    let massage = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        faliure: 'Что-то пошло не так...'
    };

    let form = document.getElementsByClassName('main-form')[0],
        contactForm = document.getElementById('form'),
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    // statusMessage.style.cssText = ('color: #fff');


    function sendForm(element) {
        element.addEventListener('submit', function (event) {
            event.preventDefault();
            element.appendChild(statusMessage);
            let formData = new FormData(element),
                input = element.getElementsByTagName('input');


            function postData(data) {

                return new Promise(function (resolve, reject) {

                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');

                    request.addEventListener('readystatechange', function () {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }

                        let obj = {};
                        formData.forEach(function (value, key) {});
                        let json = JSON.stringify(obj);
                    });

                    request.send(data);
                });
            } //end postData
            postData(formData)
                .then(() => statusMessage.innerHTML = massage.loading)
                .then(() => statusMessage.innerHTML = massage.success)
                .catch(() => statusMessage.innerHTML = massage.faliure)
                .then(clearInput);

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }
        });
    }

    sendForm(form);
    sendForm(contactForm);

    //валидация по номеру телефона

    let inputPhones = document.querySelectorAll('[type = tel]');

    inputPhones.forEach(function (item) {
        item.addEventListener('input', function () {
            if (!checkPhone(item.value)) {
                item.value = item.value.slice(0, -1);
            }
        });
    });

    function checkPhone(text) {
        return /^(\+|8)\d{0,10}$/.test(text);
    }

    //слайдер

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');

        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function () {
        plusSlides(-1);
    });

    next.addEventListener('click', function () {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function (event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

    //calc
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total');

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function () {
        sum(restDays, persons, place);
    });

    function sum(days, pers, location) {
        let day = +days.value,
            people = +pers.value,
            loc = +location.options[location.selectedIndex].value;
        if (day && people) {
            totalValue.innerHTML = (day + people) * 4000 * loc;
        } else {
            totalValue.innerHTML = 0;
        }
    }

    restDays.addEventListener('change', function () {
        sum(restDays, persons, place);
    });

    place.addEventListener('change', function () {
        sum(restDays, persons, place);
    });

    let inputCounter = document.querySelectorAll('.counter-block-input');

    inputCounter.forEach(function (item) {
        item.removeAttribute('type');
        item.addEventListener('input', function () {
            if (!checkCalc(item.value)) {
                item.value = item.value.slice(0, -1);
            }
        });
    });

    function checkCalc(text) {
        return /^\d+$/.test(text);
    };

});