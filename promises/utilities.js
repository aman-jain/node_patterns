'use strict'

function promisify(functionToBePromisified) {
    return function promisified() {

        let args = [].slice.call(arguments);

        return new Promise(function(resolve, reject) {

            args.push((err, result) => {

                if (err) {
                    reject(err);
                } else {
                    if (arguments.length <= 2) {

                        resolve(result)
                    } else
                        resolve([].slice.call(arguments, 1));
                }
            });
            functionToBePromisified.apply(null, args);
        });
    }
}
module.exports.promisify = promisify;