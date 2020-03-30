"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function checkJavaScriptFeatures() {
  if (checkQuerySelectorAll() && checkAddEventListener() && checkSetAttribute(), checkClassList(), checkParentElement()) {
    return true;
  }
}

function checkQuerySelectorAll() {
  if ('querySelectorAll' in document && typeof document.body.querySelectorAll === 'function') {
    return true;
  }
}

function checkAddEventListener() {
  if ('addEventListener' in document && typeof document.body.addEventListener === 'function') {
    return true;
  }
}

function checkSetAttribute() {
  if ('setAttribute' in document.body && typeof document.body.setAttribute === 'function') {
    return true;
  }
}

function checkClassList() {
  if ('classList' in document.documentElement && _typeof(document.body.classList) === 'object') {
    return true;
  }
}

function checkParentElement() {
  if ('parentElement' in document.documentElement && _typeof(document.body.parentElement) === 'object') {
    return true;
  }
}

function addEventListener() {
  if ('addEventListener' in document && typeof document.body.addEventListener === 'function') {
    return true;
  } else {
    return false;
  }
}

if (checkJavaScriptFeatures()) {
  if (document.querySelector('[survey]')) {

    var inputs = document.querySelector('[survey]').querySelectorAll('input:not([type=hidden])');

    checkInputsOnBlur(inputs);
  }
}

function checkInputsOnBlur(inputs) {
  Array.prototype.forEach.call(inputs, function (input) {
    if (addEventListener()) {
      input.addEventListener('blur', function () {
        if (input.type === 'text' && input.pattern === '') {
          checkTextInput(input);
        }

        if (input.type === 'text' && input.pattern === '[0-9]*') {
          checkNumberInput(input);
        }

        if (input.type === 'tel') {
          checkTelInput(input);
        }

        if (input.type === 'email') {
          checkEmailInput(input);
        }
      });
    } else {
      input.attachEvent('onblur', function () {
        if (input.type === 'text' && input.pattern === '') {
          checkTextInput(input);
        }

        if (input.type === 'text' && input.pattern === '[0-9]*') {
          checkNumberInput(input);
        }

        if (input.type === 'tel') {
          checkTelInput(input);
        }

        if (input.type === 'email') {
          checkEmailInput(input);
        }
      });
    }
  })
}

function checkTextInput(input) {
  if (/^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(input.value)) {
    niceFeedback(input);
  } else if (/\d+/g.test(input.value)) {
    badFeedback(input, 'Whoops! Je hebt hier getallen ingevult, het moet tekst zijn.');
  } else if (input.value === '') {
    emptyFeedback(input, 'Whoops! Je hebt nog niks ingevult.');
  }
}

function checkNumberInput(input) {
  if (/^[0-9]+$/.test(input.value)) {
    niceFeedback(input, '');
  } else if (input.value.match(/^[A-Za-z]+$/)) {
    badFeedback(input, 'Whoops! Je hebt hier tekst ingevult, het moeten getallen zijn!');
  } else if (input.value === '') {
    emptyFeedback(input, 'Whoops! Je hebt nog niks ingevult.');
  }
}

function checkTelInput(input) {
  if (/^[0-9]+$/.test(input.value) && input.value.length > 9) {
    niceFeedback(input);
  } else if (/^[A-Za-z]+$/.test(input.value) || input.value.length < 10) {
    badFeedback(input, 'Whoops! Volgens mij is dit geen telefoonnummer');
  } else if (input.value === '') {
    emptyFeedback(input, 'Whoops! Je hebt nog niks ingevult.');
  }
}

function checkEmailInput(input) {
  if (input.value.indexOf('@') && input.value.indexOf('.') && input.value.length > 5) {
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