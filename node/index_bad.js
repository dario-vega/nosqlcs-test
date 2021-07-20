  var express = require('express');
  const NoSQLClient = require('oracle-nosqldb').NoSQLClient;
  const ServiceType = require('oracle-nosqldb').ServiceType;

  var app = express();

  app.get('/', async function (req, resW) {
    let statement = `SELECT * FROM blogtable`;
    const rows = [];

    client = createClient();
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
        console.log(err);
        resW.sendStatus(500)
    } finally {
        client.close()
    }
  });
  app.listen(3000);

function createClient() {
  return new NoSQLClient({
            serviceType: ServiceType.KVSTORE,
            endpoint: 'localhost:80'
        });

}

        
