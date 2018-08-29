'use strict';

var rds = {
 
    update: (_table, _set_query, _where_query, _callback) => {
        var values = [];
        //var set_query = _set_query.json(' = ?,');
        var set_query = '';
        var where_query = '';

        _set_query.forEach( (e) => {
            if (set_query === '') {
                set_query = util.format('%s = ?', e.key);
                values.push(e.value);
            } else {
                set_query = util.format('%s , %s = ?', set_query, e.key);
                values.push(e.value);
            }
        });

        _where_query.forEach( (e) => {
            if (where_query === '') {
                where_query = util.format('%s = ?', e.key);
                values.push(e.value);
            } else {
                where_query = util.format('%s AND %s = ?', where_query, e.key);
                values.push(e.value);
            }
        });

        var sql = `
            UPDATE {table}
            SET 
                {set_query}
            where 
                {where_query}`
            .replace('{table}', _table)
            .replace('{set_query}', set_query)
            .replace('{where_query}', where_query);

        engine.rds.execute(sql, values, 'cp', _callback);
    },
};

module.exports = rds;
