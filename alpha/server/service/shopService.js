var DB_URL = process.env.DB_URL || '10.82.0.1';
var db = require('../db.js')(DB_URL, "alpha");
var helper = require('../helper.js');
var ShopPO = require('../model/ShopPO.js')


exports.getListByUserId =function(id){
    return db.open("shop").then(function() {
        return db.collection.find({
            userId: id
        }).toArray()
    }).then(function(data) {
        db.close()
        return data;
    }).catch(function(e) {
        db.close();
        return [];
    })
}