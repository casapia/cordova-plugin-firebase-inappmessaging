const fs = require("fs");
const path = require("path");
const execa = require("execa");
// const { ConfigParser } = require('cordova-common');

module.exports = (context) => {
    const platformPath = path.resolve(context.opts.projectRoot, "platforms/ios");
    const podfilePath = path.resolve(platformPath, "Podfile");

    if (!fs.existsSync(podfilePath)) {
        console.log(`'${podfilePath}' does not exist. Firebase deployment fix skipped.`);
        return;
    }

    // const projectRoot = context.opts.cordova.project ? context.opts.cordova.project.root : context.opts.projectRoot;
    // const configXML = path.join(projectRoot, 'config.xml');
    // const configParser = new ConfigParser(configXML);

    // const targetBuildDevelopmentTeam = configParser.getGlobalPreference("IOS_BUILD_DEVELOPMENT_TEAM");
    // if (!targetBuildDevelopmentTeam || targetBuildDevelopmentTeam.length === 0) {
    //     return;
    // }

    let podfileContent = fs.readFileSync(podfilePath, "utf-8");
    if (podfileContent.indexOf("post_install") == -1) {
        //         podfileContent += `

        // post_install do |installer|
        //   installer.generated_projects.each do |project|
        //     project.targets.each do |target|
        //         target.build_configurations.each do |config|
        //             config.build_settings["DEVELOPMENT_TEAM"] = "${targetBuildDevelopmentTeam}"
        //          end
        //     end
        //   end
        // end

        // `;
        podfileContent += `

post_install do |installer|
  installer.pods_project.targets.each do |target|
    if target.respond_to?(:product_type) and target.product_type == "com.apple.product-type.bundle"
      target.build_configurations.each do |config|
          config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'
      end
    end
  end
end

`;
        fs.writeFileSync(podfilePath, podfileContent, "utf-8");
        return execa("pod", ["install", "--verbose"], {
            cwd: platformPath,
        });
    }
};