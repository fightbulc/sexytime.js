<pre>
   @@@
  @. .@                                 _                  _
  @\=/@                             _  (_)                (_)
  .- -.     ___ _____ _   _ _   _ _| |_ _ ____  _____     __  ___
 /(.|.)\   /___) ___ ( \ / ) | | (_   _) |    \| ___ |   |  |/___)
 \ ).( /  |___ | ____|) X (| |_| | | |_| | | | | ____| _ |  |___ |
 '( v )`  (___/|_____|_/ \_)\__  |  \__)_|_|_|_|_____)|_||  (___/
   \|/                      (____/                     (___/
   (|)
   '-`
</pre>

# Intro

### What is sexytime.js?
Simply put it helps to sexify your dates on your website.

It finds dates based on a given selector, formats them or passes it on to a custom callback.  
Latter enables you to manipulate your DOM based on your needs.

It can update your dates on a given interval. It runs in multiple instances based on your selectors.  
Further, it uses realtime selectors rather than cached once which results in live DOM update support.

On top of that you get the complete power from [Moment.js](http://momentjs.com). Sweet!

### Any dependencies?
Sexytime.js is based on [Moment.js](http://momentjs.com) and comes as [jQuery](http://jquery.com) plugin.


# Setup
Sample HTML bootstrap to get your sexytime going:
```html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Sexytime.js Bootstrap</title>
</head>
<body>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/1.7.0/moment.min.js"></script>
  <script src="sexytime.min.js"></script>

</body>
</html>
```

# Quick examples

### 1. Simple sexytime
```js
$('time').sexytime()
```
DOM Result:
```html
<time datetime="2015-05-15T12:00:00+0200">in 3 years</time>
<time datetime="2012-10-01T03:19:00+0200">2 days ago</time>
```

### 2. Render as absolute date
```js
$('time').sexytime({
   output: 'absolute'
})
```
DOM Result:
```html
<time datetime="2015-05-15T12:00:00+0200">Fr, 15.05.15 / 12:00</time>
<time datetime="2012-10-01T03:19:00+0200">Mo, 01.10.12 / 03:19</time>
```

### 3. Custom callback with 60s interval
This example requires [jQueryUI](http://jqueryui.com).
```js
$('time').sexytime({
   updateInterval: 60,

   callback : function($domElm, options, momentElm, momentNow)
   {
      // update date
      $domElm.html('60s interval: ' + momentElm.fromNow());

      // highlight $domElm for 3 seconds
      $domElm.effect('highlight', {}, 3000);
   }
})
```
DOM Result:
```html
<time datetime="2015-05-15T12:00:00+0200">60s interval: in 3 years</time>
<time datetime="2012-10-01T03:19:00+0200">60s interval: 2 days ago</time>
```


# Possible options
```js
$('time').sexytime({

  source: 'iso8601' || 'unix'                 // default = iso8601 (2012-09-24T17:20:00)
  output: 'relative' || 'absolute',           // default = relative

  update: true || false                       // default = true
  updateOnSero: true || false                 // default = true
  updateInterval: 60                          // default = 60s

  formatAbsolute: 'dd, DD.MM.YY / HH:mm',     // default = dd, DD.MM.YY / HH:mm

  formatRelative: {
    future: "in %s",
    past: "%s ago",
    s: "seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  },

  callback: function($domElm, options, momentElm, momentNow) {}

})
```

# Roadmap
Nothing scheduled yet.


# License
Sexytime.js is freely distributable under the terms of the MIT license.

Copyright (c) 2012 Tino Ehrich

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.