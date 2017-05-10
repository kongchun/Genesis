var DB_URL = process.env.DB_URL || '10.82.0.1';
var db = require('../db.js')(DB_URL, "alpha");
var helper = require('../helper.js');
var CustomerPO = require('../model/CustomerPO.js')



var getByTel = function(tel){
    return db.open("customer").then(function() {
        return db.collection.findOne({
            tel: tel
        })
    }).then(function(data) {
        db.close()
        if(data){
            return new CustomerPO(data);
        }
        return data;
    }).catch(function(e) {
        db.close();
        console.log(e)
        return null;
    })
}

var getOrInsertByTel = function(tel){
   
    return getByTel(tel).then(function(data){
        if(data){
            return data;
        }
        var customerPO = new CustomerPO({tel:tel});
        return db.open("customer").then(function() {
            return db.collection.insert(customerPO)
        }).then(function(){
            return customerPO;
        }).catch(function(e) {
            db.close();
            return null;
        })
    })
}


exports.getByTel = getByTel;
exports.getOrInsertByTel = getOrInsertByTel;