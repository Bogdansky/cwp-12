module.exports = (Sequelize, sequelize) => {
    return sequelize.define('pizzas', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        calories: Sequelize.DOUBLE
    });
};