if (global.is_debug === true) {
    module.exports = require('./db.local.json');
} else {
    module.exports = require('./db.production.json');
}
