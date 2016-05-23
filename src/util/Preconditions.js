export function checkState(condition, ...args) {
    if (!condition) {
        const e = new Error(args.join(" "));
        e.args = args;
        throw e;
    }
}
