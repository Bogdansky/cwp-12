module.exports = (Sequelize, sequelize) => {
    return sequelize.define('turtles', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: Sequelize.STRING,
        color: Sequelize.STRING,
        weaponId: Sequelize.INTEGER,
        firstFavoritePizzaId: Sequelize.INTEGER,
        secondFavoritePizzaId: Sequelize.INTEGER
    });
};