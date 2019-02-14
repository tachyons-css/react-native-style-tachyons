import _ from "lodash"

const lineHeights = {
  "lh-solid": 1,
  "lh-title": 1.25,
  "lh-copy": 1.5
}


export const lineHeightsWithProperties = _.mapValues(lineHeights, val => ({ lineHeight: val }))

export default lineHeights
