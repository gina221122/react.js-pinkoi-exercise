const API = '/api/stores.json';

function get() {
    return fetch(API).then(r => r.json());
}

export default { get }