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
**Advantages**:
* Less code
* No need to maintain a separate stylesheet
* No need to find a proper name for every component you want to style
* Looking at a component tells you exactly how it looks, it's all in one place.
* Tachyons dimensions and typography build on a proven scale, which is relative to REM, the root font-size. Instead of specifying a pixel-padding you specify a step at the scale. `pa2` gets you `padding` of `0.5rem`. This way your spaces are always relative to your font-size, which is a great advantage when  building a responsive app. [More about spacing](http://tachyons.io/docs/layout/spacing/) / [More about typographic scale](http://tachyons.io/docs/typography/scale/)





##### 3. Further improvement by using `cls=""`:
We can further reduce the boilerplate by specifiying the properties as a property called `cls`:

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

### Colors
You can specifiy a color palette in the options like this:
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

Tachyons will generate styles for you:
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

### Reference
*TODO*

### Changes
* `v1.0.0` first version

### TODO
* write the reference above
* support all react-native styles
* maybe write the transpiler as babel-plugin
