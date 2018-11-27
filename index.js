const Sequelize = require('sequelize');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);

const turtles = [
    {
        'name':'leonardo',
        'color':'blue',
        'weaponId':,
        'firstFavoritePizzaId':,
        'secondFavoritePizzaId':,
    },
    {
        'name':'leonardo',
        'color':'blue',
        'weaponId':,
        'firstFavoritePizzaId':,
        'secondFavoritePizzaId':,
    },
    {
        'name':'leonardo',
        'color':'blue',
        'weaponId':,
        'firstFavoritePizzaId':,
        'secondFavoritePizzaId':,
    },
    {
        'name':'leonardo',
        'color':'blue',
        'weaponId':,
        'firstFavoritePizzaId':,
        'secondFavoritePizzaId':,
    }
]

//0. Заполним таблицы
function fillTables(){

}

//1. Выведем всех черепашек-ниндзя
function getAllTurtles(){
    db.turtles.findAll().forEach((turtle)=>{

    });
}
//2. Выведем всех черепашек-ниндзя у кого любимая пицца "Mozzarella"
//3. Выведем все пиццы отмеченные как любимые без повторов
//4. Создадим пятую черепашку с вашим именем и любимым цветом. Незабываем про оружие
//5. Обновим все пиццы с количеством калорий больше 3000 добавив к описанию "SUPER FAT!"
//6. Запросим число оружий с dps больше 100
//7. Найдем пиццу с id равным 1
//8. Добавим пятой черепашке любимую пиццу через объект черепахи