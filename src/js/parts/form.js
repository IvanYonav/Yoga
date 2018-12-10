function form() {
    let massage = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        faliure: 'Что-то пошло не так...'
    };

    let form = document.getElementsByClassName('main-form')[0],
        contactForm = document.getElementById('form'),
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    statusMessage.style.cssText = ('color: #fff');


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
            }
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
}

export default form;