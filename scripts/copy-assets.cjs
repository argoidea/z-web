const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
['img', 'style'].forEach((dir) => {
  const src = path.join(root, dir);
  const dest = path.join(root, 'public', dir);
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach((file) => {
    const srcFile = path.join(src, file);
    if (fs.statSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, path.join(dest, file));
      console.log(`Copied ${dir}/${file}`);
    }
  });
});
