const Turtle = require('./turtle');
const Weapon = require('./weapon');
const Pizza = require('./pizza');

module.exports = (Sequelize, config) => {
    const sequelize = new Sequelize('sequelize','root','55911955',config);

    sequelize.authenticate().then(() => {
		console.log('Success initialization');
	}).catch((err) => {
		console.log(`Error connect ${err}`);
    });

    const turtles = Turtle(Sequelize, sequelize);
    const weapons = Weapon(Sequelize, sequelize);
    const pizzas = Pizza(Sequelize, sequelize);

    // TODO: создание связей между таблицами
	turtles.belongsTo(pizzas, {
		foreignKey: 'firstFavouritePizzaId',
		as: 'firstFavouritePizza'
	});

	turtles.belongsTo(pizzas, {
		foreignKey: 'secondFavouritePizzaId',
		as: 'secondFavouritePizza'
	});

	turtles.belongsTo(weapons, {
		foreignKey: 'weaponId',
		as: 'weapon'
	});

    return {
        turtles,
        weapons,
        pizzas,

        sequelize: sequelize,
        Sequelize: Sequelize,
    };
};