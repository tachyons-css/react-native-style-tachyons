import _ from "lodash";
import Color from "color";
import * as reactWrapper from "./reactWrapper";

/* global require */
const NativeTachyons = {
    wrap: reactWrapper.wrap,

    /* placeholder */
    styles: Object.create(null),

    build: function build(options = {}, StyleSheet) {
        _.defaultsDeep(options, {
            rem: 16,
            colors: {
                lighten: 0.2,
                darken: 0.2,
                palette: {
                    white: "#ffffff",
                    black: "#000000",
                }
            }
        })

        /* assign all the styles */
        const styleSheet = {}
        _.assign(styleSheet, require("./styles/borders").styles)
        _.assign(styleSheet, require("./styles/flexbox").default)
        _.assign(styleSheet, require("./styles/fontWeights").default)
        _.assign(styleSheet, require("./styles/images").default)
        _.assign(styleSheet, require("./styles/text").default)
        _.assign(styleSheet, require("./styles/opacity").default)
        _.assign(styleSheet, require("./styles/utilities").default)

        /* calculate rem scales */
        const REM_SCALED = [
            require("./styles/heights").default,
            require("./styles/spacing").default,
            require("./styles/typeScale").default,
            require("./styles/widths").default,
            require("./styles/borders").radii
        ]
        _.forEach(REM_SCALED, subSheet => {
            _.assign(styleSheet,
                _.mapValues(subSheet, style =>
                    _.mapValues(style, val => val * options.rem)))
        })

        /* colors: dark and light variant */
        const allColors = _.transform(options.colors.palette, (result, val, key) => {
            result[key] = val;

            /* light and dark alternatives */
            result[`light-${key}`] = Color(val).lighten(options.colors.lighten).hexString();
            result[`dark-${key}`] = Color(val).darken(options.colors.darken).hexString();
        }, {});

        /* colors: background, foreground and border */
        _.forEach(allColors, (val, key) => {
            styleSheet[`bg-${key}`] = {
                backgroundColor: val
            }
            styleSheet[`${key}`] = {
                color: val
            }
            styleSheet[`b--${key}`] = {
                borderColor: val
            }
        }, {});

        _.assign(NativeTachyons.styles, StyleSheet.create(styleSheet));
    }
}

export default NativeTachyons;
export const styles = NativeTachyons.styles;
export const wrap = reactWrapper.wrap;
export const build = NativeTachyons.build;
