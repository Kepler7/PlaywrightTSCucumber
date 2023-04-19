const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "test-results",
  reportPath: "test-results/reports/",
  reportName: "Playwright Automation report",
  pageTitle: "Book App test report",
  displayDuration: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "112",
    },
    device: "Kepler's mac mini",
    platform: {
      name: "ios",
      version: "12.0.1",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Book Cart Application" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "Smoke-1" },
      //{ label: "Execution Start Time", value: "Nov 19th 2017, 02:31 PM EST" },
      //{ label: "Execution End Time", value: "Nov 19th 2017, 02:56 PM EST" },
    ],
  },
});