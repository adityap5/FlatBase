const fs = require('fs');
const path = require('path');

const map = {
  'layout': ['Navbar', 'Footer', 'SellerLayout'],
  'ui': ['Button', 'Modal', 'Loader', 'LoadingScreen', 'PageTransition', 'Error404', 'Success', 'ScrollToTop'],
  'cards': ['FlatCard', 'FlatCardName'],
  'skeletons': ['HomeCardShimmer', 'ListShimmer'],
  'shared': ['Calendar', 'MonthCalendar', 'Search', 'NavScrollTop', 'Logout', 'Banner', 'Testimonial']
};

// Create a reverse map: componentName -> folder
const compFolder = {};
for (const [folder, comps] of Object.entries(map)) {
  for (const comp of comps) {
    compFolder[comp] = folder;
  }
}

function processDirectory(dir, depth = 0) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath, depth + 1);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Replace generic imports like ../components/Button
      // We look for from ["'](prefix)/components/Name["'] or ["'](prefix)/pages/Name["']
      
      content = content.replace(/from\s+['"](.*?)['"]/g, (match, importPath) => {
        const parts = importPath.split('/');
        const basename = parts[parts.length - 1];
        
        if (compFolder[basename]) {
           const targetFolder = compFolder[basename];
           
           // If we are importing from a page to components
           if (importPath.includes('/components/') || importPath === `./${basename}` || importPath.includes('/pages/')) {
               // Calculate new relative path based on the depth of the current file relative to src
               // If depth is 1 (e.g. src/pages/File.jsx), to reach src/components/ui/Button
               // path is ../components/ui/Button
               
               let newPath = '';
               // For App.jsx (depth 0)
               if (depth === 0) {
                 newPath = `./components/${targetFolder}/${basename}`;
               } else if (depth === 1) {
                 newPath = `../components/${targetFolder}/${basename}`;
               } else if (depth === 2) { // inside src/components/folder
                 newPath = `../../components/${targetFolder}/${basename}`;
               }
               return `from "${newPath}"`;
           }
        }
        return match;
      });

      if (changed || content !== fs.readFileSync(fullPath, 'utf8')) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated imports in ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src'));
console.log('Import paths updated.');
