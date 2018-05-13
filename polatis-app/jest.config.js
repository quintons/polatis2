module.exports = {
    setupFiles: ['./jest.setup.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testEnvironment: 'jsdom'
};