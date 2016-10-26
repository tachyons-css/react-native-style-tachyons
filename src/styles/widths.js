import _ from "lodash";

export const widths = _.mapValues({
    w1: 1,
    w2: 2,
    w3: 4,
    w4: 8,
    w5: 16
}, val => ({ width: val }))

export const maxWidths = _.mapValues({
    "max-w1": 1,
    "max-w2": 2,
    "max-w3": 4,
    "max-w4": 8,
    "max-w5": 16
}, val => ({ maxWidth: val }))

export const minWidths = _.mapValues({
    "min-w1": 1,
    "min-w2": 2,
    "min-w3": 4,
    "min-w4": 8,
    "min-w5": 16
}, val => ({ minWidth: val }))
