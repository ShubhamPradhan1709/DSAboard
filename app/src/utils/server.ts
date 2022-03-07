declare const PRODUCTION: string;

export let BACKEND_URL: string;

if (PRODUCTION) {
  BACKEND_URL = "https://dsaboard-api.herokuapp.com";
} else {
  BACKEND_URL = "http://192.168.43.6:8000";
}

const fetchRoute = async (route: string) => {
  const response = await fetch(`${BACKEND_URL}/${route}`);

  if (response.ok) {
    const data = (await response.json());
    return data;
  } else {
    alert("Could not fetch data: Will be fixed soon!");
  }
};

export const getArrayData = async () => {
  const { array } = await fetchRoute("array") as { array: number[] };

  return array;
};
