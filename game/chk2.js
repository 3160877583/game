const fs=require('fs');
const c=fs.readFileSync('E:/u-claw/u-claw/data/.openclaw/workspace/deploy/game/gambling-stone.html','utf8');
// Find all .sp div patterns
const matches=[];
let idx=0;
while((idx=c.indexOf('.sp"',idx))!==-1){
  matches.push(c.substring(Math.max(0,idx-50),idx+150));
  idx+=4;
}
console.log('Found .sp references:',matches.length);
matches.forEach(function(m,i){console.log('\n--- Match',i,'---');console.log(m.replace(/\n/g,'\\n'))});

// Also check: does the background style get applied?
const bgIdx=c.indexOf("background:'+ss.bg");
if(bgIdx!==-1){console.log('\n--- bg style ---');console.log(c.substring(bgIdx-20,bgIdx+80))}

// Check SSTYLES values
const sstIdx=c.indexOf('makeStoneCss');
if(sstIdx!==-1){console.log('\n--- makeStoneCss found ---');console.log(c.substring(sstIdx,sstIdx+100))}
