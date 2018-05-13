const path = require('path');

module.exports = function (request, response) {
    let targetFileName = 'GET.json';

    console.log(path.resolve(__dirname, targetFileName));

    // delete require.cache[require.resolve(targetFileName)];
    let res = require(path.resolve(__dirname, targetFileName))
    //
    console.log(res.data);

    response.json(res.data);
};