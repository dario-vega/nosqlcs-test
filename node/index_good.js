  var express = require('express');
  const NoSQLClient = require('oracle-nosqldb').NoSQLClient;
  const ServiceType = require('oracle-nosqldb').ServiceType;


  var app = express();

  app.get('/', async function (req, resW) {
    console.log('Here!');
    let statement = `SELECT * FROM blogtable LIMIT 100`;
    const rows = [];

    try {
      let cnt ;
      let res;
      do {
         res = await client.query(statement, { continuationKey:cnt});
         rows.push.apply(rows, res.rows);
         cnt = res.continuationKey;
      } while(res.continuationKey != null);
      resW.send(rows)
    } catch (err){
        console.log('Err!');
        console.log(err);
    } finally {
        console.log('Finally!');
    }
  });
  app.listen(3000);
  client = createClient();    
  console.log('Application running!');

function createClient() {
    console.log('NoSQLClient!' + cluster.worker.id);
  return new NoSQLClient({
            serviceType: ServiceType.KVSTORE,
            endpoint: 'localhost:80'
        });

}

