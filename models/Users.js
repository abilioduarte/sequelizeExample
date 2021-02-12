const {Model, DataTypes} = require('sequelize');

class Users extends Model {
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true
            },
            displayName: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            image: {
                type: DataTypes.STRING
            }
        },{
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Posts, {foreignKey: "userId", as: 'post'});
    }
}

module.exports = Users;