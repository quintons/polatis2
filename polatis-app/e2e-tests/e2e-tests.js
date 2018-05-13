module.exports = {
    'Does not show the task list if there are no tasks'(client) {
        client
            .url('http://todomvc.com/examples/react/#/')
            .waitForElementVisible('.header h1')
            .expect.element('.main').to.not.be.present;
        client.end();
    },
    'Does not show the footer if there are no tasks'(client) {
        client
            .url('http://todomvc.com/examples/react/#/')
            .waitForElementVisible('.header h1')
            .expect.element('.footer').to.not.be.present;
        client.end();
    },
}