function checkJavaScriptFeatures() {
  if (checkQuerySelectorAll() && checkAddEventListener() && checkSetAttribute(), checkClassList(), checkParentElement()) {
    return true
  }
}

function checkQuerySelectorAll() {
  if ('querySelectorAll' in document && typeof document.body.querySelectorAll === 'function') {
    return true
  }
}

function checkAddEventListener() {
  if ('addEventListener' in document && typeof document.body.addEventListener === 'function') {
    return true
  }
}

function checkSetAttribute() {
  if ('setAttribute' in document.body && typeof document.body.setAttribute === 'function') {
    return true
  }
}

function checkClassList() {
  if ('classList' in document.documentElement && typeof document.body.classList === 'object') {
    return true
  }
}

function checkParentElement() {
  if ('parentElement' in document.documentElement && typeof document.body.parentElement === 'object') {
    return true
  }
}

// function checkJavaScriptFeatures() {
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