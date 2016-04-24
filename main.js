var http = require("http"),
  path = require("path"),
  fs = require("fs");

http.createServer(function(req, res){
  var filename = path.basename(req.url) || "index.html",
    ext = path.extname(filename),
    localPath = __dirname + "/public/";

  if (ext == ".html") {
    localPath += filename;

    fs.lstat(localPath, function(err, stats){
      if (!err) {
        getFile(localPath, res);
      } else {
        res.writeHead(404);
        res.end();
      }
    });
  }
}).listen(8000, "127.0.0.1");

function getFile(localPath, res){
  fs.readFile(localPath, function(err, contents){
    if (!err){
      res.end(contents);
    } else {
      res.writeHead(500);
      res.end();
    }
  });
}
