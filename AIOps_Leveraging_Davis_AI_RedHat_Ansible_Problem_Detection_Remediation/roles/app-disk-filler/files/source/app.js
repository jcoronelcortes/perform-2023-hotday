const express = require("express");
const asyncHandler = require("express-async-handler");
const fs = require("fs");

// Constants
const PORT = 4010;
const HOST = "0.0.0.0";

const copyPDFFile = (fileName, size) => {
  return new Promise((resolve, reject) => {
    fh = fs.copyFile("anomaly-detection.pdf", fileName, (err) => {
      if (err) throw err;
      console.log("pdf was copied to " + fileName);
    });

    resolve(true);
  });
};

// App
const app = express();
app.get(
  "/",
  asyncHandler(async (req, res) => {
    for (let i = 0; i < 20; i++) {
      console.log("creating PDF files version " + i);
      copyPDFFile(
        "/storage/" + Date.now() + Math.floor(Math.random() * 100) + ".pdf"
      );
    }
    res.send("Files created ");
  })
);
app.get(
  "/full",
  asyncHandler(async (req, res) => {
    for (let i = 0; i < 20; i++) {
      console.log("creating PDF files version " + i);
      copyPDFFile(
        "/storage2/" + Date.now() + Math.floor(Math.random() * 100) + ".pdf"
      );
    }
    res.send("Other files created ");
  })
);
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
