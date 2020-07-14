/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
var ibmdb = require('ibm_db');

// Insert a new event record
 function insertEvent(dsn, eventValues) {
    try {
       var conn=ibmdb.openSync(dsn);
       // The timestamp value is derived from date and time values passed in
       var data=conn.querySync("insert into LMB14213.chat_data(name, education, work, project, technology, email, mobile_no, about) values(?,?,?,?,?,?,?,?)", eventValues);
       conn.closeSync();
       return {result: data, input: eventValues};
    } catch (e) {
        return { dberror : e }
    }
   }
   
function main(param) {
    dsn="DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-lon02-07.services.eu-gb.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=lmb14213;PWD=cbr0ccp8jhwqq-k3;";
    switch(param.actionname) {
        case "insert":
            return insertEvent(dsn,param.eventValues.split(";"));
        default:
            return { dberror: "No action defined", actionname: param.actionname}
    }
}
