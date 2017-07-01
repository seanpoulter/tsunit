# The xUnit Example

Following along with Kent Beck's **Test-Driven Development: By Example**.

## Install

```.sh
npm install --save-dev https://github.com/seanpoulter/tsunit
tsunit [directory]
# or on Windows .\node_modules\.bin\tsunit
```

## To-do List

  - ~~Invoke the test method~~
  - ~~Invoke setUp first~~
  - ~~Invoke tearDown afterward~~
  - ~~Invoke tearDown even if the test method fails~~
  - ~~Run multiple tests~~
  - ~~Report collected results~~
  - ~~Log string in WasRun~~
  - ~~Report failed tests~~
  - ~~Catch and report setUp errors~~
  - ~~Create TestSuite from a TestCase class~~
  - ~~Implement the Test interface~~
  - ~~Test assert methods~~
  - Report the name of the TestSuite
  - ~~Report which tests failed~~
  - ~~Report which tests had errors~~
  - ~~Differentiate between test failures and errors~~
  - ~~Report the stack trace of failing tests~~
  - Improve the formatting of the stack trace
  - Report the total test run duration
  - Report the test suite run duration
  - Report the test case run duration
  - ~~Create a test runner (e.g.: node app [directory])~~
  - Accept a file to exclude to the app
  - Accept a file as an argument to the app
  - Accept a glob as an argument to the app
  - Accept a list of directory, file, or globs
  - Accept an array of files or directories
  - ~~Import TestCases from a module path~~
  - ~~Resolve a module path relative to the working directory of the Node process~~
  - ~~Run discovered TestCases from a module~~
  - ~~Run all dicovered TestCases from a directory~~
  - ~~Add a decorator to ignore TestCases being added to suites~~
  - Display command-line usage when run with --help or incorrect arguments
  - Add command line option to bail after first error, --failFast
  - Add command line option to list available reporters
  - Add command line option to specify reporter(s), -r/--reporter name
  - Add command line option to specify the concurrency, --concurrency
  - Run tests in parallel
  - Run tests in random order
  - Use asynchronous methods to discover tests
  - Add a JUnit XML format which is the defacto standard for CI integration<br/>
    **References**:
      - [Jenkins CI - XUnit Plugin - JUnit XSD (GitHub)](https://github.com/jenkinsci/xunit-plugin/blob/master/src/main/resources/org/jenkinsci/plugins/xunit/types/model/xsd/junit-10.xsd)
      - [IBM Knowledge Center - JUnit XML Format](https://www.ibm.com/support/knowledgecenter/en/SSQ2R2_9.5.0/com.ibm.rsar.analysis.codereview.cobol.doc/topics/cac_useresults_junit.html)
  - Add a clone of the ava [mini-reporter](https://github.com/avajs/ava#mini-reporter)
  - Add a clone of the ava "[magic assert]"(https://github.com/avajs/ava#magic-assert)
  - Remove unrelated lines from the stack traces
  - Use nyc for code coverage reporting
  - Clone the behaviour of Wallaby.js, run tests starting from a filepath:lineNumber
      - Identify the existing tests
      - Order the tests based on their ability to update adjacent tests or code coverage to the focused line
      - Run the tests
      - (Somehow notify a browser)
