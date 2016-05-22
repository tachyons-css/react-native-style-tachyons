import _ from "lodash";

const REM_SCALE = [1,2,4,8,16],
    PERCENTAGES = [25,50,75,100];

const style = {}
_.forEach(REM_SCALE, (val, idx) => style[`h${idx+1}`] = `${val}rem`)
_.forEach(PERCENTAGES, val => style[`h-${val}`] = `${val}%`)

export default _.mapValues(style, val => ({height: val}))