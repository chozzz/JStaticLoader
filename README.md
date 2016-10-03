# JStaticLoader

A Javascript library to load all static files and perform tasks afterwards.

This development is mainly intended to support any web applications that require to load all static assets as such to be used in the application itself afterward by loading it from caches.

## Usage
```
JStaticLoader(staticUrls, options, successCallback, errorCallback)
```

Params              | Description
---                 | ---
staticUrls          | `An array containing the list of all static files url`
options             | `An object to override default options`
successCallback     | `A function to run when all static files have been loaded successfully`
errorCallback       | `A function to run when there's an error occurred when url failed to load`

## Example
```
<script type="text/javascript" charset="utf-8">
    document.addEventListener("DOMContentLoaded", function () {
        var staticUrls = [
            "../assets/image/file1.png",
            "../assets/image/file2.jpg",
            "../assets/image/file3.bmp",
            "../assets/jsons/my-big-data.json"
        ];

        JStaticLoader(staticUrls, {
            images: ['jpg', 'png', 'bmp'],
            files: ['json'],
            verbose: false
        },
        function (vals, totalTime) {
            var infoMessage = "Took " + (totalTime / 1000).toFixed(5) + " seconds";
            console.log("Success ", infoMessage);
        },
        function (error, totalTime) {
            var infoMessage = "Took " + (totalTime / 1000).toFixed(5) + " seconds";
            console.log("Failed ", infoMessage);
        });
    });
</script>
```