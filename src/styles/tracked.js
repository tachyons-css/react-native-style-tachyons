import _ from "lodash";

const scale = {
    tracked: 0.1,
    "tracked-tight": -0.05,
    "tracked-mega": 0.25
}

export default _.mapValues(scale, val => ({ letterSpacing: val }))
