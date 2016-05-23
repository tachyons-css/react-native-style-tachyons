import _ from "lodash";

const REM_SCALE = [1, 2, 4, 8, 16]

const style = {}
_.forEach(REM_SCALE, (val, idx) => {
    style[`w${idx + 1}`] = {
        height: `${val}rem`
    }
})

export default style;
