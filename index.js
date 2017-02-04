var http = require('http');
var fs = require('fs');
// var prompt = require('prompt');
var readline = require('readline');
var port = 8080;

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log("Server is running on port 8080");

var inputFileName = '';

rl.question("Please enter a filename: ", (answer) => {
    console.log('The filename is: ' + answer);
    inputFileName = answer;
    rl.close();
    copyFile(inputFileName);
    writeFileToConsole(inputFileName);
});

 var writeFileToConsole = (inFile) => {
    var myLines = require('fs')
                    .readFileSync(inFile)
                    .toString()
                    .match(/^.+$/gm);

    console.log(myLines);
 };

var copyFile = function(inFile) {
    fs.readFile(inFile, function(err, content) {
        fs.writeFile(inFile + "_copy", content, function(err) {
            console.log("copy complete");
        });
    });
};

http.createServer( function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile(inputFileName, function(err, content) {
        res.end(content);
    });
}).listen(port);

