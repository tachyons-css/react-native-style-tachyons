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

/* Note: You can still use your old styles a long tachyons classes */
```
###### Advantages
* Less code
* No need to maintain a separate stylesheet
* No need to find a proper name for every component you want to style
* Looking at a component tells you exactly how it looks, it's all in one place.
* Tachyons dimensions and typography build on a proven scale, which is relative to REM, the root font-size. Instead of specifying a pixel-padding you specify a step at the scale. `pa2` gets you `padding` of `0.5rem`. This way your spaces are always relative to your font-size, which is a great advantage when  building a responsive app.

  [More about Tachyons' spacing scale](http://tachyons.io/docs/layout/spacing/)

  [More about Tachyons' typographic scale](http://tachyons.io/docs/typography/scale/)





##### 3. Further improvement by using `cls=""`:
We can further reduce the boilerplate by specifying the properties as a property called `cls`. It will show an error if a non-existing property is used.

```javascript
<View cls="ba jcfs pa2"}
   <Text cls="white tc">
       Something
   </Text>
</View>
```
Of course use can use both the `cls` and the `style` property.


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

##### FlexBox
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

##### Margins & Paddings [(Scale)](http://tachyons.io/docs/layout/spacing/)
```
ma0 ... ma7           margin: 0|0.25|0.5|1|2|4|8|16rem
ml|mr|mb|mt [0-7]     marginLeft, marginRight, marginBottom, marginTop
mh [0-7]              marginHorizontal
mv [0-7]              marginVertical

Same with p for padding
```

##### Heights & Widths
```
h1 ... h5             height: 1|2|4|8|16rem
w1 ... w5             width: 1|2|4|8|16rem
```

##### Borders
```
ba                     borderWidth: 1
bl|br|bt|bb            borderLeftWidth: 1 | borderRightWidth: 1...

br0 ... br4            borderRadius: 0|0.125|0.25|0.5|1rem
br--bottom             bottom radius only = borderTopLeftRadius: 0, borderTopRightRadius: 0,
br--top                top radius only = borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
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
rm-contain              resizeMode: "contain"
rm-cover                resizeMode: "cover"
rm-stretch              resizeMode: "stretch"
```

##### Opacity
```
o-10|20|...|100         opacity: 0.1|0.2|...|1
o-05                    opacity: 0.5
o-025                   opacity: 0.25
```

### Changes
* `v1.4.0` support opacities
* `v1.3.0` set react-native peer-dependency to 0.x
* `v1.2.0` support border-radii properties
* `v1.1.1` added more tests and a bugfix when merging existing styles
* `v1.1.0` added more properties and references
* `v1.0.1` fixed badge
* `v1.0.0` first version

