import EStyleSheet from "react-native-extended-stylesheet";
import _ from "lodash";

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

export const styles = EStyleSheet.create(styleSheet);
