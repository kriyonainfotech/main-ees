const express = require("express");

const routes = express.Router();

routes.use("/auth", require("../routes/authRoute"));
routes.use("/request", require("./requestRoute"));
routes.use("/banner", require("./bannerRoute"));
routes.use("/category", require("./categoryRoutes"));
routes.use("/banner", require("./bannerRoute"));
routes.use("/user", require("./ratingRoute"));
routes.use("/api", require("./referralRoute"));
routes.use("/payment", require("./paymentRoute"));

module.exports = routes;