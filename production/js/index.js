"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
} // function checkJavaScriptFeatures() {
//   if (documentChecker() && documentBodyChecker() && documentObjectChecker()) {
//     return true
//   }
// }
// function documentChecker() {
//   const features = ['querySelectorAll', 'addEventListener']
//   const checker = (feature) =>
//     feature in document && typeof document.body[feature] === 'function'
//   return features.every(checker)
// }
// function documentBodyChecker() {
//   const features = ['setAttribute']
//   const checker = (feature) =>
//     feature in document.body && typeof document.body[feature] === 'function'
//   return features.every(checker)
// }
// function documentObjectChecker() {
//   const features = ['classList', 'parentElement']
//   const checker = (feature) =>
//     feature in document.documentElement && typeof document.body[feature] === 'object'
//   return features.every(checker)
// }


function addEventListener() {
  if ('addEventListener' in document && typeof document.body.addEventListener === 'function') {
    return true;
  } else {
    return false;
  }
}

if (checkJavaScriptFeatures()) {
  if (document.querySelector('[survey]')) {
    var inputs = _toConsumableArray(document.querySelector('[survey]').querySelectorAll('input:not([type=hidden])'));

    checkInputsOnBlur(inputs);
  }
}

function checkInputsOnBlur(inputs) {
  inputs.forEach(function (input) {
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
  });
}

function checkTextInput(input) {
  if (/^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(input.value)) {
    console.log('ja')
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