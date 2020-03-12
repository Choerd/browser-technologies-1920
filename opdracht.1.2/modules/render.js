export function html(data, template, location) {
    location.insertAdjacentHTML('beforeend', Mustache.render(template, data))
}

export function htmlWithoutData(template, location) {
    location.insertAdjacentHTML('beforeend', Mustache.render(template, ""))
}

