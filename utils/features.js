const DataURIParser = require("datauri/parser");
const path = require("path");

const getDataUri = function (file) {
  const parser = new DataURIParser();
  const extName = path.extname(file.originalname);
  return parser.format(extName, file.buffer);
};

module.exports = { getDataUri };
