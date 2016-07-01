# Laravel Elixir CoffeeScript Support

This extension supports Laravel Elixir v6 and up. For older versions, CoffeeScript
support was already baked in.

## Step 1: Install

```
npm install laravel-elixir-coffeescript --save-dev
```

## Step 2: Use It

```js
// Gulpfile.js

var elixir = require('laravel-elixir');

elixir(function(mix) {
    // Examples:

    mix.coffee('app.coffee');

    mix.coffee('app.coffee', 'public/output');

    mix.coffee('app.coffee', 'public/output/file.js');

    // https://github.com/wearefractal/gulp-coffee#options
    mix.coffee('app.coffee', 'public/output/file.js', options);
});
```

## Step 3: None. You're Done.
