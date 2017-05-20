'use strict'

const fs = require("fs");
const cache={};

function inconsistentRead(fileName,callback){
  if(cache[fileName]){
    //invoked synchronously
    process.nextTick(()=>callback(null,cache[fileName]));
  }else{
    //asynchronous function
    fs.readFile(__dirname+'/'+fileName,'utf8',(err,data)=>{

      if(err){
        callback(err,null);
      }else{
        cache[fileName] = data;
        callback(null,data);
      }
    })
  }
}

function createFileReader(fileName){
  const listeners =[];
  inconsistentRead(fileName, (err,value)=>{
    //need to handle err

    listeners.forEach(listener=> listener(value));
  });
  return{
    onDataReady: listener => listeners.push(listener)
  }
}
function essentialPatternsAsync(){
  return{
    createFileReader: createFileReader
  }
}
module.exports = new essentialPatternsAsync();
