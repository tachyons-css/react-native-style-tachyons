import _ from "lodash";
import Color from "color";
import * as reactWrapper from "./reactWrapper";
import { heights, minHeights, maxHeights } from "./styles/heights"
import { widths, minWidths, maxWidths } from "./styles/widths"
import * as borders from "./styles/borders"
import flexbox from "./styles/flexbox"
import spacing from "./styles/spacing"
import typeScale from "./styles/typeScale"
import text from "./styles/text"
import images from "./styles/images"
import fontWeights from "./styles/fontWeights"
import opacity from "./styles/opacity"
import utilities from "./styles/utilities"

const debug = require("debug")("react-native-tachyons")

const NativeTachyons = {
    wrap: reactWrapper.wrap,

    /* placeholder */
    styles: {},

    /* placeholder */
    sizes: {},

    build: function build(options = {}, StyleSheet) {

        _.defaultsDeep(options, {
            rem: 16,
            colors: {
                palette: {
                }
            },
            fonts: {
            }
        })

        /* assign all the styles */
        const styleSheet = {}
        _.assign(styleSheet, borders.styles)
        _.assign(styleSheet, flexbox)
        _.assign(styleSheet, fontWeights)
        _.assign(styleSheet, images)
        _.assign(styleSheet, text)
        _.assign(styleSheet, opacity)
        _.assign(styleSheet, utilities)

        /* calculate rem scales */
        const sizes = {}
        const REM_SCALED = [
            heights,
            minHeights,
            maxHeights,
            widths,
            minWidths,
            maxWidths,
            spacing,
            typeScale,
            borders.radii
        ]

        REM_SCALED.forEach(subSheet => {

            _.forOwn(subSheet, (styleObj, tachyonsKey) => {
                _.forOwn(styleObj, (val, name) => {
                    styleSheet[tachyonsKey] = {
                        [name]: val * options.rem
                    }
                    sizes[tachyonsKey] = val * options.rem
                })
            })
        })
        debug("got sizes:", sizes)

        _.forOwn(options.colors.palette, (val, name) => {
            styleSheet[`bg-${name}`] = { backgroundColor: val }
            styleSheet[`${name}`] = { color: val }
            styleSheet[`b--${name}`] = { borderColor: val }

            const color = new Color(val)

            /* alpha variants */
            for (let i = 10; i < 100; i += 10) {
                const rgbString = color.alpha(i / 100).rgbString();
                debug(`writing alpha variant: ${name}: ${rgbString}`)

                styleSheet[`bg-${name}-${i}`] = { backgroundColor: rgbString }
                styleSheet[`${name}-${i}`] = { color: rgbString }
                styleSheet[`b--${name}-${i}`] = { borderColor: rgbString }
            }
        });


        /* font-families */
        _.forOwn(options.fonts, (val, key) => {
            styleSheet[`ff-${key}`] = { fontFamily: val }
        });

        _.assign(NativeTachyons.sizes, hyphensToUnderscores(sizes));
        _.assign(NativeTachyons.styles, StyleSheet.create(hyphensToUnderscores(styleSheet)));
    }
}

function hyphensToUnderscores(sourceObj) {
    const translated = {}

    /* copy all properties */
    _.assign(translated, sourceObj);

    /* create hypened versions */
    _.forOwn(sourceObj, (val, key) => {
        translated[key.replace(/-/g, "_")] = val;
    })

    return translated;
}


export default NativeTachyons;
export const sizes = NativeTachyons.sizes;
export const styles = NativeTachyons.styles;
export const wrap = reactWrapper.wrap;
export const build = NativeTachyons.build;
