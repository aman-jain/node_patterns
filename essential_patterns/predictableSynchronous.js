'use strict'

const fs = require("fs");
const cache={};

function consistentRead(fileName,callback){
  console.log("Calling Consistent Read...")
  if(cache[fileName]){
    //invoked synchronously
    console.log("Getting data from cache...")
    callback(null,cache[fileName])
  }else{
    //synchronous function
    const data = fs.readFileSync(__dirname+'/'+fileName,'utf8')
    if(data){
      console.log("Data Received-->"+data);
      cache[fileName] = data;
      callback(null,data);
    }else{
      console.log("Error...");
      callback("Error",null);
    }

  }
}

function createFileReader(fileName){
  let data;
  consistentRead(fileName, (err,value)=>{
    //need to handle err
    console.log("calling function:"+value);
    data = value;
    return data;
  });
  console.log(data);
  return data;

}
function essentialPatternsPredictable(){
  return{
    createFileReader: createFileReader
  }
}
module.exports = new essentialPatternsPredictable();
