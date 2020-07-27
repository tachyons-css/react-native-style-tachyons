import _ from "lodash";

const opacities = {
    "o-100": 1,
    "o-90": 0.9,
    "o-80": 0.8,
    "o-70": 0.7,
    "o-60": 0.6,
    "o-50": 0.5,
    "o-40": 0.4,
    "o-30": 0.3,
    "o-20": 0.2,
    "o-10": 0.1,
    "o-05": 0.05,
    "o-025": 0.025
}

export default _.mapValues(
    opacities,
    val => ({ opacity: val })
)
