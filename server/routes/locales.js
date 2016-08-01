const express = require("express");
const router = express.Router();
const cldr = require("cldr");

const localeIds = cldr.localeIds;

/**
 * Prepare localed data (for delimiters only)
 */
let localeData = {};
localeIds.map((localeId) => {
  localeData[localeId] = cldr.extractDelimiters(localeId);
  localeData[localeId]._id = localeId;
});

/**
 * Get the data for delimiters based on locales
 */
router.get('/', (req, res) => {
  let finalLocaleData = {}
  Object.keys(localeData).forEach((locale) => {
    finalLocaleData[locale] = {};
    Object.keys(req.query).forEach(key => {
      if (req.query[key] === "true") {
        finalLocaleData[locale][key] = localeData[locale][key];
      }
    });
  });
  res.send({
    response: finalLocaleData
  });
});

module.exports = router;
