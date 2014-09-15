var express = require('express');
var lessMiddleware = require('less-middleware');
var path = require('path');
var app = express();
app.set('view engine', 'jade');

/**
 * Current working directory for the app
 * @type {String}
 */
var cwd = process.cwd();

//Set all the paths relative to the ng app
var cssPath = path.join(cwd, 'ng-app', 'styles');
var imgPath = path.join(cwd, 'ng-app', 'images');
var jsPath = path.join(cwd, 'ng-app', 'scripts');
var jadePath = path.join(cwd, 'ng-app', 'views', 'jade');

//Compile less on the fly
app.use(lessMiddleware(path.join(cwd, 'ng-app'), {
    dest: path.join(cwd, 'ng-app'),
    preprocess: {
        path: function(pathname, req) {
            return pathname.replace('css', 'less');
        }
    }
}));

//Set the static routes
app.use('/styles', express.static(cssPath));
app.use('/scripts', express.static(jsPath));
app.use('/images', express.static(imgPath));

//Set the defualt jade template directory
app.set('views', jadePath);

/*Define the base routes*/
app.get('/', function(req, res) {
    res.sendFile(cwd + '/ng-app/index.html');
});
//Get data from the server regarding locale and then redirect/use local language
app.get('/cm', function(req, res) {
    res.render('login', {});
});

/**
 * Listen on port 3000
 */
app.listen(3000);
console.log('Listening on port 3000');