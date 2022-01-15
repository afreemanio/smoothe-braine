import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  passWithNoTests: true,
  roots: ['spec/'],
  testPathIgnorePatterns: ['ignore/'],
  collectCoverage: true,
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  verbose: true,
};

export default config;
