

module.exports = function (request, response) {
    let targetFileName = 'POST.json';
    response.sendFile(targetFileName, {root: __dirname})
};