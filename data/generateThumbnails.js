const config = require('./gallery-config.json');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Absolute root directory for images, from which all image paths are relative
const rootDir = path.join(process.cwd(), config.public ? 'public/' : '', config.rootDir);

console.log('[ Thumbnail Generation ]');
console.log('Source: ', rootDir);

// Recursively process every file in the source directory
function processAll(relDir) {
  console.log(`-- Building thumbs: ${relDir}`);
  const fullDir = path.join(rootDir, relDir);
  const paths = fs.readdirSync(fullDir, { withFileTypes: true });
  paths.forEach(file => {
    if (file.isDirectory()) {
      processAll(`${relDir}${file.name}/`);
    } else {
      makeThumbnail(`${relDir}/${file.name}`);
    }
  });
}

// Generate a thumbnail for an image file using sharp
function makeThumbnail(filePath) {
  // Filetype check
  const ext = filePath.slice(filePath.lastIndexOf('.') + 1).toLowerCase();
  if (['png', 'jpg', 'webp', 'gif'].indexOf(ext) < 0)
    return;

  const fullPath = path.join(rootDir, filePath);
  const relDir = filePath.slice(0, filePath.lastIndexOf('/'));
  const fileName = filePath.slice(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));

  // Create output directory
  const outDir = path.join(process.cwd(), 'public/.thumbs/', relDir);
  if (!fs.existsSync(outDir))
    fs.mkdirSync(outDir, { recursive: true });

  // Create thumbnail image
  const imageData = fs.readFileSync(fullPath);
  sharp(imageData)
    .resize(100, 100)
    .webp({ quality: 80 })
    .toFile(path.join(outDir, `${fileName}.webp`));
}

// Shred the thumbnail directory and contents
function clearThumbnailCache() {
  const dir = path.join(process.cwd(), 'public/.thumbs');
  if (fs.existsSync(dir))
    fs.rmSync(dir, { recursive: true });
}

clearThumbnailCache();
processAll('./');
