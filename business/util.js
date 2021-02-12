var fs = require('fs');

module.exports = {
  logError: function (err, res) {
    if (err) {
      console.log(err);
      res.status(500);
      res.send({ok:false, message: err});
    }
  }
}