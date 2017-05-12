var express = require('express');
var router = express.Router();

var marketingService = require('../server/service/marketingService.js');
var quanService = require('../server/service/quanService.js');
var customerService = require('../server/service/customerService.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.redirect('/quan/invite/590ac16bd4b6571d3848d3ba');
});

router.get('/invite/:id', function(req, res, next) {

    var id = req.params.id;
    var tel = (req.cookies.tel) || "";
    quanService.getByTelAndMarketingId(tel, id).then(function(quan) {
        if (quan) {
            res.redirect('../receive/' + quan.customer._id.toString());
        } else {
            console.log(id, 111)
            return marketingService.getById(id).then(function(marketing) {

                if (marketing && 　marketing.status == 1) {
                    marketingService.updateViewCountById(id);

                    //如果活动进行中 那就提供活动界面
                    res.render('quan/invite', {
                        marketing: marketing
                    });

                } else {
                    res.render('quan/finish', {
                        marketing: marketing
                    });
                }
            })
        }
    })


});


router.post('/invite/:id', function(req, res, next) {
    var marketingId = req.params.id;
    var tel = req.body.tel.replace(/(^\s*)|(\s*$)/g, "");
    var result = false;
    if (tel && marketingId) {
        quanService.getOrInsertByTelAndMarketingId(tel, marketingId).then(function(data) {

            res.cookie("tel", data.customer.tel, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.cookie("customerId", data.customer._id.toString(), { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            result = true;
            res.send({
                customer: data.customer,
                result: result
            });
        }).catch(function(e) {
            console.log(e)
            res.send({
                result: result
            });
        });
    } else {
        res.send({
            result: result
        });
    }

});


router.get('/receive/:id', function(req, res, next) {
    var id = req.params.id;

    customerService.getById(id).then(function(customer) {
        quanService.getCanUseByCustomerId(id).then(function(arr) {
            res.render('quan/receive', {
                customer: customer,
                list: arr
            });
        });
    })

});

router.get('/code/:id', function(req, res, next) {
    var id = req.params.id;
    quanService.getWithMarketingById(id).then(function(data) {
        console.log(data)
        res.render('quan/code', {
            quan:data
        });
    });


});


router.get('/manager', function(req, res, next) {
    res.redirect('../quan_manager.html');
});

module.exports = router;
