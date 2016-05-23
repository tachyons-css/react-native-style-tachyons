import { test } from "tape";
import NativeTachyons from "../lib";
import _ from "lodash";
import React from "react";

test('build', t => {
    const fakeStyleSheet = {
        create: sheet => sheet
    }
    NativeTachyons.build(fakeStyleSheet);

    t.pass("build");
    t.end();
})

test('styles', t => {
    t.ok(_.isObject(NativeTachyons.styles), "styles is an object");
    t.ok(_.has(NativeTachyons.styles, "w5"), "example: has w5");

    t.end();
});

test('wrapping', t => {

    const Orig = React.createClass({
        displayName: 'Orig',
        render: function render() {
            return (
                <div className="w5"/>
            )
        }
    });

    const Wrapped = NativeTachyons.wrap(Orig);
    t.equal(
        Wrapped.displayName,
        Orig.displayName,
        "displayName is preserved"
    );

    const instance = new Wrapped().render()
    t.ok(
        _.has(instance, ["props", "style"]),
        "style array is created"
    )

    t.deepEqual(
        instance.props.style[0],
        {width: 256},
        "style is correctly translated"
    );

    t.end();
});
