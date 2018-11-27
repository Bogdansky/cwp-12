const Turtle = require('./turtle');
const Weapon = require('./weapon');
const Pizza = require('./pizza');

module.exports = (Sequelize, config) => {
    const sequelize = new Sequelize('sequelize','root','55911955',config);

    const turtles = Turtle(Sequelize, sequelize);
    const weapons = Weapon(Sequelize, sequelize);
    const pizzas = Pizza(Sequelize, sequelize);

    synchronizeDB([turtles,weapons,pizzas]);

    // TODO: создание связей между таблицами

    weapons.belongsTo(turtles, {as:'weapon'});
    turtles.hasOne(pizzas,{as:'FirstFavoritePizza',foreignKey: 'firstFavoritePizzaId'});
    turtles.hasOne(pizzas,{as:'secondFavoritePizza',foreignKey: 'secondFavoritePizzaId'});
    pizzas.belongsTo(turtles);

    return {
        turtles,
        weapons,
        pizzas,

        sequelize: sequelize,
        Sequelize: Sequelize,
    };
};

function synchronizeDB(tables){
    tables.forEach((table) => {
        table.sync({force:true});
    })
}