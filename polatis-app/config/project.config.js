
console.log('process.env.NODE_ENV....')
console.log(process.env.NODE_ENV || 'development')

const projectConfig = {
    env: process.env.NODE_ENV || 'development',
    lang: 'en',
    initialPage: '/app/subswitches/ports',
    offline: false
};

module.exports = projectConfig;