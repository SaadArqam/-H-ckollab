import admin from 'firebase-admin';

// Load and decode base64 service account config from environment variable
const base64Config = process.env.FIREBASE_CONFIG_BASE64;

if (!base64Config) {
  throw new Error("Missing FIREBASE_CONFIG_BASE64 environment variable.");
}

const serviceAccount = JSON.parse(
  Buffer.from(base64Config, 'base64').toString('utf8')
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
