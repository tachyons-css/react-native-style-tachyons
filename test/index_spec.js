import { test } from "tape";
import { build, wrap, styles, sizes } from "../src/";
import _ from "lodash";
import React from "react";
import Benchmark from "benchmark";

function buildRNT(options) {
    for (const prop in styles) {
        if ({}.hasOwnProperty.call(styles, prop)) {
            delete styles[prop];
        }
    }
    const fakeStyleSheet = { create: sheet => sheet }
    build(options, fakeStyleSheet);
}

test("styles", t => {

    buildRNT({})

    t.ok(_.isObject(styles), "styles is an object");
    t.ok(_.has(styles, "w1"), "example: has w1");
    t.ok(_.has(styles, "w5"), "example: has w5");
    t.ok(_.has(styles, "pb7"), "example: has pb7");
    t.ok(_.has(styles, "f1"), "example: has f1");

    t.ok(_.has(styles, "absolute_fill"), "example: has absolute-fill");
    t.deepEqual(styles.pa3, { padding: 16 }, "pa3 is 16")

    /* Borders */
    t.deepEqual(styles.br3, { borderRadius: 8 }, "br3 is 8")
    t.deepEqual(styles.bl, { borderLeftWidth: 1 }, "bl works")
    t.deepEqual(styles.br__top, { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }, "br--top works")

    t.deepEqual(styles.o_025, { opacity: 0.025 }, "o-025 is opacity 0.025")

    t.deepEqual(styles.min_w3, { minWidth: 64 })
    t.deepEqual(styles.max_w3, { maxWidth: 64 })
    t.deepEqual(styles.min_h4, { minHeight: 128 })
    t.deepEqual(styles.max_h4, { maxHeight: 128 })

    t.deepEqual(styles.lh_copy, { lineHeight: 24 })
    t.deepEqual(styles.tracked_tight, { letterSpacing: -0.8 })

    /* Underscore version are generated */
    t.ok(_.has(styles, "flx_i"), "underscore version is generated in addition to hyphenated names")

    t.end();
});

test("styles.absolute", t => {
    buildRNT({})
    t.deepEqual(styles.left_1, { left: 16 })
    t.deepEqual(styles.top_2, { top: 32 })
    t.deepEqual(styles.absolute, { position: "absolute" })
    t.deepEqual(styles.bottom_0, { bottom: 0 })
    t.end();
})

test("sizes", t => {
    buildRNT({})
    t.equal(sizes.pa3, 16, "pa3 is 16");
    t.equal(sizes.max_w2, 32, "max_w2 is 32");
    t.end();
})

test("fonts", t => {
    buildRNT({
        fonts: {
            iowan: "Iowan Old Style"
        }
    })
    t.deepEqual(styles.ff_iowan, { fontFamily: "Iowan Old Style" })
    t.end();
})

test("colors", t => {
    buildRNT({
        colors: {
            palette: {
                green: "#00FF00",
                light_green: "#CCFFCC"
            }
        }
    });

    t.deepEqual(styles.green, { color: "#00FF00" })
    t.deepEqual(styles.b__green, { borderColor: "#00FF00" })
    t.deepEqual(styles.bg_green, { backgroundColor: "#00FF00" })
    t.deepEqual(styles.bg_light_green, { backgroundColor: "#CCFFCC" })

    t.deepEqual(styles.tint_green, { tintColor: "#00FF00" })
    t.deepEqual(styles.tint_light_green, { tintColor: "#CCFFCC" })

    t.ok(_.has(styles, "b__green"), "multiple underscores work")

    t.end();
});

