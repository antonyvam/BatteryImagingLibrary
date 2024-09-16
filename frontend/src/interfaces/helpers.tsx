export const hexToRGB = (hex: string, alpha: number) => {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
};

export const fileExists = (url: string) => {
    const xhr = new XMLHttpRequest();
    try {
        xhr.open("HEAD", url, false); // 'false' makes the request synchronous
        xhr.send();
        return xhr.status >= 200 && xhr.status < 300;
    } catch (err) {
        return false;
    }
};
