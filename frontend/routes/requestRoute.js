const express = require("express");
const {
  sentRequest,
  getUserRequests,
  getAllRequests,
  receivedRequest,
  cancelRequest,
} = require("../controllers/requestController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();
router.post("/sentRequest", verifyToken, sentRequest);
router.get("/getUserRequests", verifyToken, getUserRequests);
router.get("/getAllRequests", getAllRequests);
router.post("/receivedRequest", verifyToken, receivedRequest);
router.post("/cancelRequest", verifyToken, cancelRequest);
module.exports = router;