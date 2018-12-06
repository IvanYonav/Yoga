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

    function showModal () {
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

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessage);


        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = massage.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = massage.success;
            } else {
                statusMessage.innerHTML = massage.faliure;
            }
        });
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });

    //contact form

    let contactForm = document.getElementById('form'),
        contactInput = contactForm.getElementsByClassName('form-Input'),
        inputPhones = document.querySelectorAll('[type = tel]');

    inputPhones.forEach(function (item) {
        item.addEventListener('input', function () {
            if (!checkPhone(item.value)) {
                item.value = item.value.slice(0, -1);
            }

        });

    });


    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        contactForm.appendChild(statusMessage);
        statusMessage.style.cssText = ('color: #c78030');

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');

        let formData = new FormData(contactForm);

        let obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
        });

        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = massage.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = massage.success;
            } else {
                statusMessage.innerHTML = massage.faliure;
            }
        });
        for (let i = 0; i < contactInput.length; i++) {
            contactInput[i].value = '';
        }
    });

    function checkPhone(text) {
        return /^(\+|8)\d{0,10}$/.test(text);
    }

});