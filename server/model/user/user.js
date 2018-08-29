'use strict';

var user = {
    get: function(_query, _callback) {
        var values = [];
        var where_query = '1=1';

        _query.forEach(function(e) {
            if (e.key === 'user_id') {
                where_query = util.format('%s AND U.user_id = ?', where_query);
                values.push(e.value);
            }

            if (e.key === 'email') {
                where_query = util.format('%s AND U.email = ?', where_query);
                values.push(e.value);
            }

            if (e.key === 'name') {
                where_query = util.format('%s AND U.name = ?', where_query);
                values.push(util.format(e.value));
            }
        });

        var sql = `select *
        from 
            user U
        where 
            {where_query}
        `.replace('{where_query}', where_query);

        engine.rds.row(sql, values, 'cp', _callback);
    },

    list: function(_query, _callback) {
        var values = [];
        var where_query = '1=1';

        _query.forEach(function(e) {
            if (e.key === 'user_id') {
                where_query = util.format('%s AND U.user_id = ?', where_query);
                values.push(e.value);
            }

            if (e.key === 'name') {
                where_query = util.format('%s AND U.name like ?', where_query);
                values.push(util.format('%%%s%%', e.value));
            }

            if (e.key === 'level') {
                // typeof e.value == 'object'
                // typeof(e.value) == 'object'
                where_query = util.format(
                    '%s AND U.level %s ',
                    where_query,
                    typeof e.value == 'object' ? 'in (?)' : '= ?'
                );

                values.push(e.value);
            }
        });

        var sql = `select *
            from 
                user U
            where 
                {where_query}`.replace('{where_query}', where_query);

        engine.rds.rows(sql, values, 'cp', _callback);
    },

    update: function(_set_query, _where_query, _callback) {
        var values = [];
        //var set_query = _set_query.json(' = ?,');
        var set_query = '';
        var where_query = '';

        _set_query.forEach(function(e) {
            if (set_query === '') {
                set_query = util.format('%s = ?', e.key);
                values.push(e.value);
            } else {
                set_query = util.format('%s , %s = ?', set_query, e.key);
                values.push(e.value);
            }
        });

        _where_query.forEach(function(e) {
            if (where_query === '') {
                where_query = util.format('%s = ?', e.key);
                values.push(e.value);
            } else {
                where_query = util.format('%s AND %s = ?', where_query, e.key);
                values.push(e.value);
            }
        });

        var sql = `
            UPDATE user
            SET 
                {set_query}
            where 
                {where_query}`
            .replace('{set_query}', set_query)
            .replace('{where_query}', where_query);

        engine.rds.execute(sql, values, 'cp', _callback);
    },
};

module.exports = user;
