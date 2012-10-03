(function($)
{
  /**

   What is sexytime.js?

   Simply put it helps to sexify your dates on your website.

   It finds dates based on a given selector, formats them or passes
   it on to a custom callback. Latter enables you to manipulate your
   DOM based on your needs.

   It can update your dates on a given interval.
   Also it can run in multiple instances based on your selectors.

   On top of that you get the complete power from Moment.js. Sweet!

   Any dependencies?

   Sexytime.js is based on Moment.js and comes as jQuery plugin.

   https://github.com/fightbulc/sexytime.js
   http://momentjs.com/
   http://jquery.com/

   ----------------------------------------------

   Dead simple example:
   $('time').sexytime()   // <time datetime="2012-09-11T10:00:00"></time>

   ----------------------------------------------

   By default time will be presented by "fromNow()".
   If you don't want that set your output to "absolute" and choose a format:

   $('time').sexytime({
      output: 'absolute',
      formatAbsolute: 'YYYY-MM-DD'
   })

   ----------------------------------------------

   All possible options:
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

   */

    // ############################################

  $.fn.sexytime = function(customOptions)
  {
    var $that = $(this);

    options = setOptions(customOptions);

    var momentNowObject = moment();

    $that.each(function() { handleElement($(this), options, momentNowObject) });

    if($that.length == 0 && options.updateOnSero !== true)
    {
      options.update = false;
    }

    if(options.update !== false)
    {
      setTimeout(function() { $($that.selector).sexytime(options) }, options.updateInterval*1000);
    }
  }

  // ############################################

  setOptions = function(customOptions)
  {
    // default options
    options = {

      hasCallback: false,

      source: 'iso8601',
      output: 'relative',

      formatRelative: moment.relativeTime,
      formatAbsolute: 'dd, DD.MM.YY / HH:mm',

      update: true,
      updateOnSero: true,
      updateInterval: 60

    };

    // merge options
    $.extend(options, customOptions);

    // forced options
    if(options.output == 'absolute')
    {
      options.update = false;
    }

    if(typeof options.relativeTime === 'object')
    {
      moment.relativeTime = options.formatRelative;
    }

    if(typeof options.callback === 'function')
    {
      options.hasCallback = true;
    }

    return options;
  }

  // ############################################

  handleElement = function($domElm, options, momentNowObject)
  {
    // get given time
    var dateString = $domElm.attr('datetime');

    // parse and create moment object
    var momentElmObject = options.source == 'iso8601' ? moment(dateString) : moment.unix(dateString);

    // default behaviour in case we have no callback
    if(options.hasCallback !== true)
    {
      var renderedDate = options.output === 'relative' ? momentElmObject.fromNow() : momentElmObject.format(options.formatAbsolute);
      $domElm.html(renderedDate);

      return;
    }

    // if we have a defined callback run it
    options.callback($domElm, options, momentElmObject, momentNowObject);
  }
})(jQuery);