## 3.7
* Add `fontRem` option for more flexibility on phone-screens. Thank to [@peacechen](https://github.com/peacechen)

## 3.6
* Allow the `cls` property-name to be customized to something else. Thanks to [@artificis](https://github.com/artificis)

### 3.5.2
* bugfix for min-height

### 3.5.1
* updated dependencies

## 3.5
* added support for `tint-color`. Thanks to [@mordaha](https://github.com/mordaha)

### 3.4.2
* updated dependencies

### 3.4.1
* upgraded dependencies
* removed yarn.lock
* added npm-5 `package-lock.json`

## 3.4
* added `line-height` and `letter-spacing` options. Thanks to [@luangch](https://github.com/luangch)

### 3.3.3
* removed debug dependency, as it keeps making problems.

### 3.3.2
* upgraded readme

### 3.3.1
* upgraded dependencies

## 3.3
* added [`absolute`](https://github.com/tachyons-css/react-native-style-tachyons#absolute) styles

### 3.2.1
* bugfix

## 3.2
* Wrapper can take functions now. Thanks to [@stefnnn](https://github.com/stefnnn) for [PR#31](https://github.com/tachyons-css/react-native-style-tachyons/pull/31).

  ```jsx
  const wrapped = NativeTachyons.wrap(() => <Text cls="b">Hi there!</Text>).
  ```

### 3.1.1
* updated dependencies

### 3.1
* added additional step for margins, paddings, heights and widths for `32rem`
* added additional step `br5`

### 3.0.3
* updated dependencies, fix #28

### 3.0.2
* Bugfix

### 3.0.1
* improved wrapper speed

## 3.0
* Initializing is now twice as fast.
* Dark/light color variants aren't created anymore, please specify them directly in the palette:

 ```javascript
    palette: {
       light_green: "#00FF01"
    }
 ```
 Opacity-variants (e.g. `bg-green-10`) are still available.

* The styles object contains only the underscore names, so `styles.flx_i` works, but `styles["flx-i"]` doesn't. The class-wrapping isn't changed, it's syntax is still `cls="flx-i"`.
* The raw values of colors aren't exported anymore.

## 2.7
* added the `br` values to the exported sizes
* added `fonts` option to set font-families

### 2.6.1
* updated readme

## 2.6
* Allow ad-hoc colors to be specified like `bg-#ffab12`

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

### 2.0.1 – 2.0.2
* updated readme
* updated links
* updated keywords

# 2.0
* renamed `absolute--fill` to `absolute-fill` and explained the double hypens in the Readme.
* removed `relative`, `flx-col`, `flx-nowrap`, `ais` and `jcfs` as those are default-values, and there's no inheritance in RN.
* added `flx-row-reverse` and `flx-col-reverse`

### 1.7.1 – 1.7.8
* updated readme and dependencies
* moved package to tachyons-css
* renamed package to `react-native-style-tachyons`

## 1.7
* all styles with hypened in their names now have version with underscores

### 1.6.11
* updated dependencies

### 1.6.10
* added `br--left` and `br--right`, which were accidentally omitted.

### 1.6.3 – 1.6.9
* Bugfixes

### 1.6.2
* Translation performance improved by a factor of 2

### 1.6.1
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

### 1.1.1
* added more tests and a bugfix when merging existing styles

## 1.1
* added more properties and references

### 1.0.1
* fixed badge

## 1.0
* initial version
