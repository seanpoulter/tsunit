#!/usr/bin/env node

"use strict";
const App = require("../dist/src/cli/App").App;
const app = new App(process.argv);
app.run();
