const wP = require("web-push");
wP.setVapidDetails(
    "mailto:agung.wicaksaana@gmail.com",
    "BA6PfBee9b5Z7zFEPKjbM9fuHPOJROx037oRdcHQSsRvBQd1tymR0lfTPTyFx64icbnY-iVsiq75KKfw-JwRoBg",
    "UwZ5vg1rGr23TyQ7ywIAc_4zMDsnlDrwdkN8DwMN2ls"
);
const pushSubs = {
    "endpoint": "<Ambil credential di console log (berubah-ubah)>",
    "keys": {
        "p256dh": "<Ambil credential di console log (berubah-ubah)>",
        "auth": "<Ambil credential di console log (berubah-ubah)>"
    }
};
const payload = "Notifikasi FCM!";
const opts = {
    gcmAPIKey : '633218760603',
    TTL: 60
}
wP.sendNotification(pushSubs,payload,opts)