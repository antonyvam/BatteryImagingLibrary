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

const flattenObject = (ob: Object, prefix: string | null = null, result: object | null = null) => {
    // From user @tofandel on stackexchange: https://stackoverflow.com/questions/44134212/best-way-to-flatten-js-object-keys-and-values-to-a-single-depth-array
    result = result || {};

    // Preserve empty objects and arrays, they are lost otherwise
    if (prefix && typeof ob === "object" && ob !== null && Object.keys(ob).length === 0) {
        result[prefix] = Array.isArray(ob) ? [] : {};
        return result;
    }

    prefix = prefix ? prefix + "." : "";

    for (const i in ob) {
        if (Object.prototype.hasOwnProperty.call(ob, i)) {
            // Only recurse on true objects and arrays, ignore custom classes like dates
            if (
                typeof ob[i] === "object" &&
                (Array.isArray(ob[i]) ||
                    Object.prototype.toString.call(ob[i]) === "[object Object]") &&
                ob[i] !== null
            ) {
                // Recursion on deeper objects
                flattenObject(ob[i], prefix + i, result);
            } else {
                result[prefix + i] = ob[i];
            }
        }
    }
    return result;
};

export const regexSearch = (term: string, data: object): boolean => {
    const _matchStr = (term: string, query: string): boolean => {
        const lower = query.toString().replace(" ", "").toLowerCase();
        return lower.includes(term);
    };

    let result = false;
    const flatKVs = Object.entries(flattenObject(data));
    for (let [k, v] of flatKVs) {
        if (_matchStr(term, k)) {
            result = true;
        }
        if (_matchStr(term, v)) {
            result = true;
        }
    }
    return result;
};
