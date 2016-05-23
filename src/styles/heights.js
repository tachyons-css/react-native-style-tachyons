import _ from "lodash";

const heights = {
    h1: 1,
    h2: 2,
    h3: 4,
    h4: 8,
    h5: 16
}

export default _.mapValues(heights, val => ({height: val}))
