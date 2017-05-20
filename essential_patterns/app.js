'use strict';
const predictableAsynch = require("./predictableAsynch");
const unpredictable = require("./unpredictable");
const predictableSynch = require("./predictableSynchronous");

function app(){
  let fileName;
  // print process.argv
  process.argv.forEach((val, index) => {
    //console.log(`${index}: ${val}`);
    if(index==2){
      fileName = val;
    }
  });
  //Unpredictable
  /*const reader1 = unpredictable.createFileReader(fileName);
  reader1.onDataReady(data=>{
    console.log('First Call Data:' + data);
    //const reader2 = unpredictable.createFileReader(fileName);
    const reader2 = unpredictable.createFileReader(fileName);
    reader2.onDataReady(data=>{
        console.log('Second Call Data:' + data);
    })
  })*/
  //Predictable Asynchronous
  const reader1 = predictableAsynch.createFileReader(fileName);
  reader1.onDataReady(data=>{
    console.log('First Call Data:' + data);
    //const reader2 = unpredictable.createFileReader(fileName);
    const reader2 = predictableAsynch.createFileReader(fileName);
    reader2.onDataReady(data=>{
        console.log('Second Call Data:' + data);
    })
  })
  //Predictable synchronous
  /*const data1 = predictableSynch.createFileReader(fileName);
  console.log('First Call Data:' + data1);
  const data2 = predictableSynch.createFileReader(fileName);
  console.log('Second Call Data:' + data2);*/

}

app();
