# React Native Style Tachyons
[![npm version](https://img.shields.io/npm/v/react-native-style-tachyons.svg?maxAge=900)](https://www.npmjs.com/package/react-native-style-tachyons)
[![license](https://img.shields.io/npm/l/react-native-style-tachyons.svg?maxAge=2592000)](https://github.com/fab1an/react-native-style-tachyons/blob/master/LICENSE)
[![semver](https://img.shields.io/:semver-%E2%9C%93-brightgreen.svg?maxAge=2592000)](http://semver.org/)
[![build status](https://travis-ci.org/fab1an/react-native-style-tachyons.svg?branch=master&maxAge=900)](https://travis-ci.org/fab1an/react-native-style-tachyons)
[![total townloads](https://img.shields.io/npm/dt/react-native-style-tachyons.svg?maxAge=900)](https://www.npmjs.com/package/react-native-style-tachyons)

***NOTICE:*** *This has been renamed to [`react-native-style-tachyons`](https://www.npmjs.com/package/react-native-style-tachyons). The old module `react-native-tachyons` (without the `-style-`) has been deprecated.*

React Native Style Tachyons brings atomic styling to react-native. It is inspired by [Tachyons](http://tachyons.io) and uses it's scales and naming convention. [More about the advantages of this approach](http://mrmrs.io/writing/2016/03/24/scalable-css).

Let's see how tachyons compares to traditional styling:

##### 1. Traditional `react-native` style:

```javascript
import {StyleSheet} from "react-native";

const s = StyleSheet.create({
  view: {
    borderWidth: 1,
    justifyContent: "flex-start",
    padding: MAGIC_PIXEL_VALUE
  },
  text: {
    color: "white",
    textAlign: "center"
  }
})

<View style={[s.view]}
   <Text style={[s.text]}>Something</Text>
</View>
```

##### 2. Improved with `react-native-style-tachyons`:

```javascript
import {styles as s} from "react-native-style-tachyons";

<View style={[s.ba, s.jcfs, s.pa2]}>     /* 'ba' means border-all */
   <Text style={[s.white, s.tc]}>
       Something
   </Text>
</View>
```

##### 3. or even simpler:

```javascript
<View cls="ba jcfs pa2">                 /* string is checked for validity */
   <Text cls="white tc">
       Something
   </Text>
</View>
```

Of course you can use your old styles along tachyon's classes.

###### Advantages
* Less code
* No need to maintain a separate stylesheet
* No need to find a proper name for every component you want to style
* Looking at a component tells you exactly how it looks, it's all in one place.
* Tachyons dimensions and typography build on a proven scale, which is relative to REM, the root font-size. Instead of specifying a pixel-padding, you specify a step at the scale. `pa2` gets you `padding` of `0.5rem`. This way your spaces are always relative to your font-size, which is a great advantage when building a responsive app.

  [More about Tachyons' spacing scale](http://tachyons.io/docs/layout/spacing/)

  [More about Tachyons' typographic scale](http://tachyons.io/docs/typography/scale/)

### Usage
`react-native-style-tachyons` needs to know your `rem` upon start.

1. In the entry point of your app include:

   ```javascript
   import NativeTachyons from 'react-native-style-tachyons';
   import { StyleSheet } from 'react-native';

   NativeTachyons.build({
       /* REM parameter it optional, default is 16 */
       rem: width > 340 ? 18 : 16
   }, StyleSheet);

   /* the need to pass "StyleSheet" from react-native will be removed */
   ```

3. To use the styles

   ```javascript
   import { styles as s } from "react-native-style-tachyons";
   ```

	To support javascript property syntax, all style names with hyphens have an equivalent with an underscore, e.g. `s.bg_black` instead of `s["bg-black"]`.

2. To use the `cls=''` wrapping

   ```javascript
   import NativeTachyons from "react-native-style-tachyons";

   NativeTachyons.wrap(
       class MyComponent extends React.Component {
       ...
   })
   ```




### Reference / Supported Properties

##### Colors
Specify a color palette in the options and Tachyons will generate styles for you, complete with a light and a dark version:
```javascript
NativeTachyons.build({
   colors: {
      palette: {
         green: "#00FF00",
         red: "#FF0000"
      },
      lighten: 0.2        /* default: 0.2 */
      darken: 0.2         /* default: 0.2 */
   }
}, StyleSheet);
```

```
bg-green               green background
bg-light-green         lighter green background
bg-dark-green          darker green background

b--green               green border
b--light-green         light-green border
b--dark-green          dark-green border

green                  green text
light-green            light-green text
dark-green             dark-green text
```

##### FlexBox
```
absolute               position: "absolute"
relative               position: "relative"
flx-i                  flex: 1
flx-col                flexDirection: "column"
flx-row                flexDirection: "row"
flx-wrap               flexWrap: "wrap"
flx-nowrap             flexWrap: "nowrap"
aifs                   alignItems: "flex-start"
aife                   alignItems: "flex-end"
aic                    alignItems: "center"
ais                    alignItems: "stretch"
asfs                   alignSelf: "flex-start"
asfe                   alignSelf: "flex-end"
asc                    alignSelf: "center"
ass                    alignSelf: "stretch"
jcfs                   justifyContent: "flex-start"
jcfe                   justifyContent: "flex-end"
jcc                    justifyContent: "center"
jcsb                   justifyContent: "space-between"
jcsa                   justifyContent: "space-around"
```

##### Margins & Paddings [(Scale)](http://tachyons.io/docs/layout/spacing/)
```
ma0 ... ma7            margin: 0|0.25|0.5|1|2|4|8|16rem
ml|mr|mb|mt [0-7]      marginLeft, marginRight, marginBottom, marginTop
mh [0-7]               marginHorizontal
mv [0-7]               marginVertical

Same with p for padding
```

##### Heights & Widths
```
h1 ... h5              height: 1|2|4|8|16rem
w1 ... w5              width: 1|2|4|8|16rem

absolute--fill         position: absolute, top/left/right/bottom: 0
```

##### Borders
```
ba                     borderWidth: 1
bl|br|bt|bb            borderLeftWidth: 1 | borderRightWidth: 1...

br0 ... br4            borderRadius: 0|0.125|0.25|0.5|1rem
br--bottom             bottom radius only
br--top                top radius only
br--right              right radius only
br--left               left radius only
```

##### Text & Fonts [(Scale)](http://tachyons.io/docs/typography/scale/)
```
f1 ... f6              fontSize: 3|2.25|1.5|1.25|1|0.875rem
f-headline             fontSize: 6rem
f-subheadline          fontSize: 5rem

normal                 fontWeight: normal
b                      fontWeight: bold
fw1 ... fw900          fontWeight: 100 ... fontWeight: 900

i                      fontStyle: italic

tl|tc|tr|tj            textAlign: left|right|center|justify
```

##### Images
```
rm-contain             resizeMode: "contain"
rm-cover               resizeMode: "cover"
rm-stretch             resizeMode: "stretch"
```

##### Opacity
```
o-10|20|...|100        opacity: 0.1|0.2|...|1
o-05                   opacity: 0.05
o-025                  opacity: 0.025
```

### Changes
* `v1.7.5` added notice to readme
* `v1.7.4` bump because of npm-quirks
* `v1.7.3` renamed package to react-native-style-tachyons
* `v1.7.2`  updated readme & dependencies
* `v1.7.1`  updated readme
* `v1.7`    all styles with hypened in their names now have version with underscores
* `v1.6.11` updated dependencies
* `v1.6.10` added `br--left` and `br--right`
* `v1.6.9` use `files` directive to ignore more files
* `v1.6.8` added `.babelrc` to `.npmignore`
* `v1.6.7` bugfix
* `v1.6.6` bugfix
* `v1.6.5` yet another small improvement
* `v1.6.4` yet another bugfix
* `v1.6.3` bugfix
* `v1.6.2` translation performance improved by a factor of 2
* `v1.6.1` removed `h-100` and `w-100`. I consider this a bugfix under semver, since using `Dimensions` is buggy on Android [#3219](https://github.com/facebook/react-native/issues/3219). You can get the same behaviour with `flx-i` and `absolute--fill`.
* `v1.6.0` added `absolute--fill` for easy full-screen views
* `v1.5.0` added `h-100` and `w-100` for 100% height/width of window, needs `Dimensions` to be passed into `NativeTachyons.build()`
* `v1.4.0` support opacities
* `v1.3.0` set react-native peer-dependency to 0.x
* `v1.2.0` support border-radii properties
* `v1.1.1` added more tests and a bugfix when merging existing styles
* `v1.1.0` added more properties and references
* `v1.0.1` fixed badge
* `v1.0.0` first version

