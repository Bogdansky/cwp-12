const Sequelize = require('sequelize');
const config = require('./config/config.json');
const db = require('./models')(Sequelize, config);
const initTurtles = require('./turtles.json');
const initPizzas = require('./pizzas.json');
const initWeapon = require('./weapons.json');
const op = Sequelize.Op;

getLab();

async function getLab(){
    await db.sequelize.sync({force:true}).then(() => {
        console.log('Synchronization is over');
    });
    await fillTables();
    //await getAllTurtles();
    //await getFavoritePizza();
    //await myCreation();
    await updateFatPizza();
    await countOfFastestWeapon();
    //await findFirstPizza();
    //await addPizzaToMe();
}

//0. Заполним таблицы
async function fillTables(){
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
async function getAllTurtles(){
    let result = await db.turtles.findAll();
    console.log('Черепахи');
    result.forEach(turtle => {
        console.log(turtle.name);
    })
}
//3. Выведем все пиццы отмеченные как любимые без повторов
async function getFavoritePizza() {
    (await db.turtles.findAll({
            include: [{
                model: db.pizzas,
                as: 'firstFavouritePizza'
            }]
        }).then(()=>{
            console.log('Search success')
        })).forEach((v) => {
            let obj = v.dataValues.firstFavouritePizza.dataValues;
            console.log(`for ${v.dataValues.name} => id = ${obj.id}, name = ${obj.name}`);
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
    db.pizzas.update({
        description: ' SUPER FAT!'
    }, {
        where: {
            calories: {
                [op.gt]: 3000
            }
        }
    }).then(result => {
        console.log(`Updated! ${result}`);
    }).catch(error => {
        console.log(error.message);
    });
}

//6. Запросим число оружий с dps больше 100
function countOfFastestWeapon(){
    db.weapons.find({
        where: {
            dps: {
                [op.gt]: 100
            }
        }
    }).then(result => {
        console.log(`Count of fast weapon is ${result}`);
    }).catch(error => {
        console.log(error.message);
    });
}

//7. Найдем пиццу с id равным 1
function findFirstPizza() {
    /* db.pizza.findById(1).then(pizza => {
        console.log(`Pizza with id what equals 1: ${pizza}`);
    }).catch(error => {
        console.log(error.message);
    }); */
    db.turtles.findAll({
		include: [{
			model: db.pizzas,
			as: 'firstFavouritePizza'
		}]
	}).then(results => {
        results.forEach(turtle => {
            let obj = turtle.dataValues.firstFavouritePizza.dataValues;
            console.log(`for ${turtle.dataValues.name} => id = ${obj.id}, name = ${obj.name}`);
        })
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
        console.log(`Updated! ${result}`);
    }).catch(error => {
        console.log(error.message);
    });
}