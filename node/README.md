# Install
````
git clone https://github.com/dario-vega/nosqlcs-test.git
cd nosqlcs-test/node/
npm install express
npm install oracle-nosqldb
````

## Install ab tool in order to simulate multiples concurrent users

Install and run the following test

````
sudo yum install httpd-tools
ab -c 500 -t 500  http://localhost:3000/
````

## Monitor the number of connections
In a new window - we will monitor the number of open connections between the driver and http proxy server (port 80)

````
netstat -an | grep 80 | grep ESTA  | wc -l
````

# Run the 2 tests sequentially and compare

1) node index_bad.js (open/close the handle at each execution)
2) node index_good.js (open only one time and sharing between query calls)

## During the first test, 
1. we will see errors
2. lot of open connections
3. Only few request handled at ab level.

````
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
````

## During the second test, 
1. we will see NO errors
2. a better management of the connections
3. a system managing multiple concurrent queries. All requests will sucessfuly run!

````
[opc@node1-nosql bo]$ netstat -an | grep 80 | grep ESTA  | wc -l
130
[opc@node1-nosql bo]$ netstat -an | grep 80 | grep ESTA  | wc -l
130
[opc@node1-nosql bo]$ netstat -an | grep 80 | grep ESTA  | wc -l
142

Benchmarking localhost (be patient)
Completed 5000 requests
Completed 10000 requests
Completed 15000 requests
Completed 20000 requests
Completed 25000 requests
Completed 30000 requests
Completed 35000 requests
Completed 40000 requests
Completed 45000 requests
Completed 50000 requests
Finished 50000 requests
  
````
