const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner(
  {
    serverUrl: 'https://sonarqube.swiveltech.lk/',
    options: {
      'sonar.sources': '.',
      'sonar.javascript.lcov.reportPaths': 'src/test/coverage/lcov.info',
      'sonar.inclusions': 'src/**/*.ts', // Entry point of your code
      'sonar.test.inclusions':
        'src/**/*.spec.ts,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
);
