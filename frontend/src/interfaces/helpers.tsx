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

    if (scaled === 0 || isNaN(scaled)) return "0";
    if (Math.abs(scaled) >= 1000) {
        const exp = Math.floor(Math.log10(Math.abs(scaled)));
        const base = scaled / Math.pow(10, exp);
        return `${base.toFixed(1)}×10^${exp}`;
    }
    if (Math.abs(scaled) > 0 && Math.abs(scaled) < 0.001) {
        const exp = Math.floor(Math.log10(Math.abs(scaled)));
        const base = scaled / Math.pow(10, exp);
        return `${base.toFixed(1)}×10^${exp}`;
    }
    return scaled.toPrecision(3).toString();
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

export const renderModality = (x: Modality) => {
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

export const getNVoxels = (dims: (string | number)[]) => {
    const noStr = dims.filter((v) => typeof v == "number");
    if (noStr.length == 0) {
        return Infinity;
    }
    return noStr.reduce((p, v) => p * v);
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

    const nVoxels = getNVoxels(s.dataDimensions_px);
    const sizeRangeMatches = sizeRange.lower < nVoxels && nVoxels < sizeRange.upper;
    const modalityMatches =
        selectedModalities.length == 0 || selectedModalities.includes(s.scanModality);
    return searchMatches && resRangeMatches && sizeRangeMatches && modalityMatches;
};

// TODO:
// - modality + scan sample diversity sort function

// Helper: get unique values from an array using a custom extractor
function getUniqueValues<T, U>(arr: T[], extractor: (item: T) => U): Set<U> {
    return new Set(arr.map(extractor));
}

// Smart shuffle function
export function smartShuffle<T extends ScanDetails>(
    data: T[],
    fields: (keyof T)[],
    extractors: Partial<{[K in keyof T]: (item: T) => any}>,
    maxTries = 1000
): T[] {
    if (data.length <= 1) return [...data];

    // Start with a random entry
    const remaining = [...data];
    const result: T[] = [];
    const startIdx = Math.floor(Math.random() * remaining.length);
    result.push(remaining.splice(startIdx, 1)[0]);

    // Track unique values for each field
    const seen = Object.fromEntries(fields.map((field) => [field, new Set<any>()])) as {
        [K in keyof T]: Set<any>;
    };

    // Initialize seen sets with the first entry
    for (const field of fields) {
        const extractor = extractors[field] || ((item: T) => item[field]);
        seen[field].add(extractor(result[0]));
    }

    while (remaining.length > 0) {
        let bestIdx = 0;
        let bestScore = -1;

        // Try up to maxTries random samples to find the best candidate
        for (let t = 0; t < Math.min(maxTries, remaining.length); t++) {
            const idx = t === 0 ? 0 : Math.floor(Math.random() * remaining.length);
            const candidate = remaining[idx];
            let score = 0;

            for (const field of fields) {
                const extractor = extractors[field] || ((item: T) => item[field]);
                const val = extractor(candidate);
                if (!seen[field].has(val)) score++;
            }

            if (score > bestScore) {
                bestScore = score;
                bestIdx = idx;
                if (score === fields.length) break; // can't do better
            }
        }

        const next = remaining.splice(bestIdx, 1)[0];
        result.push(next);
        for (const field of fields) {
            const extractor = extractors[field] || ((item: T) => item[field]);
            seen[field].add(extractor(next));
        }
    }

    return result;
}
