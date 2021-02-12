module.exports = {
    dialect: 'mssql',
    host: '10.162.213.13',
    username: 'scpadmin',
    password: 'scpadmin',
    database: 'L2BRK',
    define : {
        timestamps: false
    },
    pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
    }
};
