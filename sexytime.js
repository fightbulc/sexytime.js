(function($)
{
  /**

   Sexytime transforms a given time string the way you need it.
   You can enable sexytime to do this in a given interval with the
   possibility to adjust datetime's format and representation.
   In case that you need total flexibility you can pass a callback
   function which passes through everything you might need to work
   on your datetime element.

   Sexytime uses moment.js and runs as a jquery plugin.

   http://momentjs.com/
   http://jquery.com/

   Dead simple example:
   $('time').sexytime()   // <time datetime="2012-09-11T10:00:00"></time>

   ----------------------------------------------

   By default time will be presented by "fromNow()".
   If you don't want that name your type "absolute" and
   choose a format:
   $('time').sexytime({type: 'absolute', format: 'YYYY-MM-DD'})

   ----------------------------------------------

   All possible options:
   $('time').sexytime({
      source: 'iso8601' || 'unix'          // default = iso8601 (2012-09-24T17:20:00)

      type: 'relative' || 'absolute',     // default = relative

      update: true || false               // default = true

      intervalSeconds: 60                 // default = 60

      format: 'dd, DD.MM.YY / HH:mm',     // default = dd, DD.MM.YY / HH:mm

      relativeTime: {
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

  $.fn.sexytime = function(options)
  {
    var $that = $(this);

    options = setOptions(options);

    var momentNowObject = moment();

    $that.each(function() { handleElement($(this), options, momentNowObject) });

    if(options.update === true)
    {
      setTimeout(function() { $that.sexytime(options) }, options.intervalSeconds*1000);
    }
  }

  // ############################################

  setOptions = function(options)
  {
    options = options || {};
    options.hasCallback = false;

    if(typeof options.update === 'undefined')
    {
      options.update = true;
    }

    if(typeof options.intervalSeconds === 'undefined')
    {
      options.intervalSeconds = 60;
    }

    if(typeof options.source === 'undefined')
    {
      options.source = 'iso8601';
    }

    if(typeof options.type === 'undefined')
    {
      options.type = 'relative';
    }

    if(options.type == 'absolute')
    {
      options.update = false;
    }

    if(typeof options.relativeTime === 'object')
    {
      moment.relativeTime = options.relativeTime;
    }
    else
    {
      options.relativeTime = moment.relativeTime;
    }

    if(typeof options.format === 'undefined')
    {
      options.format = 'dd, DD.MM.YY / HH:mm';
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
    if(options.hasCallback === false)
    {
      var renderedDate = options.type === 'relative' ? momentElmObject.fromNow() : momentElmObject.format(options.format);
      $domElm.html(renderedDate);

      return;
    }

    // if we have a defined callback run it
    options.callback($domElm, options, momentElmObject, momentNowObject);
  }
})(jQuery);