import {
    Modality,
    UNIT_TO_SCALE,
    UNIT_TO_UNIT_STR,
    Units,
    ScanDetailsSchema,
    ScanDetails,
    MODALITIES,
    Range
} from "./types";
import data from "../assets/data.json";

// Render a resolution value as 1x10^n if > 1,000 or < 0.001, else as normal string
export function renderResolutionText(val: number, unit: Units = "NANO"): string {
    const scaled = val / UNIT_TO_SCALE[unit];

    const truncateAfter = 100000;

    if (scaled === 0 || isNaN(scaled)) return "0";
    if (Math.abs(scaled) >= truncateAfter) {
        const exp = Math.floor(Math.log10(Math.abs(scaled)));
        const base = scaled / Math.pow(10, exp);
        return `${base.toFixed(1)}E${exp}`;
    }
    if (Math.abs(scaled) > 0 && Math.abs(scaled) < 0.001) {
        const exp = Math.floor(Math.log10(Math.abs(scaled)));
        const base = scaled / Math.pow(10, exp);
        return `${base.toFixed(1)}E${exp}`;
    }
    return scaled.toPrecision(Math.log10(truncateAfter)).toString();
}

export function parseStrAsNumber(s: string): number {
    if (!s) return NaN;
    // Handle scientific notation like 1x10^3 or 1×10^3
    const sciMatch = s.match(/^([+-]?\d*\.?\d+)\s*[x×]\s*10\^([+-]?\d+)$/i);
    if (sciMatch) {
        const base = parseFloat(sciMatch[1]);
        const exp = parseInt(sciMatch[2], 10);
        return base * Math.pow(10, exp);
    }
    // Handle 1e3 or 1E3
    const num = Number(s);
    return isNaN(num) ? 0 : num;
}

export const renderModality = (x: string) => {
    switch (x) {
        case "LAB_MICRO_XCT":
            return "Lab micro-XCT";
        case "XRD_CT":
            return "XRD-CT";
        case "NEUTRON_CT":
            return "Neutron-CT";
        case "SYNCHOTRON_MICRO_XCT":
            return "Synchotron micro-XCT";
        case "SYNCHOTRON_NANO_XCT":
            return "Synchotron nano-XCT";
        case "ANY":
            return "Any";
        default:
            return x;
    }
};

export const renderUnit = (x: Units) => {
    return UNIT_TO_UNIT_STR[x];
};

export const renderDataDims = (dims: (string | number)[]) => {
    const noStr = dims.filter((v) => typeof v == "number");
    return noStr.join("x");
};

export const getSmallestFromDims = (dims: (string | number)[]) => {
    const noStr = dims.filter((v) => typeof v == "number");
    return Math.min(...noStr);
};

export const getLargestFromDims = (dims: (string | number)[]) => {
    const noStr = dims.filter((v) => typeof v == "number");
    return Math.max(...noStr);
};

export const getNVoxels = (dims: (string | number)[]) => {
    const noStr = dims.filter((v) => typeof v == "number");
    if (noStr.length == 0) {
        return Infinity;
    }
    return noStr.reduce((p, v) => p * v);
};

export const getArea = (dimsMicrons: number[]) => {
    return dimsMicrons[0] * dimsMicrons[1] * 1e6;
};

export const renderSmallestPixelSize = (dims: (string | number)[]) => {
    return getSmallestFromDims(dims).toString() + renderUnit("MICRON");
};

export const isModality = (x: any): x is Modality => {
    return MODALITIES.includes(x);
};

// Generic function to check if an array is empty or all elements are empty/undefined/null
export const isArrayEmpty = (arr: any[] | undefined | null): boolean => {
    if (!arr || arr.length === 0) return true;
    return arr.every(
        (el) => el === null || el === undefined || (typeof el === "string" && el.trim() === "")
    );
};

export function loadAndParseScanDetails(): ScanDetails[] {
    const res = data
        .map((item) => {
            return ScanDetailsSchema.safeParse(item);
        })
        .filter((v) => v.success)
        .map((v) => v.data);
    return res;
}

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

export const regexSearch = (terms: string[], data: object): boolean => {
    const matchStr = (term: string, query: string): boolean => {
        const queryClean = query.toString().replace(" ", "").toLowerCase();
        const termClean = term.toString().replace(" ", "").toLowerCase();
        return queryClean.includes(termClean);
    };

    const flatKVs = Object.entries(flattenObject(data));
    let globalResult = true;
    for (let term of terms) {
        const searchValue = term;
        let result = false;
        for (let [k, v] of flatKVs) {
            if (matchStr(searchValue, k)) {
                result = true;
            }
            if (matchStr(searchValue, v)) {
                result = true;
            }
        }
        globalResult = globalResult && result;
    }
    return globalResult;
};

