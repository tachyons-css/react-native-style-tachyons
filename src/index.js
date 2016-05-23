import _ from "lodash";
import { wrap } from "./reactWrapper";

/* assign all the styles */
const styleSheet = {}
_.assign(styleSheet, require("./styles/borders").default)
_.assign(styleSheet, require("./styles/flexbox").default)
_.assign(styleSheet, require("./styles/fontWeights").default)
_.assign(styleSheet, require("./styles/heights").default)
_.assign(styleSheet, require("./styles/images").default)
_.assign(styleSheet, require("./styles/spacing").default)
_.assign(styleSheet, require("./styles/text").default)
_.assign(styleSheet, require("./styles/typeScale").default)
_.assign(styleSheet, require("./styles/widths").default)

/* placeholder */
const NativeTachyons = {
    styles: Object.create(null),

    build: function build(StyleSheet, options = {}) {
        _.defaults(options, {
            rem: 16,
            colors: {
                white: "#ffffff",
                black: "#000000",
            }
        })

        const calculated = _.mapValues(styleSheet, style => _.mapValues(style, val => {
            if (_.isString(val) && val.endsWith("rem")) {
                return val.slice(0, -3) * options.rem;
            }

            return val;
        })
        )

        _.assign(NativeTachyons.styles, StyleSheet.create(calculated));
    },

    wrap
}

export default NativeTachyons;
