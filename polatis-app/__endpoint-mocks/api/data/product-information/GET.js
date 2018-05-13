

module.exports = function (request, response) {
    let targetFileName = 'GET.json';
    response.sendFile(targetFileName, {root: __dirname})
};