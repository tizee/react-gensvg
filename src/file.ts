import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'svg-parser';
import { Options, format } from 'prettier';
import { CAMELCASE, genReactCode } from './helper'; // component name

function writeFile(filename: string, dist: string, code: string): void {
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist, { recursive: true });
  }
  fs.writeFileSync(path.join(dist, filename), code);
}

function getSvgFiles(filenames: Array<string>, parent: string) {
  let svg_files: Array<string> = [];
  for (let filename of filenames) {
    if (path.parse(filename).ext === '.svg') {
      svg_files.push(path.join(parent, filename));
    } else if (fs.lstatSync(path.join(parent, filename)).isDirectory()) {
      const nextlevel = fs.readdirSync(path.join(parent, filename));
      const next_svg_files = getSvgFiles(
        nextlevel,
        path.join(parent, filename)
      );
      svg_files = svg_files.concat(next_svg_files);
    }
  }
  return svg_files;
}

const genFile = (
  src: string,
  dist: string,
  jsx: boolean = false,
  prettierConfig: Options = {
    parser: 'babel',
    arrowParens: 'avoid',
    jsxSingleQuote: true,
    semi: true,
    bracketSpacing: true,
    endOfLine: 'lf',
    singleQuote: true,
    trailingComma: 'es5',
  }
) => {
  if (!fs.existsSync(src)) {
    throw new Error('Src dir does not exist!');
  }
  const filenames = fs.readdirSync(src, 'utf-8');
  const svg_filenames = getSvgFiles(filenames, src);
  svg_filenames.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const node = parse(content);
    const extension = jsx ? '.jsx' : '.tsx';
    const componentName = path.parse(file).name;
    const filename = componentName + extension;
    if (node && node.children && node.children.length > 0) {
      const raw_code = genReactCode(CAMELCASE(componentName), node);
      try {
        const format_code = format(raw_code, prettierConfig);
        writeFile(filename, dist, format_code);
      } catch (error) {
        writeFile(filename, dist, raw_code);
      }
    }
  });
};

export default genFile;
