const req = require('request');
const fileSys = require('fs');
const readline = require('readline');

const url = process.argv[2];
const local = process.argv[3];


const fetchWrite = function(url, local) {
  req(url, (error, resp, body) => {
    // console.log(resp)
    if (error) {
      console.log('BIG BAD ERROR');
      console.log(error);
      return;
    }
    fileSys.writeFile(local, body, (error) => {
      if (error) {
        console.log('FILE WRITE ERROR');
        console.log(error);
        return;
      }
      console.log(`downloaded and saved ${body.length} bytes to .${local}`);
    });
  });


};

if (!url || !local) {
  console.log("please pass url and directory");
} else {
  fileSys.exists(local, (isexist, error) => {
    
    if (!isexist)  {
      fetchWrite(url, local);
      return;
    }

    
    let rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt('this file exists already!! do you want to overwite? type y/n');
    rl.prompt();
    rl.on('line', (choice) => {
      if (choice === 'y') {
        fetchWrite(url, local);
        return;
      } else {
        return;
      }
      
      
    }) 
  })
}
