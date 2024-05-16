const fs = require("fs");
const path = require("path");
const execa = require("execa");

module.exports = (context) => {
  const platformPath = path.resolve(context.opts.projectRoot, "platforms/ios");
  const podfilePath = path.resolve(platformPath, "Podfile");

  if (!fs.existsSync(podfilePath)) {
    console.log(
      `'${podfilePath}' does not exist. Firebase deployment fix skipped.`
    );
    return;
  }

  let podfileContent = fs.readFileSync(podfilePath, "utf-8");
  console.log("X Fixing Podfile for Firebase InAppMessaging");
  console.log(podfileContent);

  console.log("X Running pod install --repo-update");
  return execa("pod", ["install", "--repo-update"], {
    cwd: platformPath,
  });
};
