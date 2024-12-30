import messaging from "./firebasconfig";
import { getToken, onMessage } from "firebase/messaging";

export const initializePushNotification = () => {
    Notification.requestPermission().then((permision) => {
        if (permision === "granted") {
            console.log("granted");
            return getToken(messaging)

        } else {
            console.log("denied");

        }

    })
        .then((token) => {
            console.log(token, "fcm token");
        })
        .catch((err) => {
            console.error("Unable to retrieve FCM token", err);
        });
}

