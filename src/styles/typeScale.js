import _ from "lodash";

const scale = {
    "f-headline": 6,
    "f-subheadline": 5,
    f1: 3,
    f2: 2.25,
    f3: 1.5,
    f4: 1.25,
    f5: 1,
    f6: 0.875
}

export default _.mapValues(
    scale,
    val => ({ fontSize: val })
)
