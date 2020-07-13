import convert from 'react-domproperty';
import { Node, RootNode, ElementNode } from 'svg-parser';
// convert kebab-case / underscore_case to CamelCase
export function CAMELCASE(name: string) {
  const res = name.replace(/[-_]([a-z0-9])/g, val => {
    return val[1].toUpperCase();
  });
  return res[0].toUpperCase() + res.substring(1);
}

export function genTag(node: Node): string {
  if (node.type === 'text') {
    return node.value ? node.value.toString() : '';
  }
  const { tagName, properties, children } = node;
  let openTag = `<${tagName} `;
  const closeTag = `</${tagName}>`;
  const attributes = properties as Record<string, string | number>;
  openTag += Object.entries(attributes)
    .map(([key, val]) => {
      return `${convert(key)}="${val}"`;
    })
    .join(' ');
  openTag += '>';
  let childTags = '';
  if (children.length > 0) {
    childTags = children
      .map((child: Node) => {
        return genTag(child);
      })
      .join('\n');
    return [openTag, childTags, closeTag].join('\n');
  }
  return openTag + closeTag;
}

export function genSVGTag(svg: ElementNode): string {
  const defaultProperties = {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  const react_props: Record<string, string> = {};
  const attrs = svg.properties as Record<string, string>;
  Object.entries(attrs).forEach(([key, val]) => {
    react_props[convert(key)] = val;
  });
  let children = '';
  const props = Object.assign({}, defaultProperties, react_props);
  for (let child of svg.children) {
    children += genTag(child as Node);
  }
  return `<svg 
         ref={ref}
  ${Object.entries(props)
    .map(([key, val]) => {
      return `${key}="${val}"`;
    })
    .join('\n')}
    {...rest}
    >${children}</svg>`;
}

export function genReactCode(iconName: string, rootNode: RootNode) {
  return `
import React, { forwardRef } from 'react';

const ${iconName} = forwardRef(
  ({ ...rest }, ref) => {
    return (
      ${genSVGTag(rootNode.children[0] as ElementNode)}
    );
  }
);

export default ${iconName};
`;
}
