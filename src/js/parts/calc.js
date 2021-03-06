let calc = () => {
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total');

    totalValue.innerHTML = 0;

    persons.addEventListener('change', () => {
        sum(restDays, persons, place);
    });

    let sum = (days, pers, location) => {
        let day = +days.value,
            people = +pers.value,
            loc = +location.options[location.selectedIndex].value;
        if (day && people) {
            totalValue.innerHTML = (day + people) * 4000 * loc;
        } else {
            totalValue.innerHTML = 0;
        }
    };

    restDays.addEventListener('change', () => {
        sum(restDays, persons, place);
    });

    place.addEventListener('change', () => {
        sum(restDays, persons, place);
    });

    let inputCounter = document.querySelectorAll('.counter-block-input');

    inputCounter.forEach((item) => {
        item.removeAttribute('type');
        item.addEventListener('input', () => {
            if (!checkCalc(item.value)) {
                item.value = item.value.slice(0, -1);
            }
        });
    });

    let checkCalc = (text) => /^\d+$/.test(text);
};
export default calc;

