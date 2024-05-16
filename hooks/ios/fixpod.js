// const fs = require("fs");
const path = require("path");
const execa = require("execa");

module.exports = (context) => {
  const platformPath = path.resolve(context.opts.projectRoot, "platforms/ios");
  //   const podfilePath = path.resolve(platformPath, "Podfile");

  //   if (!fs.existsSync(podfilePath)) {
  //     console.log(
  //       `'${podfilePath}' does not exist. Firebase deployment fix skipped.`
  //     );
  //     return;
  //   }

  //   let podfileContent = fs.readFileSync(podfilePath, "utf-8");
  //   if (podfileContent.indexOf("post_install") == -1) {
  //     podfileContent =
  //       `pod install --repo-update
  // ` + podfileContent;
  //     fs.writeFileSync(podfilePath, podfileContent, "utf-8");
  console.log("Running pod install --repo-update --verbose");
  return execa("pod", ["install", "--repo-update --verbose"], {
    cwd: platformPath,
  });
  //   }
};
