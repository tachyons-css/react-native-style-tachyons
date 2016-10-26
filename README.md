# React Native Style Tachyons
[![npm version](https://img.shields.io/npm/v/react-native-style-tachyons.svg?maxAge=900)](https://www.npmjs.com/package/react-native-style-tachyons)
[![license](https://img.shields.io/npm/l/react-native-style-tachyons.svg?maxAge=2592000)](https://github.com/tachyons-css/react-native-style-tachyons/blob/master/LICENSE)
[![semver](https://img.shields.io/:semver-%E2%9C%93-brightgreen.svg?maxAge=2592000)](http://semver.org/)
[![build status](https://travis-ci.org/tachyons-css/react-native-style-tachyons.svg?branch=master&maxAge=900)](https://travis-ci.org/tachyons-css/react-native-style-tachyons)
[![total townloads](https://img.shields.io/npm/dt/react-native-style-tachyons.svg?maxAge=900)](https://www.npmjs.com/package/react-native-style-tachyons)

## Overview
React Native Style Tachyons brings functional styling to react-native. It is inspired by [Tachyons](http://tachyons.io) and uses it's scales and naming convention. [More about the advantages of this approach](http://mrmrs.io/writing/2016/03/24/scalable-css).

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
Of course you can use your old styles along tachyons' classes.

#### Advantages
* Less code
* No need to maintain a separate stylesheet
* No need to find a proper name for every component you want to style
* Looking at a component tells you exactly how it looks, it's all in one place.

#### Tachyons' scale
Tachyons' dimensions and typography build on a proven scale, which is relative to `rem`, the root font-size. Instead of finding pixel-values for padding (or a margin, width or height), you specify a step at the scale. `pa2` gets you `padding` of `0.5rem`. 

* The scale progresses with powers of two, so each step is twice as big as the last. This means everything will always line up, no more "off-by-one-pixel"-errors.
* You can scale the entire app just by setting a different `rem`. This is a great advantage when building a responsive app.

[More about Tachyons' spacing scale](http://tachyons.io/docs/layout/spacing/)

[More about Tachyons' typographic scale](http://tachyons.io/docs/typography/scale/)
  

## Usage
`react-native-style-tachyons` needs to know your `rem` upon start: 

1. In the entry point of your app include:

   ```javascript
   import NativeTachyons from 'react-native-style-tachyons';
   import { StyleSheet } from 'react-native';

   NativeTachyons.build({
       /* REM parameter is optional, default is 16 */
       rem: screenWidth > 340 ? 18 : 16
   }, StyleSheet);
   ```

2. To use the styles

   ```javascript
   import { styles as s } from "react-native-style-tachyons";
   ```

	To support javascript property syntax, all style names with hyphens have an equivalent with an underscore, e.g. `s.bg_black` instead of `s["bg-black"]`.

3. To use the `cls=''` syntax, you have to wrap your component:

   ```javascript
   import NativeTachyons from "react-native-style-tachyons";

   NativeTachyons.wrap(
       class MyComponent extends React.Component {
       ...
   })
   ```




## Reference / Supported Properties

##### FlexBox
```javascript
absolute               position: "absolute"                 /* default: "relative" */
flx-i                  flex: 1
flx-row                flexDirection: "row"                 /* default: "column" */
flx-row-reverse        flexDirection: "row-reverse"
flx-col-reverse        flexDirection: "column-reverse"
flx-wrap               flexWrap: "wrap"                     /* default: "nowrap" */
aifs                   alignItems: "flex-start"             /* default: "stretch" */
aic                    alignItems: "center"
aife                   alignItems: "flex-end"
jcc                    justifyContent: "center"             /* default: "flex-start" */
jcfe                   justifyContent: "flex-end"
jcsb                   justifyContent: "space-between"
jcsa                   justifyContent: "space-around"
asfs                   alignSelf: "flex-start"
asfe                   alignSelf: "flex-end"
asc                    alignSelf: "center"
ass                    alignSelf: "stretch"
```

##### Margins & Paddings [(Scale)](http://tachyons.io/docs/layout/spacing/)
```javascript
ma0 ... ma7            margin: 0|0.25|0.5|1|2|4|8|16 rem
ml|mr|mb|mt [0-7]      marginLeft, marginRight, marginBottom, marginTop
mh [0-7]               marginHorizontal
mv [0-7]               marginVertical

/* Same with p for padding */
```

##### Heights & Widths
```javascript
h1 ... h5              height: 1|2|4|8|16 rem
w1 ... w5              width: 1|2|4|8|16 rem

min-h1 ... min-h5      minHeight: 1|2|4|8|16 rem
max-h1 ... max-h5      maxHeight: 1|2|4|8|16 rem

/* Same with w for width */

absolute-fill          position: absolute, top/left/right/bottom: 0
```

##### Borders
```javascript
ba                     borderWidth: 1
bl|br|bt|bb            borderLeftWidth: 1 | borderRightWidth: 1...

br0 ... br4            borderRadius: 0|0.125|0.25|0.5|1 rem
br--bottom             bottom radius only
br--top                top radius only
br--right              right radius only
br--left               left radius only
```

##### Text & Fonts [(Scale)](http://tachyons.io/docs/typography/scale/)
```javascript
f5                     fontSize: 1 rem
f1 ... f6              fontSize: 3|2.25|1.5|1.25|1|0.875 rem
f-headline             fontSize: 6 rem
f-subheadline          fontSize: 5 rem

normal                 fontWeight: normal
b                      fontWeight: bold
fw1 ... fw900          fontWeight: 100 ... fontWeight: 900

i                      fontStyle: italic

tl|tc|tr|tj            textAlign: left|right|center|justify
```

##### Images
```javascript
rm-contain             resizeMode: "contain"
rm-cover               resizeMode: "cover"
rm-stretch             resizeMode: "stretch"
```

##### Opacity
```javascript
o-10|20|...|100        opacity: 0.1|0.2|...|1
o-05                   opacity: 0.05
o-025                  opacity: 0.025
```

## Colors
* When using the `cls=''` syntax, colors can be specified directly in the string. Every color-name and syntax that is supported by [Color](https://github.com/qix-/color) works. If the color is prefixed with `bg-` the `backgroundColor` will be set. A prefix of `b--` sets the `borderColor`.

  ```javascript
bg-green                     green background
#232323                      text color of #232323
b--rgba(255,255,255,0.5)     border set to rgba(255,255,255,0.5)
```

* You can also specify a palette in the options and Tachyons will generate styles for you. It will also generate a light and a dark version and variants with different opacities.

  ```javascript
  NativeTachyons.build({
     colors: {
        palette: {
           gold: "#FFD700",
        }
        // lighten: 0.2,        default: 0.2, change or set to false to skip light versions
        // darken: 0.2          default: 0.2, change or set to false to skip dark versions
     }
  }, StyleSheet);
  ```

  The same syntax with `bg-` for background and `b--` for borderColor applies.

  ```javascript
bg-gold                golden background
bg-light-gold          lighter golden background
bg-dark-gold           darker golden background

b--gold                golden border             // Note: double hyphens signify a class that need
b--light-gold          light-gold border         //       another class to work, in this case
b--dark-gold           dark-gold border          //       one of the border-settings.

gold                   golden text
light-gold             light-gold text
dark-gold              dark-gold text

/* opacities (same for bg- and b--) */
gold-10, gold-20 ... gold-90	      golden text with opacity 10%, 20%, ... , 90%

  ```



## Raw Values

To access the hex values of your color palette, or the actual computed sizes:

```javascript
import { colors, sizes } from "react-native-style-tachyons"

const c = colors.bg_yellow
const s = sizes.ma2          /* sizes.w4, ... */
```

## Changes
See the [ChangeLog](https://github.com/tachyons-css/react-native-style-tachyons/blob/master/CHANGELOG.md)
