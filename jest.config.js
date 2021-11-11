module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test/acceptance'],
  transform: {
    'ˆ.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '.e2e-spec.ts$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
};
