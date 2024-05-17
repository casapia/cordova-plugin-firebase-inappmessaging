const fs = require("fs");
const path = require("path");
const execa = require("execa");

module.exports = (context) => {
  const platformPath = path.resolve(context.opts.projectRoot, "platforms/ios");
  const podfilePath = path.resolve(platformPath, "Podfile.lock");

  if (!fs.existsSync(podfilePath)) {
    console.log(
      `'${podfilePath}' does not exist. Firebase deployment fix skipped.`
    );
    return;
  }

  let podfileContent = fs.readFileSync(podfilePath, "utf-8");
  console.log("Podfile content: ", podfileContent);
  fs.writeFileSync(podfilePath, "", "utf-8");
  return execa("pod", ["install", "--repo-update"], {
    cwd: platformPath,
  });
};
