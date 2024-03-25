import browserify from 'browserify';
import tsify from 'tsify';
import { createWriteStream, existsSync, mkdirSync, readFileSync } from 'fs';

try {
    if (!existsSync('build')) {
        mkdirSync('build');
    }
} catch (e) {
    console.error("Failed to make directory 'build'.", e);
}

const entryPoint = 'src/index.ts';

const tsconfigText = readFileSync('tsconfig.json');
const tsconfig = JSON.parse(tsconfigText);

browserify()
    .add(entryPoint)
    .plugin(tsify, tsconfig)
    .bundle()
    .on('error', function (error) {
        console.error(error.toString());
    })
    .pipe(createWriteStream('build/index.js'));
