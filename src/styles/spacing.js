import _ from "lodash";

const REM_SCALE = [
    0,
    0.25,
    0.5,
    1,
    2,
    4,
    8,
    16,
    32
];

const what = _.toPairs({
    m: "margin",
    p: "padding"
})
const where = _.toPairs({
    a: "",
    h: "Horizontal",
    v: "Vertical",
    t: "Top",
    r: "Right",
    b: "Bottom",
    l: "Left"
})

const style = {}
_.forEach(
    what,
    ([
        whatShort,
        whatLong
    ]) => {
        _.forEach(
            where,
            ([
                whereShort,
                whereLong
            ]) => {
                _.forEach(
                    REM_SCALE,
                    (scale, idx) => {
                        style[`${whatShort}${whereShort}${idx}`] = {
                            [`${whatLong}${whereLong}`]: scale
                        }
                    }
                )
            }
        )
    }
);

export default style