test("wrapping", t => {

    function createComponent(clsStr, style) {
        const comp = class extends React.Component {
            render() {
                return (
                    <div
                        key="1"
                        other="2"
                        cls={clsStr}
                        style={style}
                    >
                        <div
                            key="child1"
                            cls="w2"
                        >
                            <div cls="w4" />
                        </div>
                        <div
                            key="child2"
                            cls="w1"
                        >
                            Test
                        </div>
                        <div
                            key="child3"
                            cls="w2"
                        >
                            <div />
                        </div>
                        <div
                            key="child4"
                            cls="bg-#abcdef b--rgba(200,144,233,1.0) burlywood"
                        >
                            <div />
                        </div>
                    </div>
                )
            }
        }

        comp.displayName = "Orig"

        return comp
    }

    function renderComponent(clsStr, style) {
        const Comp = wrap(createComponent(clsStr, style))

        return new Comp().render()
    }

    const Orig = createComponent("w5")
    const Wrapped = wrap(Orig);
    t.equal(Wrapped.displayName, Orig.displayName, "displayName is preserved");

    let instance = renderComponent("w5")
    t.deepEqual(instance.key, "1", "key is preserved");
    t.deepEqual(instance.props.other, "2", "other properties are preserved");

    /* Children */
    t.deepEqual(instance.props.children[0].props.cls, "w2", "child is preserved");
    t.deepEqual(instance.props.children[0].props.style, [{ width: 32 }], "child cls is converted");
    t.deepEqual(instance.props.children.length, 4, "children are converted");
    t.deepEqual(instance.props.children[0].props.children.props.style, [{ width: 128 }], "nested single children are converted");
    t.deepEqual(instance.props.children[1].props.children, "Test", "Non-ReactElement children are preserved");
    t.ok(React.isValidElement(instance.props.children[2].props.children), "unaltered single children are preserved");

    t.deepEqual(
        instance.props.children[3].props.style,
        [
            { backgroundColor: "#abcdef" },
            { borderColor: "rgba(200,144,233,1.0)" },
            { color: "burlywood" }
        ],
        "ad-hoc colors are supported"
    );

    t.deepEqual(instance.props.style, [{ width: 256 }], "style array is created");

    instance = renderComponent("w5", { width: 5 })
    t.deepEqual(instance.props.style, [
        { width: 5 },
        { width: 256 }
    ], "existing style object is converted to array and appended");

    instance = renderComponent("w5", [{ width: 5 }])
    t.deepEqual(instance.props.style, [
        { width: 5 },
        { width: 256 }
    ], "existing style array is appended");

    instance = renderComponent("")
    t.deepEqual(instance.props.style, [], "if style is undefined, an array will be created");

    instance = renderComponent("flx-i")
    t.deepEqual(instance.props.style, [{ flex: 1 }], "hyphens work");

    /* Throw when using invalid properties */
    t.throws(() => renderComponent("w8"), /style 'w8' not found/)

    /* Don't throw when setting css-color-names */
    instance = renderComponent("azure")
    t.deepEqual(instance.props.style, [{ color: "azure" }]);


    /* Benchmarking */
    const inst = new (wrap(createComponent("w2", [])))();
    new Benchmark.Suite()
        .add("wrap", () => inst.render())
        .on("cycle", event => {
            t.comment(`performance: ${event.target}`);
        })
        // .run()

    t.end();
});

test("wrap createClass", t => {
    // eslint-disable-next-line react/prefer-es6-class
    const Orig = class Orig extends React.Component {
        render() {
            return (
                <div cls="b">hello</div>
            );
        }
    };

    // eslint-disable-next-line react/prefer-es6-class
    const Expected = class Expected extends React.Component {
        render() {
            return (
                <div
                    cls="b"
                    style={[{ fontWeight: "bold" }]}
                >hello
                </div>
            );
        }
    };
    const WrappedComp = wrap(Orig);
    const comp = new WrappedComp();
    const expect = new Expected();

    t.deepEqual(comp.render(), expect.render())
    t.end();
});

test("wrapping render functions", t => {
    let orig = () => (
        <div cls="b">
            Some Text
        </div>
    );
    let expexted = () => (
        <div
            cls="b"
            style={[{ fontWeight: "bold" }]}
        >
            Some Text
        </div>
    );

    let wrapped = wrap(orig);
    t.deepEqual(wrapped(), expexted(), "render function wrapped as expected");

    // eslint-disable-next-line react/display-name
    orig = (arg1, arg2) => (
        <div cls="b">
            {arg1} {arg2}
        </div>
    );
    // eslint-disable-next-line react/display-name
    expexted = (arg1, arg2) => (
        <div
            cls="b"
            style={[{ fontWeight: "bold" }]}
        >
            {arg1} {arg2}
        </div>
    );

    wrapped = wrap(orig);
    t.deepEqual(wrapped(1, 2), expexted(1, 2), "render function with arguments wrapped as expected");

    class Comp extends React.Component {
        constructor(props) {
            super(props);
            this.renderWrapped = wrap(this.renderWrapped.bind(this));
        }
        render() {
            return (
                <div>{ this.renderWrapped() }</div>
            );
        }
        renderWrapped() {
            return (
                <p cls="b">
                    Text
                </p>
            );
        }
    }
    Comp.displayName = "Comp";

    const expected = (
        <div>
            <p
                cls="b"
                style={[{ fontWeight: "bold" }]}
            >
                Text
            </p>
        </div>
    );

    const comp = new Comp();
    const output = comp.render();
    t.deepEqual(output, expected);
    t.end();
});
