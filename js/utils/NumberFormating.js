function exponentialFormat(num, precision, mantissa = true) {
    return num.toString(precision)
}

function commaFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.array[0][1] < 0.001) return (0).toFixed(precision)
    return num.toStringWithDecimalPlaces(Math.max(precision,2)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

function formatSmall(x, precision=2) { 
    return format(x, precision, true)    
}

function regularFormat(num, precision) {
    if (isNaN(num)) return "NaN"
    if (num.array[0][1] < 0.001) return (0).toFixed(precision)
    return num.toString(Math.max(precision,2))
}

function fixValue(x, y = 0) {
    return x || new OmegaNum(y)
}

function sumValues(x) {
    x = Object.values(x)
    if (!x[0]) return new OmegaNum(0)
    return x.reduce((a, b) => OmegaNum.add(a, b))
}

function egg(n) {
    if(n == undefined) return 0
    return n
}

const suffixes = {
	beginning: [ "K", "M", "B" ],
	first: [ "U", "D", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No" ],
	second: [ "De", "Vt", "Tg", "Qdg", "Qng", "Sxg", "Spg", "Ocg", "Nog" ],
	third: [ "Ce", "Dce", "Tce", "Qdce", "Qnce", "Sxce", "Spce", "Occe", "Noce" ]
}

function getSuffix(exponent, hasBeginning = false) {
    if (exponent < 3) {
        return null;
    } else {
        let suffix = "";
        if (exponent < Number.MAX_VALUE) {
            exponent = Math.floor(exponent / 3) - 1;
            if (hasBeginning === true && exponent < 3) {
                suffix = suffixes.beginning[exponent];
            } else {
                let firstDivisee = exponent;
                let secondDivisee;
                let thirdDivisee;
                if (exponent > 99) {
                    thirdDivisee = Math.floor(exponent / 100);
                    suffix = suffixes.third[thirdDivisee - 1];
                    if (suffix === undefined) {
                        return null;
                    }
                }
                if (exponent > 9) {
                    secondDivisee = Math.floor(exponent / 10);
                    if (thirdDivisee !== undefined) {
                        secondDivisee -= thirdDivisee * 10;
                        firstDivisee -= thirdDivisee * 100;
                    }
                    firstDivisee -= secondDivisee * 10;
                    const second = suffixes.second[secondDivisee - 1];
                    if (second !== undefined) {
                        suffix = second + suffix;
                    }
                    const first = suffixes.first[firstDivisee - 1];
                    if (first !== undefined) {
                        suffix = first + suffix;
                    }
                } else {
                    suffix = suffixes.first[firstDivisee - 1];
                }
            }
        }
        return suffix;
    }
}

function bigNumEnforceDP(mantissa, exponent, places = 2) {
    const num = mantissa * Math.pow(10, exponent)
    if (Number.isInteger(num))
        return num
    return num.toFixed(places)
}

function bigNumToSuffix(mantissa, exponent, places = 2) {
    if (exponent < 3)
        return bigNumEnforceDP(mantissa, exponent, places)
    if (exponent > 3002) {
        if (exponent >= 1e306)
            return null;
        const eExponent = Math.floor(Math.log10(Math.abs(exponent)))
        return mantissa.toFixed(places) + "e" + bigNumToSuffix(exponent / Math.pow(10, eExponent), eExponent)
    }
    const suffix = getSuffix(exponent, true)
    let label = bigNumEnforceDP(mantissa, exponent % 3)
    if (suffix !== null)
        label += suffix
    return label
}

const MAX_FRACTIONAL = new OmegaNum("0.0001")
const MAX_SUFFIX = new OmegaNum("1e3003")
const MAX_SCIENTIFIC = new OmegaNum("ee3002");
const MAX_E_CHAIN = new OmegaNum("eeeeee10");
const MAX_ENT = new OmegaNum("10^^^10");

function toEChain(decimal) {
    const mult = decimal.array[0]
    const exponent = Math.floor(Math.log10(Math.abs(mult)))
    const mantissa = mult / Math.pow(10, exponent)
    return "e".repeat(decimal.array[1]) + bigNumToSuffix(mantissa, exponent)
}

function format(decimal, precision = 2) {
    decimal = new OmegaNum(decimal)

    if (decimal.sign === -1)
        return "-" + format(decimal.neg(), precision)
    
    if (decimal.eq($ZERO) || decimal === undefined || isNaN(decimal))
        return "0"

    if (decimal.lt(MAX_FRACTIONAL))
        return format(decimal.rec(), precision) + "⁻¹"

    
    if (decimal.lt($ONE)) {
        let fmt = decimal.toString()
        fmt = fmt.substring(0,precision+2)
        return fmt
    }
    if (decimal.lt(MAX_SCIENTIFIC)) {
        const array = decimal.array
        let mantissa, exponent
        const mult = array[0]
        if (array.length > 1) {
            const exp = array[1]
            if (exp === 1) {
                mantissa = Math.pow(10, mult - Math.floor(mult))
                exponent = Math.floor(mult)
            }
            else if (exp === 2 && mult <= 308) {
                const expExp = Math.pow(10, mult)
                mantissa = Math.pow(10, (expExp - Math.floor(expExp)))
                exponent = Math.floor(expExp)
            }
            else {
                return toEChain(decimal)
            }
        }
        else {
            exponent = Math.floor(Math.log10(Math.abs(mult)))
            mantissa = mult / Math.pow(10, exponent)
        }
        return bigNumToSuffix(mantissa, exponent)
    }
    if (decimal.lt(MAX_E_CHAIN))
        return toEChain(decimal)

    const mult = decimal.array[0]
    const mExponent = Math.floor(Math.log10(Math.abs(mult)))
    const mMantissa = mult / Math.pow(10, mExponent)
    const mSuffixed = bigNumToSuffix(mMantissa, mExponent)
    const exp = decimal.array[1]
    const eExponent = Math.floor(Math.log10(Math.abs(exp)))
    const eMantissa = exp / Math.pow(10, eExponent)
    const eSuffixed = bigNumToSuffix(eMantissa, eExponent, 0)
    if (decimal.lt(MAX_ENT))
        return "E(" + eSuffixed + ")" + mSuffixed

    const length = decimal.array.length
    if (length < 6) {
        let hyperE = "E" + mSuffixed + "#" + eSuffixed
        for (let i = 2; i < 6; i++) {
            let number = decimal.array[i]
            if (number === undefined)
                break;
            number -= 1
            const exponent = Math.floor(Math.log10(Math.abs(number)))
            const mantissa = number / Math.pow(10, exponent)
            hyperE += "#" + bigNumToSuffix(mantissa, exponent, 0)
        }
        return hyperE
    }
    return mSuffixed + "{" + length + "}" + decimal.array[length - 1]
}

function formatWhole(decimal) {
    return format(decimal)
}

function formatTime(s) {
    if (s < 60) return format(s) + "s"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "m " + format(s % 60) + "s"
    else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else return formatWhole(Math.floor(s / 31536000)) + "y " + formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
}

function toPlaces(x, precision, maxAccepted) {
    x = new OmegaNum(x)
    let result = x.toString(precision)
    if (new OmegaNum(result).gte(maxAccepted)) {
        result = new OmegaNum(maxAccepted - Math.pow(0.1, precision)).toString(precision)
    }
    return result
}