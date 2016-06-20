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

            const props = elementsTree.props;
            const newProps = {}

            let translated = false;

            /* parse cls string */
            if (_.isString(props.cls)) {
                if (_.isArray(props.style)) {
                    newProps.style = props.style
                } else if (_.isObject(props.style)) {
                    newProps.style = [props.style]
                } else {
                    newProps.style = []
                }

                const splitted = props.cls.split(" ");
                for (let i = 0; i < splitted.length; i++) {
                    const cls = splitted[i];
                    if (cls.length > 0) {
                        const style = NativeTachyons.styles[cls];
                        checkState(!_.isUndefined(style), `style '${cls}' not found`);
                        newProps.style.push(style);
                        translated = true;
                    }
                }
            }

            let newChildren;
            if (_.isArray(props.children)) {

                /* convert child array */
                newChildren = []
                for (let i = 0; i < props.children.length; i++) {
                    const c = props.children[i];
                    if (React.isValidElement(c)) {
                        const converted = this._recursiveStyle(c);
                        if (converted !== c) {
                            translated = true;
                            newChildren[i] = converted;
                        }
                    }
                }

            } else if (React.isValidElement(props.children)) {

                /* convert single child */
                const c = props.children;
                const converted = this._recursiveStyle(c);
                if (converted !== c) {
                    translated = true;
                    newChildren = converted;
                }
            }

            if (translated) {
                return React.cloneElement(elementsTree, newProps, newChildren)
            }

            return elementsTree;
        }
    }

    /* fix name */
    newClass.displayName = WrappedComponent.displayName || WrappedComponent.name

    return newClass;
}

