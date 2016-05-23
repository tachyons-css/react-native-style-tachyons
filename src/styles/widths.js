import _ from "lodash";

const widths = {
    w1: 1,
    w2: 2,
    w3: 4,
    w4: 8,
    w5: 16
}

export default _.mapValues(widths, val => ({width: val}))
