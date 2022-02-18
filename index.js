async function post(url, data) {
    const fetchResult = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data)
    });

    const response = await fetchResult.json();

    if (fetchResult.ok && fetchResult.status === 201) return response;

    let err = new Error();
    err = {
        ...err,
        ...{
            message: response.message || 'failed to post a request',
            code: response.status
        }
    };
    throw err;
}

const newDog = { dogName: 'Byron', dogBreed: 'Poodle' };

async function createDog() {
    try {
        const postResponse = await post('http://localhost:4000/dogs', newDog);
        console.log(postResponse);
    } catch (err) {
        console.debug('failed to create new dog', err);
    }
}

document.addEventListener('DOMContentLoaded', createDog);
