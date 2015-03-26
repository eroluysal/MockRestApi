var gulp = require('gulp');
var webserver = require('gulp-webserver');
var fs = require('fs');

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      port: 8000,
      livereload: true,
      directoryListing: true,
      open: true,
      fallback: 'index.html',
      middleware: function(request, response, next) {

        var path = request.originalUrl;
        var method = request.method;

        fs.readFile('./app'+path+'/'+method+'.json', function(error, buffer) {
          if (error) return next(error);

          var responseHeader = {
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': buffer.length
            },
            body: buffer
          };

          response.writeHeader(200, responseHeader.headers);

          response.end(responseHeader.body);
        });
      }
    }));
});