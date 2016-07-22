var monk = require('monk');  // to help me count the nonce
var db = monk('127.0.0.1:27017/exchange_test'); // db params
var increment = 5; // good place to design some esoteric function, or just 5
var start = 23; // where to start counter of a fresh instance
module.exports.nonce_fetch = function(a, cb){ // pass entity name, ie btce1
  db.get('nonce').findOne({"entity": a},{},function(err, data){ // fancy nonce sense
  if(!data){ // if doesn't exist, make one
    db.get('nonce').insert({"entity": a, count: start},{}, function(err, sdata){
      db.close();
    });
    return cb(start);
  } else { // else return count from db
    db.close();
    //console.log(data.count);
    return cb(data.count);
  };
});
}

// result doesn't tell us what new count is, ends up being way to check increment, which we know.
module.exports.nonce_increment = function(a, cb){
  db.get('nonce').update({"entity": a}, {$inc:{count: increment}},{}, function(err, result){
    db.close();
    //console.log("was here");
    cb(result);
  });
}

module.exports.nonce_update = function(a, b, cb){ // entity name, final count to update in db
  db.get('nonce').update({"entity": a}, {$set:{count: b}},{}, function(err, result){
    db.close();
    //console.log("was here");
    cb(result);
  });
}
