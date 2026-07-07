const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

const files = walkDir(path.join(__dirname, 'src'));
files.forEach((file) => {
  if (file.endsWith('.jsx') || file.endsWith('.js')) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.startsWith('"use client"')) {
      content = content.replace(/^"use client"(;)?\r?\n?/, '');
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Removed "use client" from ${file}`);
    }
  }
});
