const admin = require("firebase-admin");
const serviceAccount = process.env.FIREBASE_ADMIN_KEY;

if (!serviceAccount) {
  throw new Error("FIREBASE_ADMIN_KEY environment variable is not set.");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
