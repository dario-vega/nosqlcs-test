# nosqlcs-test


oci_curl.sh unitary tests

````
oci-curl nosql.eu-frankfurt-1.oci.oraclecloud.com get "/20190828/tables/ocid1.nosqltable.oc1.eu-frankfurt-1.amaaaaaafrpx4miaydomhbe4law5wvprhsy3vejy2klubc6nnlyggd3kmuka/rows?key=id:101"  | jq

oci-curl nosql.eu-frankfurt-1.oci.oraclecloud.com post ./request.json "/20190828/query?limit=8"  | jq
````

- https://docs.oracle.com/en-us/iaas/developer-tutorials/tutorials/node-on-ol/01oci-ol-node-summary.htm


