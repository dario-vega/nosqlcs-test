var cluster = require('cluster');

if (cluster.isMaster) {

    let cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
}
} else {
  var express = require('express');
  const NoSQLClient = require('oracle-nosqldb').NoSQLClient;
  const ServiceType = require('oracle-nosqldb').ServiceType;


  var app = express();

  app.get('/', async function (req, resW) {
    console.log('Here!' + cluster.worker.id);
    let statement = `SELECT * FROM blogtable LIMIT 100`;
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
        console.log('Err!' + cluster.worker.id);
        console.log(err);
    } finally {
        console.log('Finally!' + cluster.worker.id);
        client.close()
    }
  });
  app.listen(3000);
  console.log('Application running!' + cluster.worker.id);

function createClient() {
    console.log('NoSQLClient!' + cluster.worker.id);
  return new NoSQLClient({
            serviceType: ServiceType.KVSTORE,
            endpoint: 'localhost:80'
        });

}


}

