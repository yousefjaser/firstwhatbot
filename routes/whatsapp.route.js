const express = require("express");
const { sendMessage, logOut, checkNumber } = require("../controllers/whatsapp.controller");
const router = express.Router();

router.post("/", sendMessage);
router.post("/check-number", checkNumber);
router.get("/qr", (req, res) => {
  console.log(global.clientready, global.whatsappclient_qr);
  res.render("qr", {
    qr: global.whatsappclient_qr,
    clientready: global.clientready ? "yes" : "no",
    clientauthenticated: global.clientauthenticated ? "yes" : "no",
  });
});
router.route("/logout").get(logOut).post(logOut);

// إضافة مسار فحص الصحة
router.get("/health", (req, res) => {
  res.status(200).json({ status: "up" });
});

module.exports = router;
