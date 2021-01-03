const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000/",
    token: "a971653d2ff37a7cc58a756d36c646120392c2e0",
    options: {
      "sonar.sources": "./src",
      "sonar.exclusions": "**/__tests__/**",
    //   "sonar.tests": "./src/__tests__",
    //   "sonar.test.inclusions": "./src/__tests__/**/*.test.tsx,./src/__tests__/**/*.test.ts",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
    //   "sonar.testExecutionReportPaths": "reports/test-report.xml",
    },
  },
  () => {},
);