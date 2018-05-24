module.exports = {
    logger,
    // greeter,
};


// logger middleware
function logger(msg) {
    return function (req, res, next) {
        console.log(`${msg || 'requesting'}: ${req.url}`);
        next();
    }
}

function errorHandler(err, req, res) {
    return function (req, res) {

    }
}

// function greeter() {
//     return function (req, res, next) {
//         if (req.query.passcode === 'gandalf'){
//             next()
//         } else {
//             res.send(' YOU SHOULD NOT PASS')
//         }

//     }
// }
