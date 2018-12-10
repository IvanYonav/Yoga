function timer() {
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
}
export default timer;