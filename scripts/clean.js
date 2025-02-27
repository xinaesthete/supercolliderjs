// packages/scripts/clean.js
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

// Get the package directory (parent of the scripts directory)
const packageDir = process.cwd();
const packageName = require(path.join(packageDir, 'package.json')).name;

// Clean lib directory for all packages
rimraf.sync(path.join(packageDir, 'lib'));

// Special handling for supercolliderjs package
if (packageName === 'supercolliderjs') {
    // Clean and recreate esm directory with package.json
    const esmDir = path.join(packageDir, 'esm');
    rimraf.sync(esmDir);
    fs.mkdirSync(esmDir, { recursive: true });
    fs.writeFileSync(
        path.join(esmDir, 'package.json'),
        JSON.stringify({ type: 'module' }, null, 2)
    );
}

// Remove tsbuildinfo files
const tsBuildInfoFiles = [
    'tsconfig.tsbuildinfo',
    'tsconfig.esm.tsbuildinfo'
];

tsBuildInfoFiles.forEach(file => {
    const filePath = path.join(packageDir, file);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
});

console.log(`Cleaned ${packageName}`);