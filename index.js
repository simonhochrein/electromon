#!/usr/bin/env node
var electron = require('electron-prebuilt');
var proc = require('child_process');
var watch = require('watch');

var child;
child = proc.spawn(electron,['.']);
const readline = require('readline');

var settings = require("fs").readFileSync("./.electromonrc",'utf-8');
 watch.watchTree('.',{ignoreDotFiles:true}, function (f, curr, prev) {
    if (typeof f == "object" && prev === null && curr === null) {
      // Finished walking the tree
    } else{
        if(RegExp(settings.replace(/\n/g,'')).test(f)==false){
            restart();
        }
    }
  })
console.log(settings);

child.stdout.pipe(process.stdout);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Starting Electron App @ " + proc.execSync('pwd',{encoding:"utf-8"}));

rl.on('line', (cmd) => {
  if(cmd == "rs"){  
    restart();
  }
});
rl.on('SIGINT', (cmd) => {
    console.log("Shutting Down Electron");
    child.stdin.pause();
    child.kill();
    process.exit();
})
function restart(){
    console.log('Restarting');
    child.stdin.pause();
    child.kill();
      child = proc.spawn(electron,['.']);
    settings = require("fs").readFileSync("./.electromonrc",'utf-8');
}
 
// One-liner for current directory, ignores .dotfiles 
