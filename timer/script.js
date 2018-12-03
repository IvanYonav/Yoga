let timeBlock = document.querySelector('.block');

displayTime(timeBlock);
timeBlock.classList.add('time-style');

function displayTime(element) {
    let time = new Date(),
        h = time.getHours(),
        m = time.getMinutes(),
        s = time.getSeconds();

    function timeFormat(time) {
        return (time < 10) ? '0' + time : time;
    }
    element.textContent = timeFormat(h) + ' : ' + timeFormat(m) + ' : ' + timeFormat(s);
    setTimeout(displayTime, 1000, element);
}
