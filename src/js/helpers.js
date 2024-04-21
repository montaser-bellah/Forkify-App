import { TIMEOUT_SECONDS } from './configuration.js';
const timeout = function (seconds) {
  return new Promise((_, reject) => {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${seconds} second`)
      );
    }, seconds * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uploadData),
  };

  const fetchPromise = uploadData ? fetch(url, options) : fetch(url);
  const response = await Promise.race([fetchPromise, timeout(TIMEOUT_SECONDS)]);
  const data = await response.json();
  if (!response.ok) throw new Error(`${data.message} (${response.status} )`);
  return data;
};

export const getJSON = async function (url) {
  const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
  const data = await response.json();
  if (!response.ok) throw new Error(`${data.message} (${response.status} )`);
  return data;
};

export const sendJSON = async function (url, uploadData) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uploadData),
  };

  const response = await Promise.race([
    fetch(url, options),
    timeout(TIMEOUT_SECONDS),
  ]);

  const data = await response.json();
  if (!response.ok) throw new Error(`${data.message} (${response.status} )`);
  return data;
};
