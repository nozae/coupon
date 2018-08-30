'use strict';

var store = {
    setStamp: function(_query, _callback) {
        var sql = `INSERT INTO stamp SET ?`;

        engine.rds.execute(sql, _query, 'cp', _callback);
    },

    setCoupon: function(_query, _callback) {
        var sql = `
					INSERT INTO coupon_config (storeId, stampId, couponPublishTerm, couponItemName, itemImgId)
					VALUES ?
				`;

        engine.rds.execute(sql, [_query], 'cp', _callback);
    },

    get: function(_query, _callback) {
        var values = [];
        var where_query = '1=1';

        _query.forEach(function(e) {
            if (e.key === 'userId') {
                where_query = util.format('%s AND S.userId = ?', where_query);
                values.push(e.value);
            }

            if (e.key === 'name') {
                where_query = util.format('%s AND S.name = ?', where_query);
                values.push(util.format(e.value));
            }
        });

        var sql = `select *
        from 
            store S
        where 
            {where_query}
        `.replace('{where_query}', where_query);

        engine.rds.row(sql, values, 'cp', _callback);
    },

    list: function(_query, _callback) {
        var values = [];
        var where_query = '1=1';

        _query.forEach(function(e) {
            if (e.key === 'storeId') {
                where_query = util.format('%s AND T.storeId = ?', where_query);
                values.push(e.value);
            }

            if (e.key === 'stampId') {
                where_query = util.format('%s AND T.stampId = ?', where_query);
                values.push(e.value);
            }
        });

        var sql = `select T.stampId, stampTerm, stampMaximum, couponId, couponPublishTerm, couponItemName, imgCategory, itemImg
            from 
							stamp T join coupon_config C join item_img I
						ON
								T.storeId = C.storeId
						AND 
								T.stampId = C.stampId
						AND 
								C.itemImgId = I.itemImgId
						AND
                {where_query}`.replace('{where_query}', where_query);

        engine.rds.rows(sql, values, 'cp', _callback);
    },

    itemImgList: function(_query, _callback) {
        var values = [];
        var where_query = '1=1';

        var sql = `SELECT itemImgId, imgCategory, itemImg
					from 
						item_img I
					where
							{where_query}`.replace('{where_query}', where_query);

        engine.rds.rows(sql, values, 'cp', _callback);
    },
};

module.exports = store;