export const scanMatchesSearch = (
    s: ScanDetails,
    searchTerm: string,
    resRange: Range,
    sizeRange: Range,
    selectedModalities: Modality[]
): boolean => {
    const searchMatches = regexSearch(searchTerm.split(" "), s);

    const scanResNM = getSmallestFromDims(s.pixelSize_µm) * 1e3;
    const resRangeMatches = resRange.lower < scanResNM && scanResNM < resRange.upper;

    // TODO: make this cross sectional area!
    const largestSide = getLargestFromDims(s.dataDimensions_px);
    const sizeRangeMatches = sizeRange.lower < largestSide && largestSide < sizeRange.upper;
    const modalityMatches =
        selectedModalities.length == 0 ||
        selectedModalities.includes(s.scanModality) ||
        selectedModalities.includes("ANY");
    return searchMatches && resRangeMatches && sizeRangeMatches && modalityMatches;
};

// Helper: get unique values from an array using a custom extractor
function getUniqueValues<T, U>(arr: T[], extractor: (item: T) => U): Set<U> {
    return new Set(arr.map(extractor));
}

function sfc32(a, b, c, d) {
    return function () {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
    };
}

export type Tracker = {
    [K in keyof ScanDetails]: Record<any, number>;
};

export function smartShuffle<T extends ScanDetails>(data: T[], fields: (keyof T)[]): T[] {
    if (data.length <= 1) return [...data];

    const seedgen = () => 1001 >>> 0;
    const getRand = sfc32(seedgen(), seedgen(), seedgen(), seedgen());

    const tracker = fields.reduce(
        (acc, field) => {
            const valueSet = data.reduce((set, d) => set.add(d[field]), new Set<any>());
            const track: Record<any, number> = Object.fromEntries([...valueSet].map((v) => [v, 0]));
            acc[field] = track;
            return acc;
        },
        {} as Record<keyof T, Record<any, number>>
    );

    const updateTracker = (s: T, tracker: Record<keyof T, Record<any, number>>) => {
        for (const f of fields) {
            const scanFieldValue = s[f];
            const valueCounts = tracker[f];
            // @ts-ignore
            valueCounts[scanFieldValue] = valueCounts[scanFieldValue] + 1;
        }
        return tracker;
    };

    const getSampleIdsFromTracker = (
        remainingData: T[],
        tracker: Record<keyof T, Record<any, number>>
    ): number[] => {
        // For each field, find the least sampled value(s)
        const leastSampled: Record<string, any[]> = {};
        for (const field of fields) {
            const counts = tracker[field];
            const minCount = Math.min(...Object.values(counts));
            leastSampled[field as string] = Object.entries(counts)
                .filter(([_, count]) => count === minCount)
                .map(([val, _]) => val);
        }

        // For each object, count how many fields match least sampled values
        const scores = remainingData.map((obj) => {
            let score = 0;
            for (const field of fields) {
                if (leastSampled[field as string].includes(obj[field])) {
                    score++;
                }
            }
            return score;
        });

        // Find the max score
        const maxScore = Math.max(...scores);
        // Return indices of objects with max score
        return scores
            .map((score, idx) => (score === maxScore ? idx : -1))
            .filter((idx) => idx !== -1);
    };

    // Explicit loop to sort data
    const remaining = [...data];
    const shuffled: Array<T> = [];

    // Start with a random entry
    const initIdx = 0; // or Math.floor(getRand() * remaining.length)
    const init = remaining.splice(initIdx, 1)[0];
    shuffled.push(init);
    updateTracker(init, tracker);

    while (remaining.length > 0) {
        // Get candidate indices
        const candidateIdxs = getSampleIdsFromTracker(remaining, tracker);
        let filteredIdxs = candidateIdxs;
        if (shuffled.length > 0) {
            const prev = shuffled[shuffled.length - 1];
            filteredIdxs = candidateIdxs.filter((idx) => {
                for (const field of fields) {
                    if (remaining[idx][field] === prev[field]) {
                        return false;
                    }
                }
                return true;
            });
            // If all candidates match previous, fall back to original candidates
            if (filteredIdxs.length === 0) {
                filteredIdxs = candidateIdxs;
            }
        }
        // Pick one at random
        const randIdx =
            filteredIdxs.length === 1
                ? filteredIdxs[0]
                : filteredIdxs[Math.floor(getRand() * filteredIdxs.length)];
        const next = remaining.splice(randIdx, 1)[0];
        shuffled.push(next);
        updateTracker(next, tracker);
    }

    return shuffled;
}
