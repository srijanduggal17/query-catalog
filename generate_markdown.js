const React = require('react');
const fs = require('fs');
const QueryView = require('./QueryView.js'); 
const ReactDOMServer = require('react-dom/server');


let html = ReactDOMServer.renderToStaticMarkup(<QueryView />);
let htmlWDoc = "<!DOCTYPE html>" + html;
let outputFile = "./output.html";
fs.writeFileSync(outputFile, htmlWDoc);
console.log(`Wrote ${outputFile}`);