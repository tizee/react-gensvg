<div align="center">
  <h1>react-gensvg<h1>

  <p>A tsx/jsx file generator for svg files</p>
</div>

[![version][version-badge]][package]
[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![MIT License][license-badge]][license]
[![PRs Welcome][pr-welcome]](http://makeapullrequest.com)

## Why

This project is inspired by [react-feather](https://github.com/feathericons/react-feather) and [typescript-react-svg-icon-generator](https://github.com/jackple/typescript-react-svg-icon-generator). It's tedious to migrate SVG files to tsx/jsx files manually.
This is a tool help developer to generate SVG icon component with tsx/jsx extenion easily.

## Usage

```js
const convert = require('react-gensvg');
// convert(src,dist,tsx,prettierConfig)
// src: string
// dist: string
// tsx: boolean, default true
// prettierConfig: prettier.Options

// generate tsx files by default
convert('./static/icons', './src/svg');
/* ./static/icons/A.svg -> ./src/svg/A.tsx */

// generate jsx files
convert('./static/icons', './src/svg', true);
/* ./static/icons/A.svg -> ./src/svg/A.jsx*/

// generate tsx files explicitly
convert('./static/icons', './src/svg', false);
/* ./static/icons/A.svg -> ./src/svg/A.tsx */
```

### CLI

```
Usage: svgcli [options]

Options:
  --version   Show version number                            [boolean]
  --src, -s   source directory for svg files       [string] [required]
  --dist, -d  destination directory for generated files
                                                   [string] [required]
  --jsx       flag for jsx file extension. default: false    [boolean]
  -h, --help  Show help                                      [boolean]
```

```bash
npx svgcli -s ./static/icons -d ./src/svg --jsx
# ./static/icons/A.svg -> ./src/svg/A.jsx
# note: create dir ./src/svg if not exist
```

### Template

Currently it uses a simple template string to generate
code files.

```jsx
import React, { forwardRef } from 'react';

const /* FileName */ = forwardRef(
  ({ ...rest }, ref) => {
    return (
      /* React SVG tag*/
    );
  }
);

export default /* FileName */;
```

## LISENCE

[MIT](./LISENCE)

[package]: https://www.npmjs.com/package/react-gensvg
[version-badge]: https://img.shields.io/npm/v/react-gensvg.svg?style=flat-square
[license]: https://github.com/tizee/react-gensvg/blob/master/LICENSE
[license-badge]: https://img.shields.io/npm/l/react-gensvg.svg?style=flat-square
[build]: https://travis-ci.com/tizee/react-gensvg
[build-badge]: https://travis-ci.org/tizee/react-gensvg.svg?branch=master
[coverage]: https://codecov.io/github/tizee/react-gensvg
[coverage-badge]: https://img.shields.io/codecov/c/github/tizee/react-gensvg.svg?style=flat-square
[pr-welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
