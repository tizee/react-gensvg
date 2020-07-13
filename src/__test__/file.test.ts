import del from 'del';
import path from 'path';
import prettier from 'prettier';
import fs from 'fs';
import { parse } from 'svg-parser';
import { genTag, genReactCode } from '../helper';
import genFile from '../file';

const valid_svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-down">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <polyline points="19 12 12 19 5 12"></polyline>
</svg>
`;

const valid_file = prettier.format(
  `import React, { forwardRef } from 'react';

const ArrowDown = forwardRef(
({ ...rest }, ref) => {
return (
    <svg 
ref={ref}
xmlns=\"http://www.w3.org/2000/svg\"
fill=\"none\"
viewBox=\"0 0 24 24\"
strokeWidth=\"2\"
strokeLinecap=\"round\"
strokeLinejoin=\"round\"
width=\"24\"
height=\"24\"
stroke=\"currentColor\"
className=\"arrow-down\"
{...rest}
><line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line><polyline points=\"19 12 12 19 5 12\"></polyline></svg>
);
}
);

export default ArrowDown;
`,
  {
    parser: 'babel',
    arrowParens: 'avoid',
    jsxSingleQuote: true,
    semi: true,
    bracketSpacing: true,
    endOfLine: 'lf',
    singleQuote: true,
    trailingComma: 'es5',
  }
);

describe('generate code', () => {
  test('pass in valid svg code', () => {
    const hast = parse(valid_svg);
    expect(genTag(hast.children[0])).toBe(
      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-down">\n<line x1="12" y1="5" x2="12" y2="19"></line>\n<polyline points="19 12 12 19 5 12"></polyline>\n</svg>`
    );
  });
});

describe('generate file', () => {
  test('pass in valid svg code', () => {
    const hast = parse(valid_svg);
    expect(
      prettier.format(genReactCode('ArrowDown', hast), {
        parser: 'babel',
        arrowParens: 'avoid',
        jsxSingleQuote: true,
        semi: true,
        bracketSpacing: true,
        endOfLine: 'lf',
        singleQuote: true,
        trailingComma: 'es5',
      })
    ).toBe(valid_file);
  });
  test('generate tsx file', () => {
    const dir = path.resolve(__dirname);
    del.sync([`${dir}/code`]);
    genFile(`${dir}/svg`, `${dir}/code`);
    expect(fs.readFileSync(`${dir}/code/arrow-down.tsx`, 'utf-8')).toBe(
      valid_file
    );
  });
  test('generate jsx file', () => {
    const dir = path.resolve(__dirname);
    del.sync([`${dir}/code`]);
    genFile(`${dir}/svg`, `${dir}/code`, false);
    expect(fs.readFileSync(`${dir}/code/arrow-down.jsx`, 'utf-8')).toBe(
      valid_file
    );
  });
  test('invalid source dir', () => {
    try {
      expect(genFile('./not-exist', './code')).toThrow(Error);
    } catch (error) {
      expect(error.message).toBe('Src dir does not exist!');
    }
  });
});
