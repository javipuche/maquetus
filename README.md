# Maquetus

Maquetus es un sencillo generador de archivos estáticos que se usa con Gulp. Compila una serie de páginas en [Handlebars](https://handlebarsjs.com/) a HTML pudiendo usar partials, helpers o datos procedentes de un archivo JSON o YAML.

## Instalación

```
npm install maquetus
```

## Uso

### Estructura de archivos

```
.
├── ...
├── src       
│   ├── data  
|       ├── example.json       
|       ├── example2.yml     
|       └── ...   
│   ├── helpers
|       ├── bold.js       
|       └── ...
│   ├── layouts    
|       ├── default.hbs      
|       ├── post.hbs      
|       └── ...
│   ├── pages    
|       ├── index.hbs      
|       ├── post.hbs      
|       └── ...
│   └── partials    
|       ├── header.hbs      
|       ├── footer.hbs      
|       └── ...    
└── ...
```

**Nota:** Las páginas, los partials y los layouts pueden usar las extensiones `.html`, `.hbs`, or `.handlebars`.

### Gulpfile

```js
const gulp = require('gulp');
const maquetus = require('maquetus');

gulp.task('default', function() {
    gulp.src('./src/pages/**/*.hbs')
    .pipe(maquetus({
        layouts: './src/layouts',
        partials: './src/partials',
        helpers: './src/helpers',
        data: './src/data'
    }))
    .pipe(gulp.dest('./dist'));
});
```

## Opciones

| Opción     | Tipo                | Descripción                                                                                                                                                                              |
| ---------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `layouts`  | `String`            | Ruta que contiene los layouts. Es necesario tener uno llamado `default`.                                                                                                                 |
| `partials` | `String` o `Object` | Ruta que contiene los partials. Cada partial se registrará en Handelbars con la ruta del archivo. En caso de usar un objeto usará la key del objeto como alias.                          |
| `helpers`  | `String`            | Ruta que contiene los helpers. Cada helper se registrará en Handelbars con el nombre del archivo.                                                                                        |
| `data`     | `String`            | Ruta que contiene los data. Los datos del archivo serán accesibles mediante una variable llamada igual que el nombre del archivo. Los archivos pueden ser JSON (`.json`) o YAML (`.yml`) |

## Ejemplos

### Layouts

`layouts/post.hbs`

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>{{ pageTitle }}</title>
    </head>
    <body>
        <main>
            <h1>{{ postTitle }}</h1>
            {{ body }}
        </main>
        <aside>
            <!-- ... -->
        </aside>
    </body>
</html>
```

`pages/post.hbs`

```html
---
layout: post
pageTitle: Best Blog
postTitle: Lorem ipsum
---

<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
```

**Nota:** Si el layout no está definido llamará por defecto al `default`.

### Partials

`gulpfile.js`

```js
// Single path
maquetus({
    partials: './src/partials'
})

// Multiple paths
maquetus({
    partials: {
        components: './src/components',
        partials: './src/partials'
    }
})
```

`post.hbs`

```html
---
layout: post
---

<!-- Si es de tipo String -->
{{> header }}
{{> subDir/example }} <!-- En caso de estar en un subdirectorio -->

<!-- Si es de tipo Object -->
{{> components/example }}
{{> components/subDir/example }} <!-- En caso de estar en un subdirectorio -->
{{> partials/example }}
{{> partials/subDir/example }} <!-- En caso de estar en un subdirectorio -->
```

### Helpers

Maquetus ya incluye algunos helpers:

#### ifpage

```html
{{#ifpage 'index'}}
  <p>Se mostrará si la página se llama index.html</p>
{{/ifpage}}
```

#### unlesspage

```html
{{#ifpage 'index'}}
  <p>No se mostrará si la página se llama index.html</p>
{{/ifpage}}
```

#### repeat

```html
<ul>
  {{#repeat 5}}
      <li>Lorem ipsum dolor sit amet.</li>
  {{/repeat}}
</ul>
```

#### markdown

```html
{{#markdown}}
    # Heading 1
    Lorem ipsum [dolor sit amet](http://html5zombo.com), consectetur adipisicing elit. Nam dolor, perferendis. Mollitia aut dolorum, est amet libero eos ad facere pariatur, ullam dolorem similique fugit, debitis impedit, eligendi officiis dolores.
{{/markdown}}
```

#### Custom

`bold.js`

```js
module.exports = function(options) {
  const bolder = '<strong>' + options.fn(this) + '</strong>';
  return bolder;
}
```

`index.hbs`

```html
<p>{{#bold}}Lorem ipsum dolor sit amet.{{/bold}}</p>
```

### Data

**Importante:** No usar las variables `body`, `root` y `page` ya que se usan por maquetus.

`example.json`

```json
{
    "name": "Javier Puche",
    "phone": "666 66 66 66"
}
```

`index.hbs`

```html
<h2>{{ example.name }}</h2>
<p>{{ example.phone }}</p>
```
