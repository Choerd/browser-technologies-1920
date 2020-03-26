"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

if (document.querySelector('[survey]')) {
  var inputs = nodeListToArray(document.querySelector('[survey]').querySelectorAll('input:not([type=hidden])'));
  checkInputsOnBlur(inputs);
}

function nodeListToArray(nodeList) {
  var array = [];

  var _iterator = _createForOfIteratorHelper(nodeList),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;
      array.push(node);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return array;
}

function checkInputsOnBlur(inputs) {
  inputs.forEach(function (input) {
    input.addEventListener('blur', function () {
      if (input.type === 'text' && !input.pattern.includes('[0-9]')) {
        checkTextInput(input);
      }

      if (input.type === 'text' && input.pattern.includes('[0-9]')) {
        checkNumberInput(input);
      }

      if (input.type === 'tel') {
        checkTelInput(input);
      }

      if (input.type === 'email') {
        checkEmailInput(input);
      }
    });
  });
}

function checkTextInput(input) {
  if (input.value.match(/^[A-Za-z]+$/)) {
    niceFeedback(input);
  } else if (input.value.match(/\d+/g)) {
    badFeedback(input, 'Whoops! Je hebt hier getallen ingevult, het moet tekst zijn.');
  } else if (input.value === '') {
    emptyFeedback(input, 'Whoops! Je hebt nog niks ingevult.');
  }
}

function checkNumberInput(input) {
  if (input.value.match(/^[0-9]+$/)) {
    niceFeedback(input, '');
  } else if (input.value.match(/^[A-Za-z]+$/)) {
    badFeedback(input, 'Whoops! Je hebt hier tekst ingevult, het moeten getallen zijn!');
  } else if (input.value === '') {
    emptyFeedback(input, 'Whoops! Je hebt nog niks ingevult.');
  }
}

function checkTelInput(input) {
  if (input.value.match(/^[0-9]+$/) && input.value.length > 9) {
    niceFeedback(input);
  } else if (input.value.match(/^[A-Za-z]+$/) || input.value.length < 10) {
    badFeedback(input, 'Whoops! Volgens mij is dit geen telefoonnummer');
  } else if (input.value === '') {
    emptyFeedback(input, 'Whoops! Je hebt nog niks ingevult.');
  }
}

function checkEmailInput(input) {
  if (input.value.includes('@') && input.value.includes('.') && input.value.length > 5) {
    niceFeedback(input);
  } else if (input.value === '') {
    emptyFeedback(input, 'Whoops! Je hebt nog niks ingevult.');
  } else {
    badFeedback(input, 'Whoops! Volgens mij is dit geen email adres');
  }
}

function niceFeedback(input) {
  var label = input.parentElement; // unset

  label.className = '';
  label.setAttribute('data-message', ''); // set

  label.classList.add('correct');
}

function badFeedback(input, message) {
  var label = input.parentElement; // unset

  label.className = '';
  label.setAttribute('data-message', ''); //set

  label.classList.add('wrong');
  label.setAttribute('data-message', message);
}

function emptyFeedback(input, message) {
  var label = input.parentElement; // unset

  label.className = '';
  label.setAttribute('data-message', ''); // set

  label.classList.add('wrong');
  label.setAttribute('data-message', message);
}