'use strict';

var JStaticLoader = function (urls, options, successCallbackFn, errorCallbackFn) {
    var opts = {
            rxImage: /^.*\.(jpg|jpeg|png|bmp|gif|tiff|ico)$/,
            rxFile: /^.*\.(xml|json|js|css)$/
        },
        optsSelectorToRx = function (selector) {
            return new RegExp("^.*\.(" + selector.join('|') + ")$");
        };

    if (options.images) {
        opts.rxImage = optsSelectorToRx(options.images);
    }

    if (options.files) {
        opts.rxFile = optsSelectorToRx(options.files);
    }

    var workers = [],
        p1 = window.performance.now(),
        log = function (args) {
            options.verbose && console.log('JStaticLoader: ', args);
        },
        loadFile = function (path) {
            return new Promise(function (resolve, reject) {
                if (opts.rxImage.test(path)) {
                    /*
                        Load static images
                    */
                    var img = new Image();
                    img.onload = function () {
                        log("Successfully load image file", path);
                        resolve(img);
                    };
                    img.onerror = function () {
                        log("Failed to load image file", path);
                        reject("Failed to load image file (" + path + ")");
                    };
                    img.src = path;
                }
                else if (opts.rxFile.test(path)) {
                    /*
                        Load static files
                    */
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        log("Successfully load document file", path);
                        resolve(xhr);
                    };
                    xhr.onerror = function () {
                        log("Failed to load document file", path);
                        reject("Failed to load document file (" + path + ")");
                    };
                    xhr.open("GET", path);
                    xhr.responseType = "document";
                    xhr.send();
                }
                else {
                    reject("File not recognized (" + path + ")");
                }
            });
        };


    for (var i = 0, path; !!(path = urls[i]); i++) {
        var worker = loadFile(path);
        workers.push(worker);
    }

    Promise.all(workers)
    .then(function (vals) {
        var p2 = window.performance.now(),
            totalMs = p2 - p1;
        if (typeof(successCallbackFn) === 'function') {
            successCallbackFn(vals, totalMs);
        }
    })
    .catch(function(reason) {
        var p2 = window.performance.now(),
            totalMs = p2 - p1;
        if (typeof(errorCallbackFn) === 'function') {
            errorCallbackFn(reason, totalMs);
        }
    });
};

JStaticLoader.VERSION = '1.0.0';