if (global.is_debug === true) {
    module.exports = require('./session.local.json');
} else {
    module.exports = require('./session.production.json');
}
