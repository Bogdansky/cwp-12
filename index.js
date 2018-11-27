const Sequelize = require('sequelize');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);
const initTurtles = require('./turtles.json');
const initPizzas = require('./pizzas.json');
const initWeapon = require('./weapons.json');
const op = Sequelize.Op;

getLab();

async function getLab(){
    await fillTables();
    await getAllTurtles();
    await getFavoritePizza();
    await myCreation();
    await updateFatPizza();
    await countOfFastestWeapon();
    await findFirstPizza();
    await addPizzaToMe();
}

//0. Заполним таблицы
async function fillTables(){
    await db.sequelize.sync({force:true}).then(() => {
        console.log('Synchronization is over');
    });
    await fillPizza();
    await fillWeapon();
    await fillTurtles();
}

function fillTurtles(){
    let creates = [];
    initTurtles.forEach(turtle => {
        creates.push(db.turtles.create(turtle));
    });
    Promise.all(creates).then(() => {
        console.log('There are turtles!');
    }).catch(error => {
        console.log(error.message);
    })
}

function fillWeapon(){
    let creates = [];
    initWeapon.forEach(weapon => {
        creates.push(db.weapons.create(weapon));
    });
    Promise.all(creates).then(() => {
        console.log('There are weapons!');
    }).catch(error => {
        console.log(error.message);
    })
}

function fillPizza(){
    let creates = [];
    initPizzas.forEach(pizza => {
        creates.push(db.pizzas.create(pizza));
    })
    Promise.all(creates).then(() => {
        console.log('There are pizzas!');
    }).catch(error => {
        console.log(error.message);
    })
}

function fillTurtles(){
    let creates = [];
    initTurtles.forEach(turtle => {
        creates.push(db.turtles.create(turtle));
    });
    Promise.all(creates).then(() => {
        console.log('There are turtles!');
    }).catch(error => {
        console.log(error.message);
    })
}

//1. Выведем всех черепашек-ниндзя
function getAllTurtles(){
    db.turtles.findAll().then(turtles => {
        turtles.forEach(turtle => {
            console.log()
        })
    }).catch(error => {
        console.log(error.message);
    })
}
//2. Выведем всех черепашек-ниндзя у кого любимая пицца "Mozzarella"
//3. Выведем все пиццы отмеченные как любимые без повторов
function getFavoritePizza(){
    db.pizzas.findAll({include: [{
        model: turtles,
        where: {
            firstFavoritePizzaId: id,
            [op.or]: {
                secondFavoritePizzaId: id
            } 
        }
    }]}
    ).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error.message);
    })
}
//4. Создадим пятую черепашку с вашим именем и любимым цветом. Незабываем про оружие
function myCreation(){
    db.turtles.create({
        name: 'Bogdasha',
        color: 'Black',
        weaponId: 1
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error.message);
    });
}
//5. Обновим все пиццы с количеством калорий больше 3000 добавив к описанию "SUPER FAT!"
function updateFatPizza(){
    dp.pizza.update({
        description: description+' SUPER FAT!'
    }, {
        where: {
            calories: {
                [op.gt]: 3000
            }
        }
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error.message);
    });
}

//6. Запросим число оружий с dps больше 100
function countOfFastestWeapon(){
    db.weapons.findAndCountAll({
        where: {
            dps: {
                [op.gt]: 100
            }
        }
    }).then(result => {
        console.log(`Count of fast weapon is ${result.count}`);
    }).catch(error => {
        console.log(error.message);
    });
}

//7. Найдем пиццу с id равным 1
function findFirstPizza() {
    db.pizza.findById(1).then(pizza => {
        console.log(`Pizza with id what equals 1: ${pizza}`);
    }).catch(error => {
        console.log(error.message);
    });
}
//8. Добавим пятой черепашке любимую пиццу через объект черепахи
function addPizzaToMe(){
    db.turtles.update({
        firstFavoritePizzaId: 1
    },{
        where: {
            name: 'Bogdasha'
        }
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error.message);
    });
}