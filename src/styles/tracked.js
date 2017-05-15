import _ from "lodash";

const scale = {
    "tracked": .1,
    "tracked-tight": -.05,
    "tracked-mega": .25,
}

export default _.mapValues(scale, val => ({ letterSpacing: val }))