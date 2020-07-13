module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/src/__test__/code/'],
  collectCoverage: true,
};
