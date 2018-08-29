global.is_debug = true;

module.exports = {
    dsn: require('./db/db'),
    session: require('./session/session'),
};
