const Turtle = require('./turtle');
const Weapon = require('./weapon');
const Pizza = require('./pizza');

module.exports = (Sequelize, config) => {
    const sequelize = new Sequelize('sequelize','root','5591',config);

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
		foreignKey: 'firstFavoritePizzaId',
		as: 'firstFavoritePizza'
	});

	turtles.belongsTo(pizzas, {
		foreignKey: 'secondFavoritePizzaId',
		as: 'secondFavoritePizza'
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