const wP = require("web-push");
wP.setVapidDetails(
    "mailto:agung.wicaksaana@gmail.com",
    "BLJdXAADUQwHn8zmRutTiVS_q4Aq5kKwF-w7tisNoRvTXTZv4jlecvRlNc895uBRVbSpm3zK8lkQtqyc0o1GGoI",
    "r-SeUouOeeNxfRHiSPUhj1l9HS9Jm-IOa-085tmp8zw"
);

const pushSubs = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cv8NlhhcnHA:APA91bGd0M48GXefUO8HnJFZN6mVWL274t66TY0J1bbwihcb7jguiVG3H1PzSEje7S_CJQf9JgG84tp8x0UjW5jvoxMxOgzzcW46affB1GWT6UJSa-thUXAehYtXiVCh7KC3PkTdeoI7",
    "keys": {
        "p256dh": "BKHf8jkX88CbRvQvfqx/tqwRTKbmGixeZa3XNvOKPsbgwV3FAFO99/l+xIs/S/sPxWR4AJ6UFDiSLpe03z7zjDY=",
        "auth": "i1yx9VPmtjY9utH466RGcw=="
    }
};
const payload = "Notifikasi FCM!";
const opts = {
    gcmAPIKey : '633218760603',
    TTL: 60
}
wP.sendNotification(
    pushSubs,
    payload,
    opts
)