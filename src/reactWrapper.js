import React from "react";
import { checkState } from "./util/Preconditions";
import _ from "lodash";
import NativeTachyons from "./index";

export function wrap(WrappedComponent) {
    const newClass = class extends WrappedComponent {
        render() {
            return this._recursiveStyle(super.render());
        }

        _recursiveStyle(elementsTree) {
            checkState(React.isValidElement(elementsTree), "not a element tree: ", elementsTree);

            const props = _.assign({}, elementsTree.props);

            /* parse cls string */
            if (_.isString(props.cls)) {
                if (_.isObject(props.style)) {
                    props.style = [props.style]
                } else if (!_.has(props, "style")) {
                    props.style = []
                }
                _.split(props.cls, " ").forEach(cls => {
                    if (cls !== "") {
                        checkState(_.has(NativeTachyons.styles, cls), `style '${cls}' not found`);
                        props.style.push(NativeTachyons.styles[cls]);
                    }
                });
            }

            let children = React.Children.map(props.children, c => {
                if (React.isValidElement(c)) {
                    return this._recursiveStyle(c)
                }
                return c
            })

            if (_.isArray(children) && children.length === 1) {
                children = children[0];
            }

            return React.cloneElement(elementsTree, props, children)
        }
    }

    /* fix name */
    newClass.displayName = WrappedComponent.displayName || WrappedComponent.name

    return newClass;
}
