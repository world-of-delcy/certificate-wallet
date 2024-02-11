export const CERTIFICATE_WALLET_BACKEND_URL = "http://localhost:5000";

async function post(url, body) {
  try {
    const response = await fetch(CERTIFICATE_WALLET_BACKEND_URL + url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) return new Error(data.error);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function get(url) {
  try {
    const response = await fetch(CERTIFICATE_WALLET_BACKEND_URL + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) return new Error(data.error);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function formdata(url, body) {
  try {
    const response = await fetch(CERTIFICATE_WALLET_BACKEND_URL + url, {
      method: "POST",
      credentials: "include",
      body,
    });
    const data = await response.json();
    if (!response.ok) return new Error(data.error);

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getDownload(url) {
  try {
    const response = await fetch(CERTIFICATE_WALLET_BACKEND_URL + url, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.blob();
    if (!response.ok) return new Error(data.error);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function put(url, body) {
  try {
    const response = await fetch(CERTIFICATE_WALLET_BACKEND_URL + url, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) return new Error(data.error);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function deleteRequest(url) {
  try {
    const response = await fetch(CERTIFICATE_WALLET_BACKEND_URL + url, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) return new Error(data.error);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default {
  post,
  get,
  formdata,
  getDownload,
  put,
  delete: deleteRequest,
};
