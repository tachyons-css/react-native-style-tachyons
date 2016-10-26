import _ from "lodash";
import Color from "color";
import * as reactWrapper from "./reactWrapper";

const debug = require("debug")("react-native-tachyons")

/* global require */
const NativeTachyons = {
    wrap: reactWrapper.wrap,

    /* placeholder */
    styles: {},

    /* placeholder */
    colors: {},

    /* placeholder */
    sizes: {},

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
            require("./styles/heights").heights,
            require("./styles/heights").minHeights,
            require("./styles/heights").maxHeights,
            require("./styles/widths").widths,
            require("./styles/widths").minWidths,
            require("./styles/widths").maxWidths,
            require("./styles/spacing").default,
            require("./styles/typeScale").default,
            require("./styles/borders").radii
        ]
        _.forEach(REM_SCALED, subSheet => {
            _.assign(styleSheet,
                _.mapValues(subSheet, style =>
                    _.mapValues(style, val => val * options.rem)))
        })

        /* calculate sizes for export */
        const sizes = {}
        _.forEach([
            require("./styles/heights").heights,
            require("./styles/heights").minHeights,
            require("./styles/heights").maxHeights,
            require("./styles/widths").widths,
            require("./styles/widths").minWidths,
            require("./styles/widths").maxWidths,
            require("./styles/spacing").default,
            require("./styles/typeScale").default
        ], obj => {
            _.forEach(obj, (rule, tachyonsKey) => {
                _.forEach(rule, val => {
                    sizes[tachyonsKey] = val * options.rem
                })
            })
        })
        _.assign(NativeTachyons.sizes, hyphensToUnderscores(sizes));
        debug("got sizes:", sizes)

        /* colors: dark and light variant */
        const allColors = _.transform(options.colors.palette, (result, val, key) => {
            result[key] = val;

            /* light and dark alternatives */
            if (options.colors.lighten !== false) {
                result[`light-${key}`] = new Color(val).lighten(options.colors.lighten).hexString();
            }
            if (options.colors.darken !== false) {
                result[`dark-${key}`] = new Color(val).darken(options.colors.darken).hexString();
            }

            /* alpha variants */
            for (let i = 10; i < 100; i += 10) {
                const name = `${key}-${i}`;
                const rgbString = new Color(val).alpha(i / 100).rgbString();
                debug(`writing alpha variant: ${name}: ${rgbString}`)
                result[name] = rgbString;
            }

        }, {});

        /* colors: background, foreground and border */
        _.forEach(allColors, (val, key) => {
            styleSheet[`bg-${key}`] = { backgroundColor: val }
            styleSheet[`${key}`] = { color: val }
            styleSheet[`b--${key}`] = { borderColor: val }
        }, {});

        _.assign(NativeTachyons.colors, hyphensToUnderscores(allColors));
        _.assign(NativeTachyons.styles, StyleSheet.create(hyphensToUnderscores(styleSheet)));
    }
}

function hyphensToUnderscores(sourceObj) {
    const translated = {}

    /* copy all properties */
    _.assign(translated, sourceObj);

    /* create hypened versions */
    _.forEach(sourceObj, (val, key) => {
        if (key.includes("-")) {
            debug(`replacing ${key} -> ${key.replace(/-/g, "_")}`)
            translated[key.replace(/-/g, "_")] = val;
        }
    })

    return translated;
}


export default NativeTachyons;
export const sizes = NativeTachyons.sizes;
export const colors = NativeTachyons.colors;
export const styles = NativeTachyons.styles;
export const wrap = reactWrapper.wrap;
export const build = NativeTachyons.build;
