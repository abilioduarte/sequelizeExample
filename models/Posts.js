const {Model, DataTypes} = require('sequelize');

class Posts extends Model {
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
            },
            content: {
                type: DataTypes.STRING
            },
            published: {
                type: DataTypes.STRING
            },
            updated: {
                type: DataTypes.STRING
            }
        },{
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Users, {foreignKey: "userId", as: 'user'});
    }
}

module.exports = Posts;