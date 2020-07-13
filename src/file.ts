import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'svg-parser';
import { Options, format } from 'prettier';
import { CAMELCASE, genReactCode } from './helper'; // component name

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
  tsx = true,
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
  const SOURCE = src;
  const DIST = dist;
  if (!fs.existsSync(SOURCE)) {
    throw new Error('Src dir does not exist!');
  }
  const filenames = fs.readdirSync(SOURCE, 'utf-8');
  const svg_filenames = getSvgFiles(filenames, SOURCE);
  svg_filenames.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const node = parse(content);
    const extension = tsx ? '.tsx' : '.jsx';
    const componentName = path.parse(file).name;
    const filename = componentName + extension;
    if (node && node.children && node.children.length > 0) {
      const raw_code = genReactCode(CAMELCASE(componentName), node);
      const format_code = format(raw_code, prettierConfig);
      if (!fs.existsSync(DIST)) {
        fs.mkdirSync(DIST, { recursive: true });
      }
      fs.writeFileSync(path.join(DIST, filename), format_code);
    }
  });
};

export default genFile;
