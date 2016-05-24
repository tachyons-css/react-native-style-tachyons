# React Native Tachyons
[![Build Status](https://travis-ci.org/fab1an/react-native-tachyons.svg?branch=master)](https://travis-ci.org/fab1an/react-native-tachyons) [![npm version](https://img.shields.io/npm/v/react-native-tachyons.svg)](https://www.npmjs.com/package/react-native-tachyons)

React Native Tachyons brings atomic styling to react-native. It is inspired by [Tachyons](http://tachyons.io) and uses it's scales and naming convention. [More about the advantages of this approach](http://mrmrs.io/writing/2016/03/24/scalable-css).

Let's see how tachyons compares to traditional styling:

##### 1. Traditional `react-native` style:

```javascript
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

##### 2. Improved with `react-native-tachyons`:

```javascript
<View style={[s.ba, s.jcfs, s.pa2]}      /* 'ba' means border-all */
   <Text style={[s.white, s.tc]}>
       Something
   </Text>
</View>
```
###### Advantages
* Less code
* No need to maintain a separate stylesheet
* No need to find a proper name for every component you want to style
* Looking at a component tells you exactly how it looks, it's all in one place.
* Tachyons dimensions and typography build on a proven scale, which is relative to REM, the root font-size. Instead of specifying a pixel-padding you specify a step at the scale. `pa2` gets you `padding` of `0.5rem`. This way your spaces are always relative to your font-size, which is a great advantage when  building a responsive app. [More about spacing](http://tachyons.io/docs/layout/spacing/)





##### 3. Further improvement by using `cls=""`:
We can further reduce the boilerplate by specifying the properties as a property called `cls`:

```javascript
<View cls="ba jcfs pa2"}
   <Text cls="white tc">
       Something
   </Text>
</View>
```

### Usage
`react-native-tachyons` needs to calculate `rem` upon start.

1. In the entry point of your app include:
   ```javascript
   import NativeTachyons from 'react-native-tachyons';
   import { StyleSheet } from 'react-native';

   NativeTachyons.build({
       /* REM parameter it optional, default is 16 */
       rem: width > 340 ? 18 : 16
   }, StyleSheet);

   /* the need to pass "StyleSheet" from react-native will be removed */
   ```

3. To use the styles
   ```javascript
   import { styles } from "react-native-tachyons";
   ````

2. To use the `cls=''` wrapping
   ```javascript
   import NativeTachyons from "react-native-tachyons";

   NativeTachyons.wrap(
       class MyComponent extends React.Component {
       ...
   })
   ````




### Reference / Supported Properties

##### Colors
You can specify a color palette in the options and Tachyons will generate styles for you:
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
bg-green            green background
bg-light-green      lighter green background
bg-dark-green       darker green background

b--green            green border
b--light-green      light-green border
b--dark-green       dark-green border

green               green text
light-green         light-green text
dark-green          dark-green text
```

##### [FlexBox](https://facebook.github.io/react-native/docs/flexbox.html#content)
```
absolute            position: "absolute"
relative            position: "relative"
flx-i               flex: 1
flx-col             flexDirection: "column"
flx-row             flexDirection: "row"
flx-wrap            flexWrap: "wrap"
flx-nowrap          flexWrap: "nowrap"
aifs                alignItems: "flex-start"
aife                alignItems: "flex-end"
aic                 alignItems: "center"
ais                 alignItems: "stretch"
asfs                alignSelf: "flex-start"
asfe                alignSelf: "flex-end"
asc                 alignSelf: "center"
ass                 alignSelf: "stretch"
jcfs                justifyContent: "flex-start"
jcfe                justifyContent: "flex-end"
jcc                 justifyContent: "center"
jcsb                justifyContent: "space-between"
jcsa                justifyContent: "space-around"
```

##### [Margins & Paddings](http://tachyons.io/docs/layout/spacing/)
```
// Based on 8-step scale: 0, 0.25, 0.5, 1, 2, 4, 8, 16rem

ma0 ... ma7           margin: 0rem ... margin: 16rem
m[l,r,b,t][0-7]       marginLeft, marginRight, marginBottom, marginTop
mh                    marginHorizontal
mv                    marginVertical

same with p for padding
```

##### Heights & Widths
```
Based on 5-step scale: 1, 2, 4, 8, 16rem

h1 ... h5             height: 1rem ... height: 16rem
w1 ... w5             width: 1rem ... width: 16rem

Percentages weren't implemented.
```

##### Borders

```
ba                     borderWidth: 1
b[l,r,t,b]             borderLeftWidth, borderRightWidth...
```

##### Text & Fonts
Based on the [typographic scale](http://tachyons.io/docs/typography/scale/)

```
tl / tc / tr / tj      textAlign: left / right / center / justify
i                      fontStyle: italic

/* Sizes: 0.875, 1, 1.25, 1.5, 2.25, 3rem */

f1 ... f6              fontSize: 3rem ... fontSize: 0.875rem
f-headline             fontSize: 6rem
f-subheadline          fontSize: 5rem


normal                 fontWeight: normal
b                      fontWeight: bold
fw1 ... fw900          fontWeight: 100 ... fontWeight: 900

```

##### Images
```
rm-contain              resizeMode: "contain"
rm-cover                resizeMode: "cover"
rm-stretch              resizeMode: "stretch"
```


### Changes
* `v1.1.0` added more properties and references
* `v1.0.1` fixed badge
* `v1.0.0` first version

