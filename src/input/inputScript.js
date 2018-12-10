
let age = document.getElementById('age');

age.value = 30;

function showUser(surname, name) {
    console.log(this);
    alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
}

showUser.call(age,'Назаренко', 'Иван');
