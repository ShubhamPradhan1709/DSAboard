declare const PRODUCTION: string;

export let BACKEND_URL: string;

if (PRODUCTION) {
  BACKEND_URL = "https://studious-server.azurewebsites.net/api/dsaboard";
} else {
  BACKEND_URL = "http://localhost:8000/api/dsaboard";
  // BACKEND_URL = "http://192.168.43.6:8000";
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

export const getBSTData = async () => {
  const { array } = await fetchRoute("bst") as { array: number[] };

  return array;
};

