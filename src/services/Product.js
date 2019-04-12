const API = '/api/drinks.json';

function get() {
    return fetch(API).then(r => r.json());
}

export default { get }