module.exports = (Sequelize, sequelize) => {
    return sequelize.define('weapons', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: Sequelize.STRING,
        dps: Sequelize.INTEGER
    });
};