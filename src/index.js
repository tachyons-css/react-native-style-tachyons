import _ from "lodash";
import Color from "color";
/* eslint-disable import/no-cycle */
import reactWrapper from "./reactWrapper";
import { heights, minHeights, maxHeights } from "./styles/heights";
import { widths, minWidths, maxWidths } from "./styles/widths";
import * as borders from "./styles/borders";
import flexbox from "./styles/flexbox";
import spacing from "./styles/spacing";
import generateTypeScale, { defaultTypeScale } from "./styles/typeScale";
import text from "./styles/text";
import images from "./styles/images";
import fontWeights from "./styles/fontWeights";
import opacity from "./styles/opacity";
import absolute from "./styles/absolute";
import tracked from "./styles/tracked";

const hyphensToUnderscores = (sourceObj) => {
    const translated = {};

    /* Create hypened versions */
    _.forOwn(sourceObj, (val, key) => {
        translated[key.replace(/-/gu, "_")] = val;
    });

    return translated;
};

const NativeTachyons = {
    wrap: reactWrapper,

    /* Placeholder */
    styles: {},

    /* Placeholder */
    sizes: {},

    options: {},

    /* eslint default-param-last: off */
    build: function build(options = {}, StyleSheet) {
        _.defaultsDeep(options, {
            rem: 16,
            colors: {
                palette: {}
            },
            fonts: {},
            typeScale: defaultTypeScale,
            clsPropName: "cls",
            customStyles: {}
        });

        /* Assign all the styles */
        const styleSheet = {};
        _.assign(styleSheet, borders.styles);
        _.assign(styleSheet, flexbox);
        _.assign(styleSheet, fontWeights);
        _.assign(styleSheet, images);
        _.assign(styleSheet, text);
        _.assign(styleSheet, opacity);

        const typeScale = generateTypeScale(options.typeScale);

        /* Calculate rem scales */
        const sizes = {};
        const REM_SCALED = [
            heights,
            minHeights,
            maxHeights,
            widths,
            minWidths,
            maxWidths,
            spacing,
            typeScale,
            borders.radii,
            tracked
        ];

        REM_SCALED.forEach((subSheet) => {
            _.forOwn(subSheet, (styleObj, tachyonsKey) => {
                _.forOwn(styleObj, (val, name) => {
                    let { rem } = options;
                    if (name === "fontSize") {
                        rem = options.fontRem || options.rem;
                    }
                    styleSheet[tachyonsKey] = {
                        [name]: val * rem
                    };
                    sizes[tachyonsKey] = val * rem;
                });
            });
        });

        /* Absolute */
        _.assign(styleSheet, absolute(options.rem));

        /* Colors */
        _.forOwn(options.colors.palette, (val, name) => {
            styleSheet[`bg-${name}`] = { backgroundColor: val };
            styleSheet[`${name}`] = { color: val };
            styleSheet[`b--${name}`] = { borderColor: val };
            styleSheet[`tint-${name}`] = { tintColor: val };

            /* Alpha variants */
            for (let i = 10; i < 100; i += 10) {
                const rgbString = new Color(val).alpha(i / 100)
                    .rgb()
                    .string();

                styleSheet[`bg-${name}-${i}`] = { backgroundColor: rgbString };
                styleSheet[`${name}-${i}`] = { color: rgbString };
                styleSheet[`b--${name}-${i}`] = { borderColor: rgbString };
            }
        });

        /* Font-families */
        _.forOwn(options.fonts, (val, key) => {
            styleSheet[`ff-${key}`] = { fontFamily: val };
        });

        _.assign(styleSheet, options.customStyles);

        _.assign(NativeTachyons.sizes, hyphensToUnderscores(sizes));
        _.assign(NativeTachyons.styles, StyleSheet.create(hyphensToUnderscores(styleSheet)));
        _.assign(NativeTachyons.options, options);
    }
};

export default NativeTachyons;
export const {
    sizes, styles, wrap, build, options
} = NativeTachyons;
