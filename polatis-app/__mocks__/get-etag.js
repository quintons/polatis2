

export const mock_getEtag = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        getEtag: mock_getEtag
    }
})