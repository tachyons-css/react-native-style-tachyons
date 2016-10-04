import React from "react";
import _ from "lodash";
import NativeTachyons from "./index";
import Color from "color";

function isColor(str) {
    try {
        Color(str)
        return true
    } catch (err) {
        return false
    }
}

export function wrap(WrappedComponent) {
    const newClass = class extends WrappedComponent {
        render() {
            return this._recursiveStyle(super.render());
        }

        _recursiveStyle(elementsTree) {
            const props = elementsTree.props;
            let newProps;
            let translated = false;

            /* parse cls string */
            if (_.isString(props.cls)) {
                newProps = {}
                translated = true
                if (_.isArray(props.style)) {
                    newProps.style = props.style.slice()

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
                        if (style) {
                            newProps.style.push(style);

                        } else if (cls.startsWith("bg-") && isColor(cls.slice(3))) {
                            newProps.style.push({
                                backgroundColor: cls.slice(3)
                            })

                        } else if (cls.startsWith("b--") && isColor(cls.slice(3))) {
                            newProps.style.push({
                                borderColor: cls.slice(3)
                            })

                        } else if (isColor(cls)) {
                            newProps.style.push({
                                color: cls
                            })

                        } else {
                            throw new Error(`style '${cls}' not found`);
                        }

                    }
                }
            }

            let newChildren = props.children;
            if (_.isArray(newChildren)) {

                /* convert child array */
                newChildren = React.Children.toArray(newChildren);
                for (let i = 0; i < newChildren.length; i++) {
                    const c = newChildren[i];
                    if (React.isValidElement(c)) {
                        const converted = this._recursiveStyle(c);
                        if (converted !== c) {
                            translated = true;
                            newChildren[i] = converted;
                        }
                    }
                }

            } else if (React.isValidElement(newChildren)) {

                /* convert single child */
                const converted = this._recursiveStyle(newChildren);
                if (converted !== newChildren) {
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

