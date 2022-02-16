declare const PRODUCTION: string;

let BACKEND_URL: string;

if (PRODUCTION) {
  BACKEND_URL = "https://dsaboard-api.herokuapp.com";
} else {
  BACKEND_URL = "http://192.168.43.6:8000";
}

export const fetchRoute = async (route: string) => {
  const response = await fetch(`${BACKEND_URL}/${route}`);

  if (response.ok) {
    const { data } = (await response.json()) as { data: any };
    return data;
  } else {
    alert("Could not fetch data: Will be fixed soon!");
  }
};

export { BACKEND_URL };
