var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

app.use(bodyParser.json());

/* 쿠폰 아이템 이미지 가져오기 */
router.get('/getitemimg', (req, res) => {
    let query = [{ key: 'itemImgId', value: 'itemImgId' }];
    model.store.store.itemImgList(query, (err, r) => {
        if (is_empty(r)) {
            return res.json({
                isErr: true,
                msg: '아이템 이미지 정보를 찾지 못했습니다.',
                data: null,
            });
        }

        let itemImgList = [];
        for (let i = 0; i < r.length; i++) {
            let category = itemImgList.find(item => {
                return item.imgCategory === r[i].imgCategory;
            });

            if (is_empty(category)) {
                category = {
                    imgCategory: r[i].imgCategory,
                    imgList: [],
                };
                itemImgList.push(category);
            }

            let item = {
                itemImgId: r[i].itemImgId,
                itemImg: r[i].itemImg,
            };
            category.imgList.push(item);
        }

        return res.json({
            isErr: false,
            msg: '아이템 이미지 정보를 찾았습니다.',
            data: itemImgList,
        });
    });
});

/* 스탬프 정보 가져오기 */
router.post('/getinfo', (req, res) => {
    let query = [{ key: 'storeId', value: req.body.storeId }];
    model.store.store.list(query, (err, r) => {
        let stampList = [];
        const setData = stamp => {
            let stampObj = stampList.find(listItem => {
                return listItem.stampId === stamp.stampId;
            });

            if (is_empty(stampObj)) {
                stampObj = {
                    stampId: stamp.stampId,
                    stampTerm: stamp.stampTerm,
                    stampMaximum: stamp.stampMaximum,
                    couponConfig: [],
                };
                stampList.push(stampObj);
            }
            stampObj.couponConfig.push({
                couponId: stamp.couponId,
                couponPublishTerm: stamp.couponPublishTerm,
                couponItemName: stamp.couponItemName,
                imgCategory: stamp.imgCategory,
                itemImg: stamp.itemImg,
            });
            return stampList;
        };

        for (let i = 0; i < r.length; i++) {
            setData(r[i]);
        }

        if (is_empty(stampList)) {
            return res.json({
                isErr: true,
                msg: '스탬프 정보를 찾지 못했습니다.',
                data: null,
            });
        }

        return res.json({
            isErr: false,
            msg: '스토어정보를 가져왔습니다.',
            data: stampList,
        });
    });
});

/* 스탬프 저장하기 */
router.post('/setstamp', (req, res) => {
    console.log(req.body.stampInfo.couponConfig);
    return res.json({
        isErr: false,
        msg: '스탬프 정보를 저장했습니다.',
        data: req.body,
    });
});

module.exports = router;
