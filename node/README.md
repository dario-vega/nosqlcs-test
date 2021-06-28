````
git clone https://github.com/dario-vega/nosqlcs-test.git
npm install express
npm install oracle-nosqldb
````

In a new window - we will use the ab tool in order to simulate multiples concurrent users
````
sudo yum install httpd-tools
ab -c 500 -t 500  http://localhost:3000/
````

In a new window - we will monitor the number of open connections between the driver and http proxy server (port 80)

netstat -an | grep 80 | grep ESTA  | wc -l

Run the 2 tests and compare

node index_bad.js
node index.js

## During the first test, 
1. we will see errors
2. lot of open connections
3. Only few request handled at ab level.


  _cause: NoSQLNetworkError: [NETWORK_ERROR] Network error; Caused by: socket hang up
      at ClientRequest.<anonymous> (/home/opc/nosqlcs-test/node/node_modules/oracle-nosqldb/lib/http_client.js:111:42)
      at ClientRequest.emit (events.js:315:20)
      at Socket.socketCloseListener (_http_client.js:443:11)
      at Socket.emit (events.js:327:22)
      at TCP.<anonymous> (net.js:673:12) {

[opc@node1-nosql bo]$ netstat -an | grep 80 | grep ESTA  | wc -l
6201
[opc@node1-nosql bo]$ netstat -an | grep 80 | grep ESTA  | wc -l
7716
[opc@node1-nosql bo]$ netstat -an | grep 80 | grep ESTA  | wc -l
8759

apr_pollset_poll: The timeout specified has expired (70007)
Total of 2508 requests completed

## During the first test, 
1. we will see NO errors
2. a better management of the connections
3. a system managing multiple concurrent queries.
