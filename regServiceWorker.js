if("serviceWorker" in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js')
        .then(() => console.log("Service Worker berhasil didaftarkan"))
        .catch(() => console.log("Service Worker gagal didaftarkan"))
} else {
    alert('Browser anda tidak dapat menjalan PWA. Ganti dengan browser lain!')
}