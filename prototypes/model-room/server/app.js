const express = require("express");
const os = require("os");
const path = require("path");
const expressWs = require("express-ws");
const appRoot = require("app-root-path");

const port = 8080;
const ews = expressWs(express());
const app = ews.app;

app.use(express.static(path.join(appRoot.path, "/web")));




app.listen(port);
