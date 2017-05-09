var DB_URL = process.env.DB_URL || '127.0.0.1';
var db = require('./db.js')(DB_URL, "alpha");


exports.createMap = function(userId, mapName = "我的地图") {
    return db.open("user_map").then(function() {
        return db.collection.insert({
            userId: userId,
            mapName: mapName,
            date: new Date()
        })
    }).then(function(data) {
        db.close()
        return data;
    }).catch(function(e) {
        db.close();
        return null;
    })
};


exports.saveMap = function(map) {
    return db.open("user_map").then(function() {
        return db.collection.update({
            _id: db.ObjectId(map.id)
        }, {
            $set: {
                data: map.data
            }
        })
    }).then(function(data) {
        db.close()
        return true;
    }).catch(function(e) {
        db.close();
        return false;
    });
}






