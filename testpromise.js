const assert = require('assert')

it('shoud use `done` for test?', function(done) {
    let promise = Promise.resolve(44)
    promise.then(function (value) {
        assert(value === 44)
        done()
    })
})