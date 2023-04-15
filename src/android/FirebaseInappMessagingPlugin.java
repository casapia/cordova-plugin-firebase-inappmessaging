package by.chemerisuk.cordova.firebase;

import com.google.firebase.inappmessaging.FirebaseInAppMessaging;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.json.JSONException;

import com.google.firebase.installations.FirebaseInstallations;
import com.google.firebase.installations.FirebaseInstallationsException;

import by.chemerisuk.cordova.support.CordovaMethod;
import by.chemerisuk.cordova.support.ReflectiveCordovaPlugin;

public class FirebaseInappMessagingPlugin extends ReflectiveCordovaPlugin {

    private String installationId;

    @CordovaMethod
    private void setAutomaticDataCollectionEnabled(CordovaArgs args, CallbackContext callbackContext)
            throws JSONException {
        boolean collectionEnabled = args.getBoolean(0);
        FirebaseInAppMessaging.getInstance().setAutomaticDataCollectionEnabled(collectionEnabled);
        callbackContext.success();
    }

    @CordovaMethod
    private void setMessagesSuppressed(CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        boolean messagesSuppressed = args.getBoolean(0);
        FirebaseInAppMessaging.getInstance().setMessagesSuppressed(messagesSuppressed);
        callbackContext.success();
    }

    @CordovaMethod
    private void getInstallationId(CallbackContext callbackContext) {
        if (installationId != null) {
            callbackContext.success(installationId);
            return;
        }

        FirebaseInstallations.getInstance().getId()
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful()) {
                        installationId = task.getResult();
                        callbackContext.success(installationId);
                    } else {
                        Exception e = task.getException();
                        if (e instanceof FirebaseInstallationsException) {
                            callbackContext.error("Installation ID error: " + e.getMessage());
                        } else {
                            callbackContext.error("Installation ID not available.");
                        }
                    }
                });
    }
}
