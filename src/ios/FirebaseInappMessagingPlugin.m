#import "FirebaseInappMessagingPlugin.h"
@import Firebase;
@import FirebaseInAppMessaging;

@implementation FirebaseInappMessagingPlugin

- (void)setAutomaticDataCollectionEnabled:(CDVInvokedUrlCommand *)command {
    bool collectionEnabled = [[command.arguments objectAtIndex:0] boolValue];

    [FIRInAppMessaging inAppMessaging].automaticDataCollectionEnabled = collectionEnabled;

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setMessagesSuppressed:(CDVInvokedUrlCommand *)command {
    bool messagesSuppressed = [[command.arguments objectAtIndex:0] boolValue];

    [FIRInAppMessaging inAppMessaging].messageDisplaySuppressed = messagesSuppressed;

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

/*
 * Installation
 */
- (void)getInstallationId:(CDVInvokedUrlCommand*)command {
    [[FIRInstallations installations] installationIDWithCompletion:^(NSString * _Nullable installationID, NSError * _Nullable error) {
        if (error != nil) {
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        } else {
            NSLog(@"Installation ID: %@", installationID);
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:installationID];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    }];
}

@end
