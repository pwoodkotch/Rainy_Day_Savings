const hbs = require("express-handlebars")

const rainy = hbs.registerHelper('rainy', function(name, options) {
    if(name != "For a Rainy Day") {
        return options.fn(this);
    }
    return options.inverse(this);
});

  module.exports = rainy;