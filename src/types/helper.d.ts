import { Node, RootNode, ElementNode } from 'svg-parser';
export declare function CAMELCASE(name: string): string;
export declare function genTag(node: Node): string;
export declare function genSVGTag(svg: ElementNode): string;
export declare function genReactCode(iconName: string, rootNode: RootNode): string;
