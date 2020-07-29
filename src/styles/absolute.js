export default function scaleStyles(rem) {
    return {
        "absolute-fill": {
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        },
        absolute: {
            position: "absolute"
        },
        "top-0": { top: 0 },
        "top-1": { top: Number(rem) },
        "top-2": { top: 2 * rem },
        "right-0": { right: 0 },
        "right-1": { right: Number(rem) },
        "right-2": { right: 2 * rem },
        "bottom-0": { bottom: 0 },
        "bottom-1": { bottom: Number(rem) },
        "bottom-2": { bottom: 2 * rem },
        "left-0": { left: 0 },
        "left-1": { left: Number(rem) },
        "left-2": { left: 2 * rem }
    };
}
