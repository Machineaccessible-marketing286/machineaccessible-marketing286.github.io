const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const recruiterLayoutCode = `
        if (appState.isRecruiterView) {
          const id = appState.identity || {};
          const csList = (appState.caseStudies || []).map(cs => \`
            <div class="mb-4 break-inside-avoid">
              <div class="flex justify-between items-baseline mb-1">
                <h4 class="text-base font-bold text-black font-serif">\${cs.title}</h4>
                <span class="text-sm font-semibold text-gray-700 font-sans">\${cs.role || ''}</span>
              </div>
              <p class="text-sm font-serif text-black leading-relaxed mb-2">\${cs.summary}</p>
              \${cs.outcomes ? \`
                <ul class="list-disc pl-4 text-sm font-sans text-gray-800 space-y-1 mb-2">
                  \${cs.outcomes.map(o => \`<li>\${o}</li>\`).join('')}
                </ul>
              \` : ''}
              \${cs.tags ? \`
                <div class="text-[10px] font-mono text-gray-500 uppercase tracking-wider">\${cs.tags.join(', ')}</div>
              \` : ''}
            </div>
          \`).join('');

          layoutHTML = \`
            <div class="bg-white min-h-screen p-8 md:p-12 max-w-4xl mx-auto text-black print:p-0">
              <div class="fixed top-6 right-6 flex space-x-2 print:hidden z-50">
                <button onclick="window.print()" class="bg-black text-white px-4 py-2 rounded shadow text-xs font-bold uppercase hover:bg-gray-800 transition-colors flex items-center space-x-1">
                  <i data-lucide="printer" class="w-4 h-4"></i>
                  <span>Print PDF</span>
                </button>
                <button onclick="toggleRecruiterView()" class="bg-white text-black border border-gray-300 px-4 py-2 rounded shadow-sm text-xs font-bold uppercase hover:bg-gray-100 transition-colors flex items-center space-x-1">
                  <i data-lucide="x" class="w-4 h-4"></i>
                  <span>Exit</span>
                </button>
              </div>

              <div class="border-b-2 border-black pb-4 mb-6">
                <h1 class="text-3xl md:text-4xl font-bold font-serif text-black">\${id.name || 'Anonymous Portfolio'}</h1>
                <h2 class="text-lg md:text-xl font-sans font-medium text-gray-700 mt-1">\${id.title || ''} \${id.location ? ' | ' + id.location : ''}</h2>
                <div class="text-xs md:text-sm font-mono text-gray-500 mt-3 flex flex-wrap gap-2 md:gap-4">
                  \${(id.socials || []).map(s => \`<a href="\${s.url}" target="_blank" class="hover:text-black hover:underline">\${s.platform}</a>\`).join('<span class="text-gray-300">/</span>')}
                </div>
                <p class="mt-4 text-sm font-serif text-black leading-relaxed max-w-3xl">\${id.bio || ''}</p>
              </div>

              \${id.skills && id.skills.length > 0 ? \`
                <div class="mb-8">
                  <h3 class="text-xs font-bold font-sans text-black border-b border-gray-200 pb-1 mb-3 uppercase tracking-widest">Core Competencies</h3>
                  <p class="text-sm font-sans text-black leading-relaxed">\${id.skills.join(' • ')}</p>
                </div>
              \` : ''}

              \${csList ? \`
                <div class="mb-8">
                  <h3 class="text-xs font-bold font-sans text-black border-b border-gray-200 pb-1 mb-4 uppercase tracking-widest">Professional Experience & Case Studies</h3>
                  <div class="space-y-6">
                    \${csList}
                  </div>
                </div>
              \` : ''}
              
              \${(appState.mediaLinks && appState.mediaLinks.length > 0) ? \`
                <div class="mb-8">
                  <h3 class="text-xs font-bold font-sans text-black border-b border-gray-200 pb-1 mb-4 uppercase tracking-widest">Selected Media & Publications</h3>
                  <div class="space-y-4">
                    \${appState.mediaLinks.map(ml => \`
                      <div>
                        <div class="flex justify-between items-baseline">
                          <a href="\${ml.url}" target="_blank" class="text-sm font-bold font-serif text-black hover:underline">\${ml.title}</a>
                          <span class="text-xs font-sans text-gray-500">\${ml.date || ''}</span>
                        </div>
                        <p class="text-xs font-serif text-gray-700 mt-0.5">\${ml.description || ''}</p>
                      </div>
                    \`).join('')}
                  </div>
                </div>
              \` : ''}
            </div>
          \`;
        } else if (layout === 'executive') {
`;

html = html.replace(/if \(layout === 'executive'\) {/, recruiterLayoutCode);

const replaceEnd = `
        if (appState.isRecruiterView) {
          container.innerHTML = layoutHTML;
        } else {
          layoutHTML = layoutHTML.replace(/<\\/div>\\s*$/, \`\\n\${homeLabTeaserHTML}\\n</div>\`);
          container.innerHTML = backgroundGlowHTML + searchBarHTML + layoutHTML + footerHTML;
        }
`;

html = html.replace(/layoutHTML = layoutHTML\.replace.*?;\s*container\.innerHTML = backgroundGlowHTML \+ searchBarHTML \+ layoutHTML \+ footerHTML;/, replaceEnd.trim());

fs.writeFileSync('index.html', html);
console.log('done');
