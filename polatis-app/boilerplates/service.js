

export const service = {
  getPromise
};

function getPromise (data) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, data);
    });
}