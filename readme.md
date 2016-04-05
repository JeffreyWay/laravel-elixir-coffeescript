# Laravel Elixir CoffeeScript Support

## Step 1: Install

```
npm install laravel-elixir-coffeescript --save-dev
```

## Step 2: Require and Use It

```
// Gulpfile.js

var elixir = require('laravel-elixir');

require('laravel-elixir-coffeescript');

elixir(function(mix) {
    mix.coffee('app.coffee);
});
```

## Step 3: None. You're Done.

- @jeffrey_way