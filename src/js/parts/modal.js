function modal() {
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
}
export default modal;