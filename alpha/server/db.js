var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
//var url = 'mongodb://127.0.0.1:27017/';
class DB {
	constructor(url = "127.0.0.1", dbName = "test") {
		this.url = `mongodb://${url}:27017/${dbName}`;
		this.db = null;
		this.collection = null;
		this.ObjectId = mongodb.ObjectId;
	}
	open(table) {
		return new Promise((resolve, reject) => {
			if (this.db && this.db != null) {

				resolve(this.collection);
				return;
			}
			MongoClient.connect(this.url).then((db) => {
				console.log("openDB")
				this.db = db;
				var collection = this.collection = db.collection(table);
				resolve(this.collection);
			}).catch(reject);
		})

	}

	close() {
		this.db && this.db.close();
		this.db = null;
		this.collection = null;
	}

	insert(rows) {
		if (!Array.isArray(rows)) {
			rows = [rows]
		}
		rows.map((i) => {
			i["_id"] = (new mongodb.ObjectId().toString())
		});
		return new Promise((resolve, reject) => {
			this.collection.insert(rows, {
				w: 1
			}).then(resolve).catch(reject);
		})
	}


	insertUnique(rows, key) {

		return new Promise((resolve, reject) => {
			if (!Array.isArray(rows)) {
				rows = [rows]
			}

			var it = rows[Symbol.iterator]();
			var i = ((item) => {

				if (item.done) {
					resolve()
					return;
				}

				let row = item.value;

				var seachKey = row;
				if (key) {
					var obj = {};
					obj[key] = row[key]
					seachKey = obj;
				}
				//console.log(row)
				this.collection.find(seachKey).toArray().then((t) => {
					//console.log(t.length > 0)
					if (t.length == 0) {
						return this.insert(row);
					} else {
						console.log(row.url, "is not Unique");
						return row
					}
				}).then(function() {
					i(it.next());
				}).catch(reject);

			})
			i(it.next())

		})
	}



}

module.exports = function(url, dbName) {
	return new DB(url, dbName);
}