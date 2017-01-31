import React from "react";
import _ from "lodash";
import { styles } from "./index";
import cssColors from "css-color-names"

/* wrap takes a Component or a JSX-statement and recursively replaces 
   the prop 'cls' with the respective 'style' definitions.
   Usually, wrapping a whole Class / Component will do the trick,
   but for some render function (specifically ListView -> renderHeader) 
   this will not work. Hence the JSX-output of such functions can also be 
   wrapped */
export function wrap(componentOrElement) {
    if (React.isValidElement(componentOrElement)) {
        const element = componentOrElement;
        return recursiveStyle(element);
    }
    const WrappedComponent = componentOrElement;
    const newClass = class extends WrappedComponent {
        render() {
            return recursiveStyle(super.render());
        }
    }

    /* Fix name */
    newClass.displayName = WrappedComponent.displayName || WrappedComponent.name

    return newClass;
}

function recursiveStyle(elementsTree) {
    const { props } = elementsTree;
    let newProps;
    let translated = false;

    /* Parse cls string */
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

        const splitted = props.cls.replace(/-/g, "_").split(" ")
        for (let i = 0; i < splitted.length; i++) {
            const cls = splitted[i];
            if (cls.length > 0) {
                const style = styles[cls];
                if (style) {

                    /* Style found */
                    newProps.style.push(style);

                } else if (cls.startsWith("bg_")) {
                    newProps.style.push({
                        backgroundColor: cls.slice(3)
                    })

                } else if (cls.startsWith("b__")) {
                    newProps.style.push({
                        borderColor: cls.slice(3)
                    })

                } else if (cssColors[cls] || (/^(rgb|#|hsl)/).test(cls)) {
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

        /* Convert child array */
        newChildren = React.Children.toArray(newChildren);
        for (let i = 0; i < newChildren.length; i++) {
            const c = newChildren[i];
            if (React.isValidElement(c)) {
                const converted = recursiveStyle(c);
                if (converted !== c) {
                    translated = true;
                    newChildren[i] = converted;
                }
            }
        }

    } else if (React.isValidElement(newChildren)) {

        /* Convert single child */
        const converted = recursiveStyle(newChildren);
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
