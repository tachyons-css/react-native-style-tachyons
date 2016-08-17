## 2.5
* generate opacity variants for colors: `bg-green-20` and so on.

## 2.4
* access generated sizes via `import { sizes } from "react-native-style-tachyons"`

## 2.3
* access generated colors via `import { colors } from "react-native-style-tachyons"`

## 2.2
* updated readme
* specify `lighten: false` or `darken: false` to skip color variants

## 2.1
* support `minHeight` and `maxHeight` on the scale

## 2.0.1 – 2.0.2
* updated readme
* updated links
* updated keywords

## 2.0
* renamed `absolute--fill` to `absolute-fill` and explained the double hypens in the Readme.
* removed `relative`, `flx-col`, `flx-nowrap`, `ais` and `jcfs` as those are default-values, and there's no inheritance in RN.
* added `flx-row-reverse` and `flx-col-reverse`

## 1.7.1 – 1.7.8
* updated readme and dependencies
* moved package to tachyons-css
* renamed package to `react-native-style-tachyons`

## 1.7
* all styles with hypened in their names now have version with underscores

## 1.6.11
* updated dependencies

## 1.6.10
* added `br--left` and `br--right`, which were accidentally omitted.

## 1.6.3 – 1.6.9
* Bugfixes

## 1.6.2
* Translation performance improved by a factor of 2

## 1.6.1
* removed `h-100` and `w-100`. I consider this a bugfix under semver, since using `Dimensions` is buggy on Android [#3219](https://github.com/facebook/react-native/issues/3219). You can get the same behaviour with `flx-i` and `absolute--fill`.

## 1.6
* added `absolute--fill` for easy full-screen views

## 1.5
* added `h-100` and `w-100` for 100% height/width of window, needs `Dimensions` to be passed into `NativeTachyons.build()`

## 1.4
* support opacities

## 1.3
* set react-native peer-dependency to 0.x

## 1.2
* support border-radii properties

## 1.1.1
* `added more tests and a bugfix when merging existing styles

## 1.1
* added more properties and references

## 1.0 – 1.0.1
* initial version
* fixed badge
