'use strict'

var events = require('events');
var EventEmitter = events.EventEmitter;
var fs = require('fs');

function findPattern(file, regex){
  const emitter = new EventEmitter();
  fs.readFile(file, 'utf8',(err,data)=>{
    if(err){
      return emitter.emit('error',err);
    }else{
      emitter.emit('fileread',file);
      let match;
      if(match=data.match(regex)){
        match.forEach(elem => emitter.emit('found',file,elem));
      }
    }
  });
  return emitter;
}
findPattern('file.txt',/hello \w+/g)
.on('error', (error)=>{console.log("Found error:"+error)})
.on('fileread',(file)=>{console.log("File was read:"+file)})
.on('found',(file,match)=>{console.log("Matched regex in file:"+file)})
