var DB_URL = process.env.DB_URL || '10.82.0.1';
var db = require('../db.js')(DB_URL, "alpha");
var helper = require('../helper.js');
var marketingService = require('./marketingService.js');
var customerService = require('./customerService.js');
var QuanPO = require('../model/QuanPO.js');

exports.getOrInsertByTelAndMarketingId = function(tel,marketingId){

	return getByTelAndMarketingId(tel,marketingId).then(function(data){
		if(data){
            return data;
        }
        return customerService.getOrInsertByTel(tel).then(function(customerPO){
            return marketingService.updateDownCountById(marketingId).then(function(){
                var quanPO = new QuanPO({customer:customerPO,marketingId:marketingId});

                console.log(quanPO,111)
                return insert(quanPO);
            })
        }).then(function(data){
            console.log(data,555)
            return data;
        })
	})

};


var insert = function(quanPO){
    return db.open("quan").then(function() {
        return db.collection.insert(quanPO);
    }).then(function(data) {
        db.close()
        return quanPO;
    }).catch(function(e) {
        db.close();
        return null;
    })
}

var getByTelAndMarketingId = function(tel,marketingId){
	return db.open("quan").then(function() {
        return db.collection.findOne({
            "customer.tel": tel,
            "marketingId":marketingId
        })
    }).then(function(data) {
        db.close()
        if(data){
            return new QuanPO(data)
        }
        return data;
    }).catch(function(e) {
        db.close();
        console.log(e)
        return null;
    })
}

//获取可以使用的券
var getCanUseByCustomerId = function(id){
    return db.open("quan").then(function() {
        return db.collection.find({
            "customer._id": db.ObjectId(id),
            "status":0
        },{customer:0}).toArray()
    }).then(function(arr) {
         db.close()
        return helper.iteratorArr(arr,function(i){
            return marketingService.getWithCondById(i.marketingId,{
                title:1,shop:1,endDate:1,type:1,percent:1
            }).then(function(marketing){
                i.marketing = marketing;
            })
        }).then(function(){
             return arr;
        })
    }).catch(function(e) {
        db.close();
        console.log(e)
        return [];
    })
}

var getById = function(id) {
    return db.open("quan").then(function() {
        return db.collection.findOne({
            _id: db.ObjectId(id)
        })
    }).then(function(data) {
        db.close()
        return new Quan(data);
    }).catch(function(e) {
        db.close();
        return null;
    })
}

var getWithMarketingById = function(id) {
    return db.open("quan").then(function() {
        return db.collection.findOne({
            _id: db.ObjectId(id)
        })
    }).then(function(data) {
        db.close()
        return new QuanPO(data);
    }).then(function(quan){
        return marketingService.getById(quan.marketingId).then(function(marketing){
                quan.marketing = marketing;
                return quan;
        })
    }).catch(function(e) {
        db.close();
        console.log(e)
        return null;
    })
}

exports.getById = getById;
exports.getWithMarketingById = getWithMarketingById;
exports.getByTelAndMarketingId = getByTelAndMarketingId;
exports.getCanUseByCustomerId =getCanUseByCustomerId ;