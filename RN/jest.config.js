const {defaults: tsjPreset} = require('ts-jest/presets');
const {pathsToModuleNameMapper} = require('ts-jest/utils');
const {compilerOptions} = require('./tsconfig.json');

module.exports = {
    ...tsjPreset,
    preset: 'react-native',
    transform: {
        ...tsjPreset.transform,
        '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
            diagnostics: true,
        },
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>',
    }),

    cacheDirectory: '.jest/cache',
};
