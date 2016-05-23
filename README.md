# React Native Tachyons
[![Build Status](https://travis-ci.org/fab1an/react-native-tachyons.svg?branch=master)](https://travis-ci.org/fab1an/react-native-tachyons) [![npm version](https://badge.fury.io/js/react-native-tachyons.svg)](https://badge.fury.io/js/react-native-tachyons)

React Native Tachyons brings atomic styling to react-native. It is inspired by [Tachyons](http://tachyons.io) and uses it's scales and naming convention.

Tachyons gives you lot's of mini-classes which you apply directly to the components. [More about the advantages of this approach](http://mrmrs.io/writing/2016/03/24/scalable-css).

Let's see how the tachyons way compares to traditional styling:

##### 1. Normal `react-native` way

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

##### 2. Improved with `react-native-tachyons`

```javascript
<View s={[s.ba, s.jcfs, s.pa2]}      /* 'ba' means border-all */
   <Text style={[s.white, s.tc]}>
       Something
   </Text>
</View>
```
**Advantages**:
* Les code
* No need to maintain a separate stylesheet
* No need to find a proper name for every component you want to style
* Looking at a component tells you exactly how it looks, it's all in one place.
* Tachyons dimensions and typography build on a proven scale, which is relative to REM units. So instead of specifying a pixel-padding you just say `pa2` to get `padding` on the second part of the scale which translates to `0.5rem`. This way your space is always relative to your font-size, which is a great advantages in building a responsive app. [More about spacing](http://tachyons.io/docs/layout/spacing/) / [More about typographic scale](http://tachyons.io/docs/typography/scale/)





##### 3. Further improvement by a className string
We can further reduce the boilerplate by specifiying the properties in a `className`-string:

```javascript
<View className="ba jcfs pa2"}
   <Text className="white tc">
       Something
   </Text>
</View>
```

### Usage
`react-native-tachyons` needs to calculate `rem` upon start.

1. In the entry point of your app include:
   ```javascript
   import NativeTachyons from 'react-native-tachyons';

   NativeTachyons.build({
       /* REM parameter it optional, default is 16 */
       rem: width > 340 ? 18 : 16
   });
   ```

2. To use the styles
   ```javascript
   import {styles} from "react-native-tachyons";
   ```

3. To use the `className=''` wrapping
   ```javascript
   import {wrap} from "react-native-tachyons";

   wrap(class MyComponent extends React.Component {
   ...
   })

   ````


### Reference
*
### TODO
* support all react-native styles
* write the transpiler as babel-plugin



*TODO*


