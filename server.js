var app, connect, port, static;

port = 8080;

connect = require('connect'),
static = require('serve-static');
app = connect();

app.use(static("./src"));
app.use(static("./"));
app.use(static("./dist"));
app.listen(port, function () {
    console.log('Serving LD32 on localhost:' + port);
});