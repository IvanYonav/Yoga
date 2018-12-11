let form = () => {
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


    let sendForm = (element) => {
        element.addEventListener('submit', (event) => {
            event.preventDefault();
            element.appendChild(statusMessage);
            let formData = new FormData(element),
                input = element.getElementsByTagName('input');


            let postData = (data) => {

                return new Promise((resolve, reject) => {

                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');

                    request.addEventListener('readystatechange', () => {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }

                        let obj = {};
                        formData.forEach((value, key) => { });
                        let json = JSON.stringify(obj);
                    });

                    request.send(data);
                });
            };
            postData(formData)
                .then(() => statusMessage.innerHTML = massage.loading)
                .then(() => statusMessage.innerHTML = massage.success)
                .catch(() => statusMessage.innerHTML = massage.faliure)
                .then(clearInput);


            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                    setTimeout(() => {
                        statusMessage.innerHTML = "";
                    }, 3000);
                }
            }

        });
    };

    sendForm(form);
    sendForm(contactForm);

    let inputPhones = document.querySelectorAll('[type = tel]');

    inputPhones.forEach((item) => {
        item.addEventListener('input', () => {
            if (!checkPhone(item.value)) {
                item.value = item.value.slice(0, -1);
            }
        });
    });

    let checkPhone = (text) => /^(\+|8)\d{0,10}$/.test(text);

};


export default form;