import { CAMELCASE } from '../helper';

describe('CAMELCASE', () => {
  test('should bypass CamelCase', () => {
    expect(CAMELCASE('CamelCase')).toBe('CamelCase');
  });
  test('should convert kebab-case', () => {
    expect(CAMELCASE('kabab-case')).toBe('KababCase');
    expect(CAMELCASE('kabab-case-1')).toBe('KababCase1');
  });
  test('should convert underscore-case', () => {
    expect(CAMELCASE('underscore_case_ab')).toBe('UnderscoreCaseAb');
  });
});
