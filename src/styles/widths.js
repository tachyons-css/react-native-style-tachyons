import _ from "lodash";

const REM_SCALE = [1,2,4,8,16],
    PERCENTAGES = [10,20,25,33,34,40,50,60,75,80,100];

const style = {}
_.forEach(REM_SCALE, (val, idx) => style[`w${idx+1}`] = `${val}rem`)
_.forEach(PERCENTAGES, val => style[`w-${val}`] = `${val}%`)

export default _.mapValues(style, val => ({width: val}))
