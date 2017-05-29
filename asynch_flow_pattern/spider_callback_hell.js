'use strict'

const fs = require('fs');
const request = require('request');
const mkdirp = require('mkdirp');
const path = require('path');
function spider(url,fileName,callback){
  fs.exists(fileName,(exists)=>{
    if(!exists){
      console.log("downloading url...");
      request(url,(error,response,body)=>{
        if(error){
          callback(err,null)
        }else{
          mkdirp(path.dirname(fileName),err=>{
            if(err){
              callback(err,null)
            }else{
              fs.writeFile(fileName,body, err=>{
                if(err){
                  callback(err,null)
                }else{
                  console.log("created file...");
                  callback(null,fileName);
                }
              })

            }
          })
        }
      })
    }else{
      callback(null,fileName);
    }
  })
}

spider("http://google.com","google.txt",(err,fileName)=>{
  if(err){
    console.log(err);
  }
  if(fileName){
    console.log("file either already exists or it got created:"+fileName);
  }
})
