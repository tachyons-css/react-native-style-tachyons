import { test } from "tape";
import NativeTachyons from "../lib/";
import _ from "lodash";
import React from "react";

const styles = NativeTachyons.styles;

test('build', t => {
    const fakeStyleSheet = {
        create: sheet => sheet
    }
    NativeTachyons.build(fakeStyleSheet, {
        colors: {
            palette: {
                green: "#00FF00"
            }
        }
    });

    t.pass("build");
    t.end();
})

test('styles', t => {
    t.ok(_.isObject(styles), "styles is an object");
    t.ok(_.has(styles, "w1"), "example: has w1");
    t.ok(_.has(styles, "w5"), "example: has w5");
    t.ok(_.has(styles, "pb7"), "example: has pb7");
    t.ok(_.has(styles, "f1"), "example: has f1");

    t.deepEqual(styles.pa3, {padding: 16})

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
    t.deepEqual(_.get(styles, "b--dark-green"), {borderColor: "#008000"})

    t.end();
});

test('wrapping', t => {

    const Orig = React.createClass({
        displayName: 'Orig',
        render: function render() {
            return (
                <div cls="w5" />
            )
        }
    });

    const Wrapped = NativeTachyons.wrap(Orig);
    t.equal(
        Orig.displayName,
        Wrapped.displayName,
        "displayName is preserved"
    );

    const instance = new Wrapped().render()
    t.ok(
        _.has(instance, ["props", "style"]),
        "style array is created"
    )

    t.deepEqual(
        {width: 256},
        instance.props.style[0],
        "style is correctly translated"
    );

    t.end();
});
