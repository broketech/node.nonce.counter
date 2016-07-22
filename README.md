# node.nonce.counter
Hack to help record a persistent nonce count using mongodb.

This module is just some hack made to help count an incremental 
nonce used in btc-e.com private API transactions.  It could 
really be used anywhere a persistent count would be needed
in between program runs.

### Usage

Edit nonce_counter.js with your default values.  Then include:

```javascript
var btce = require('./nonce_counter.js');
var instance = 'btce1';
```

at the top of your work file. 

The main idea is run a fetch, keep count locally, then write
count on cleanup.  If for some reason you don't need a count
locally, there is also an increment function included.

Fetch or create new:
```javascript
btce.nonce_fetch(instance, function(sdata, cb){
//  console.log(sdata);
  return cb(sdata);
});
```

Increment update:
```javascript
btce.nonce_update(instance, function(err, data){
  if(err){
    return err;
  };
  // console.log(data);
});
```

Update local count to db:
```javascript
btce.nonce_update(instance, local_count, function(err, data){
  if(err){
    return err;
  };
  // console.log(data);
});
```

