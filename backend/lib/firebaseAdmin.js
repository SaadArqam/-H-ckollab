import admin from 'firebase-admin';

// Debug prints
console.log("🔥 ENV FIREBASE_CONFIG_BASE64 exists?", !!process.env.FIREBASE_CONFIG_BASE64);
console.log("🌱 FIREBASE_CONFIG_BASE64 preview:", process.env.FIREBASE_CONFIG_BASE64?.slice(0, 30));

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
