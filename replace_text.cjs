const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/bg-\[#005A9C\] text-black/g, 'bg-[#005A9C] text-white');
html = html.replace(/hover:text-black hover:bg-\[#005A9C\]/g, 'hover:text-white hover:bg-[#005A9C]');
html = html.replace(/text-\[#005A9C\]/g, 'text-[#005A9C]'); // already good, just keeping
fs.writeFileSync('index.html', html);
