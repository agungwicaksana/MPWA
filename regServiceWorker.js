if("serviceWorker" in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js')
        .then(() => console.log("Service Worker berhasil didaftarkan"))
        .catch(() => console.log("Service Worker gagal didaftarkan"));
    
    if("Notification" in window) {
        Notification.requestPermission().then(res => {
            if(res==="granted"){
                if("PushManager" in window){
                    navigator.serviceWorker.getRegistration().then(reg=>{
                        reg.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: convertToUint("BA6PfBee9b5Z7zFEPKjbM9fuHPOJROx037oRdcHQSsRvBQd1tymR0lfTPTyFx64icbnY-iVsiq75KKfw-JwRoBg")
                        }).then(subs=>{
                            console.log('Berhasil subscribe')
                            console.log('endpoint: ', subs.endpoint)
                            console.log('p256dh: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subs.getKey("p256dh")))))
                            console.log('Auth: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subs.getKey("auth")))))
                        }).catch(err=>{
                            console.log('Subscribe gagal: ', err)
                        })
                    })
                }
            }
        })
    }
} else {
    alert('Browser anda tidak dapat menjalan PWA. Ganti dengan browser lain!')
}

function convertToUint(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}