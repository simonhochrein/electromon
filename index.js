#!/usr/bin/env node
var electron = require('electron-prebuilt');
var proc = require('child_process');
var watch = require('watch');

var child;
child = proc.spawn(electron,['.']);
const readline = require('readline');

var settings = (require("fs").existsSync("./.electromonrc")?require("fs").readFileSync("./.electromonrc",'utf-8'):"");
 watch.watchTree('.',{ignoreDotFiles:true}, function (f, curr, prev) {
    if (typeof f == "object" && prev === null && curr === null) {
      // Finished walking the tree
    } else{
        if(settings!=''&&RegExp(settings.replace(/\n/g,'')).test(f)==false){
            debounce(restart(),750);
        } else {
            debounce(restart(),750);
        }
    }
  });

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
    settings = (require("fs").existsSync("./.electromonrc")?require("fs").readFileSync("./.electromonrc",'utf-8'):"");

}
child.on('exit',function(){
    console.log("Shutting Down Electron");
    child.stdin.pause();
    child.kill();
    process.exit();
})
 
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
// One-liner for current directory, ignores .dotfiles 
