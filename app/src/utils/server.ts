declare const PRODUCTION: string;

let BACKEND_URL: string;

if (PRODUCTION) {
  BACKEND_URL = 'https://dsaboard-api.herokuapp.com';
} else {
  BACKEND_URL = 'http://192.168.43.6:8000';
}

export { BACKEND_URL };

