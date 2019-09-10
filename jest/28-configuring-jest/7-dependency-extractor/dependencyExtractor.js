const fs = require("fs");
const crypto = require("crypto");

module.exports = {
  extract(code, filePath, defaultExtract) {
    const deps = defaultExtract(code, filePath);
    console.log(deps);
    // Scan the file and add dependencies in `deps` (which is a `Set`)
    return deps;
  },
  getCacheKey() {
    return crypto
      .createHash("md5")
      .update(fs.readFileSync(__filename))
      .digest("hex");
  }
};
