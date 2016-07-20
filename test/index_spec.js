import { test } from "tape";
import NativeTachyons, { styles } from "../lib/";
import _ from "lodash";
import React from "react";
import Benchmark from "benchmark";

test('build', t => {
    const options = {
        colors: {
            palette: {
                green: "#00FF00"
            }
        }
    }
    const fakeStyleSheet = {create: sheet => sheet}
    NativeTachyons.build(options, fakeStyleSheet);
    t.pass("build");

    t.end();
})

test('styles', t => {
    t.ok(_.isObject(styles), "styles is an object");
    t.ok(_.has(styles, "w1"), "example: has w1");
    t.ok(_.has(styles, "w5"), "example: has w5");
    t.ok(_.has(styles, "pb7"), "example: has pb7");
    t.ok(_.has(styles, "f1"), "example: has f1");

    t.ok(_.has(styles, "absolute-fill"), "example: has absolute-fill");
    t.deepEqual(styles.pa3, {padding: 16}, "pa3 is 16")

    /* borders */
    t.deepEqual(styles.br3, {borderRadius: 8}, "br3 is 8")
    t.deepEqual(styles.bl, {borderLeftWidth: 1}, "bl works")
    t.deepEqual(styles["br--top"], {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    }, "br--top works")

    t.deepEqual(styles["o-025"], {opacity: 0.025}, "o-025 is opacity 0.025")

    /* underscore version are generated */
    t.ok(_.has(styles, "flx_i"), "underscore version is generated in addition to hyphenated names")
    t.ok(_.has(styles, "b__green"), "multiple underscores work")

    /* sum of styles */
    t.equal(_.keys(styles).length, 271, "271 styles generated");

    t.end();
});

test('colors', t => {
    t.ok(_.has(styles, "bg-green"), "background-color");
    t.ok(_.has(styles, "b--green"), "border-color");
    t.ok(_.has(styles, "green"), "color");

    t.ok(_.has(styles, "bg-light-green"), "light background-color");
    t.ok(_.has(styles, "b--light-green"), "light border-color");
    t.ok(_.has(styles, "light-green"), "light color");

    t.ok(_.has(styles, "bg-dark-green"), "dark background-color");
    t.ok(_.has(styles, "b--dark-green"), "dark border-color");
    t.ok(_.has(styles, "dark-green"), "dark color");

    t.deepEqual(_.get(styles, "bg-green"), {backgroundColor: "#00FF00"})
    t.deepEqual(_.get(styles, "b--dark-green"), {borderColor: "#00CC00"})

    t.end();
});

test('wrapping', t => {

    function createComponent(clsStr, style) {
        return React.createClass({
            displayName: 'Orig',
            render: function render() {
                return (
                    <div
                        key="1"
                        other="2"
                        cls={clsStr}
                        style={style}
                    >
                        <div key="child1" cls="w2">
                            <div cls="w4" />
                        </div>
                        <div key="child2" cls="w1">
                            Test
                        </div>
                        <div key="child3" cls="w2">
                            <div/>
                        </div>
                    </div>
                )
            }
        })
    }

    function renderComponent(clsStr, style) {
        const Comp = NativeTachyons.wrap(createComponent(clsStr, style))
        return new Comp().render()
    }

    const Orig = createComponent("w5")
    const Wrapped = NativeTachyons.wrap(Orig);
    t.equal(Wrapped.displayName, Orig.displayName, "displayName is preserved");

    let instance = renderComponent("w5")
    t.deepEqual(instance.key, "1", "key is preserved");
    t.deepEqual(instance.props.other, "2", "other properties are preserved");

    /* children */
    t.deepEqual(instance.props.children[0].props.cls, "w2", "child is preserved");
    t.deepEqual(instance.props.children[0].props.style, [{width: 32}], "child cls is converted");
    t.deepEqual(instance.props.children.length, 3, "children are converted");
    t.deepEqual(instance.props.children[0].props.children.props.style, [{width: 128}], "nested single children are converted");
    t.deepEqual(instance.props.children[1].props.children, "Test", "Non-ReactElement children are preserved");
    t.ok(React.isValidElement(instance.props.children[2].props.children), "unaltered single children are preserved");

    t.deepEqual(instance.props.style, [{width: 256}], "style array is created");

    instance = renderComponent("w5", {width: 5})
    t.deepEqual(instance.props.style, [{width: 5}, {width: 256}], "existing style object is converted to array and appended");

    instance = renderComponent("w5", [{width: 5}])
    t.deepEqual(instance.props.style, [{width: 5}, {width: 256}], "existing style array is appended");

    instance = renderComponent("")
    t.deepEqual(instance.props.style, [], "if style is undefined, an array will be created");

    t.throws(renderComponent.bind(this, "w8"), /style 'w8' not found/, "throws if invalid styles are used")

    /* benchmarking */
    const inst = new (NativeTachyons.wrap(createComponent("w2", [])))();
    new Benchmark.Suite()
        .add('wrap', () => inst.render())
        .on('cycle', event => {
            t.comment(`performance: ${event.target}`);
        })
        // .run()

    t.end();
});
