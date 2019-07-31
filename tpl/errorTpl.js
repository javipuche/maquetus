const errorTpl = (err, file) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Maquetus error</title>
        <style>
            * {
                box-sizing: border-box;
            }

            body {
                margin: 0;
                background-color: #2b2b2b;
                color: #fff;
                font-family: Helvetica, sans-serif;
            }

            h1 {
                font-size: 20px;
                font-weight: 400;
            }

            .container {
                padding: 24px;
            }

            pre {
                color: #ccc;
                background-color: #000;
                padding: 16px;
                max-width: 100%;
                overflow-x: auto;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Maquetus error:</h1>
            <p>${file}</p>
            <pre><code>${err}</code></pre>
        </div>
    </body>
</html>
`

module.exports = errorTpl
