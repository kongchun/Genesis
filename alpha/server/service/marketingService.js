var DB_URL = process.env.DB_URL || '10.82.0.1';
var db = require('../db.js')(DB_URL, "alpha");
var helper = require('../helper.js');
var MarketingPO = require('../model/MarketingPO.js')


exports.save = function(id, userId, marketingJSON) {
    if (id == null) {
        return create(userId, marketingJSON);
    } else {
        return update(id, userId, marketingJSON);
    }
}


var create = function(userId, marketingJSON) {
    var marketingPO = new MarketingPO(marketingJSON);
    marketingPO.setUserId(userId);

    return db.open("marketing").then(function() {
        return db.collection.insert(marketingPO)
    }).then(function(data) {
        db.close()
        return data;
    }).catch(function(e) {
        db.close();
        return null;
    })
};


var update = function(id, userId, marketingJSON) {
    //console.log(id)
    return getById(id).then(function(data) {
        return data;
    }).then(function(marketingPO) {
        //console.log(marketingPO)


        Object.assign(marketingPO, marketingJSON);
        marketingPO.setUserId(userId);
        marketingPO.setUpdateTime();
        //console.log(marketingPO)
        return db.open("marketing").then(function() {
            return db.collection.update({ _id: marketingPO._id }, { $set: marketingPO })
        }).then(function(data) {
            db.close()
            return marketingPO;
        })
    }).catch(function(e) {
        db.close();
        return null;
    })
};


exports.getListByUserId = function(id) {
    return db.open("marketing").then(function() {
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

var getById = function(id) {
    return db.open("marketing").then(function() {
        return db.collection.findOne({
            _id: db.ObjectId(id)
        })
    }).then(function(data) {
        db.close()
        return new MarketingPO(data);
    }).catch(function(e) {
        db.close();
        return null;
    })
}

exports.getById = getById;
