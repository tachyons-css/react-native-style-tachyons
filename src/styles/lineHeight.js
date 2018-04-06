import _ from "lodash";

const scale = {
    "lh-solid": 1,
    "lh-title": 1.25,
    "lh-copy": 1.5
}
export default _.mapValues(scale, val => ({ lineHeight: val }))
