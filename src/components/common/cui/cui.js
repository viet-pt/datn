import * as _ from 'underscore';
import $ from 'jquery';

const cui = {};

cui.extend = function (destination, sources) {
  return _.extend.apply(undefined, arguments);
};

cui.each = function (array, iteratee, context) {
  return _.each(array, iteratee, context);
};

cui.every = function (array, predicate, context) {
  return _.every(array, predicate, context);
};

cui.jQueryExtend = function (deepCopy, destination, source) {
  return $.extend(deepCopy, destination, source);
};

cui.trim = function (orgStr) {
  return $.trim(orgStr);
};

cui.extendAfterSubtract = function (destination, source) {
  const tempSource = cui.copy(source);
  const result = cui.copy(destination);

  const subtractor = (dest, src) => {
    for (const key in src) {
      if (cui.has(dest, key) === false) {
        delete src[key];
      } else if (
        Object.prototype.toString.call(src[key]) === '[object Object]'
      ) {
        subtractor(dest[key], src[key]);
      }
    }
  };

  subtractor(destination, tempSource);
  $.extend(true, result, tempSource);
  return result;
};

cui.find = function (array, predicate, context) {
  return _.find(array, predicate, context);
};

cui.keys = function (object) {
  return _.keys(object);
};

cui.first = function (array, n, guard) {
  return _.first(array, n, guard);
};

cui.map = function (array, iteratee, context) {
  return _.map(array, iteratee, context);
};

cui.countBy = function (array, iteratee, context) {
  return _.countBy(array, iteratee, context);
};

cui.filter = function (array, predicate, context) {
  return _.filter(array, predicate, context);
};

cui.difference = function (array, others) {
  return _.difference.apply(undefined, arguments);
};

cui.pick = function (object, iteratee, context) {
  return _.pick.apply(undefined, arguments);
};

cui.pluck = function (array, key) {
  return _.pluck(array, key);
};

cui.pluckWithoutUndefinedOrNull = function (array, key) {
  return cui.filter(cui.pluck(array, key), (value) => cui.isUndefinedOrNull(value) === false);
};

cui.union = function (array) {
  return _.union(array);
};

cui.contains = function (array, target) {
  return _.contains(array, target);
};

cui.findWhere = function (array, properties) {
  return _.findWhere(array, properties);
};

cui.range = function (start, stop, step) {
  return _.range.apply(undefined, arguments);
};

cui.indexOf = function (array, value, isSorted) {
  return _.indexOf(array, value, isSorted);
};

cui.sortBy = function (array, iteratee) {
  return _.sortBy(array, iteratee);
};

cui.findIndex = function (array, value) {
  return _.findIndex(array, value);
};

cui.isEqual = function (object, other) {
  return _.isEqual(object, other);
};

cui.copy = function (source, destination) {
  if (!cui.isUndefinedOrNull(destination)) {
    destination = null;
    destination = JSON.parse(JSON.stringify(source));
    return;
  }
  return JSON.parse(JSON.stringify(source));
};

cui.isEqualArrayWithSort = function (array, other) {
  if (cui.isArray(array) && cui.isArray(other)) {
    const firstArr = cui.copy(array);
    const secondArr = cui.copy(other);
    return _.isEqual(firstArr.sort(), secondArr.sort());
  } 
  return false;
  
};

cui.isEmpty = function (object) {
  return _.isEmpty(object);
};

cui.isEmptyObject = function (object) {
  for (const key in object) {
    if (cui.isObject(object[key])) {
      if (cui.isEmptyObject(object[key]) === false) {
        return false;
      }
    } else if (cui.isArray(object[key])) {
      if (object[key].length > 0) {
        if (cui.isEmptyObject(object[key]) === false) {
          return false;
        }
      }
    } else if (cui.isString(object[key])) {
      if (object[key].length > 0) {
        return false;
      }
    } else if (cui.isUndefinedOrNull(object[key]) === false) {
      return false;
    }
  }
  return true;
};

cui.isElement = function (object) {
  return _.isElement(object);
};

cui.isArray = function (object) {
  return _.isArray(object);
};

cui.isArguments = function (object) {
  return _.isArguments(object);
};

cui.isString = function (object) {
  return _.isString(object);
};

cui.isNumber = function (object) {
  return _.isNumber(object);
};

cui.isFinite = function (object) {
  return _.isFinite(object);
};

cui.isBoolean = function (object) {
  return _.isBoolean(object);
};

cui.isDate = function (object) {
  return _.isDate(object);
};

cui.isRegExp = function (object) {
  return _.isRegExp(object);
};

cui.isNaN = function (object) {
  return _.isNaN(object);
};

cui.isObject = function (value) {
  return _.isObject(value);
};

cui.isNull = function (object) {
  return _.isNull(object);
};

cui.isDefined = function (object) {
  return !_.isUndefined(object);
};

cui.isUndefined = function (object) {
  return _.isUndefined(object);
};

cui.isUndefinedOrNull = function (object) {
  if (cui.isUndefined(object) || cui.isNull(object)) {
    return true;
  }
  return false;
};

cui.removeAllKeysInObject = function (object) {
  for (const key in object) {
    delete object[key];
  }
  return object;
};

cui.removeAllArray = function (array) {
  for (;;) {
    if (array.length === 0) {
      break;
    }
    array.pop();
  }
  return array;
};

cui.isFunction = function (object) {
  return object && typeof object === 'function';
};

cui.getIEVersion = function () {
  let msie = parseInt(
    (/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1],
    10,
  ); //support IE 8,9 user agent
  if (cui.isNaN(msie)) {
    //support IE 10 over
    msie = parseInt(
      (/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase())
        || [])[1],
      10,
    );
  }
  if (cui.isNaN(msie)) {
    // else.. chrome, etc..
    msie = 0;
  }
  return msie;
};

cui.getBrowserName = function () {

  const { userAgent } = window.navigator;

  const browsers = {
    chrome: /chrome/i,
    safari: /safari/i,
    firefox: /firefox/i,
    ie: /internet explorer/i,
  };

  for (const key in browsers) {
    if (browsers[key].test(userAgent)) {
      return key;
    }
  }

  return 'unknown';
};

cui.wrap = function (fn, wrapper) {
  return _.wrap(fn, wrapper);
};

cui.jsonValidation = function (str) {
  let result;
  try {
    result = JSON.parse(str);
  } catch (error) {
    return false;
  }
  return cui.isObject(result);
};

cui.some = function (object) {
  return _.some(object);
};

cui.clone = function (object) {
  return _.clone(object);
};

cui.bytesToSize = function (bytes, roundSize) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (cui.isNumber(bytes) === false || bytes === 0 || bytes < 0) {
    return '0 Byte';
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i > 0) {
    bytes = (bytes / Math.pow(1024, i)).toFixed(1);
    if (roundSize) {
      bytes = Math.round(bytes);
    }
  }
  return `${bytes} ${sizes[i]}`;
};

cui.getRandomUId = function () {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomID = '';
  for (let index = 0; index < 10; index++) {
    randomID += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return randomID;
};

cui.has = function (object, key) {
  return _.has(object, key);
};

cui.extractExtension = function (fileName) {
  return fileName.split('.').pop();
};

cui.startsWith = function (string, prefix) {
  return string.indexOf(prefix) === 0;
};

cui.endsWith = function (string, suffix) {
  return string.indexOf(suffix, string.length - suffix.length) !== -1;
};

export default cui;
