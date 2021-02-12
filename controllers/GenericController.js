module.exports = {
    findAll: function(model) {
        const entity = model.findAll();
        return entity;
    },
    findById: function(model, _id) {
        const entity = model.findAll({
            where: {
              id: _id
            }
        });
        return entity;
    },
    deleteById: function(model, _id) {
        const entity = model.destroy({
            where: {
              id: _id
            }
        });
        return entity;
    },
    validateEmail: function(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}
