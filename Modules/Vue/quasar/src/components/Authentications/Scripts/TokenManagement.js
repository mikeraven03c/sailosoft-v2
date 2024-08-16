const TOKEN = 'bearer-token';

export default function TokenManagementServices() {
  function storeToken(token) {
    localStorage.setItem(TOKEN, token);
  }

  function removeToken() {
    localStorage.removeItem(TOKEN)
  }

  function getToken() {
    localStorage.getItem(TOKEN)
  }

  function createAuthorizationHeader() {
    const token = getToken();
    const header = token ? {
      Authorization: `Bearer ${token}`
    } : {}

    return header;
  }

  return {
    storeToken,
    removeToken,
    getToken,
    createAuthorizationHeader
  }
}

/*
const jwt = require('jsonwebtoken');

// Sign
const payload = { data: 'your-data' };
const secretKey = 'your-secret-key';
const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });

// Verify
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('Token verification failed:', err);
  } else {
    console.log('Decoded Token:', decoded);
  }
});
*/