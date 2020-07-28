// Check data
const checkD = datum => (datum === null || datum === undefined) ? '-' : datum;

// UrlHttps
function urlHttps(url) {
    if(url === null || url === undefined) {
        return;
    } else if(url.slice(0,5) === 'http:') {
        return url.replace(/^http:\/\//i, 'https://');
    } else {
        return url;
    };
};