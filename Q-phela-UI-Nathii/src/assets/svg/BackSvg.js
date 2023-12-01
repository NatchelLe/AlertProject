import * as React from "react"
import Svg, { Path } from "react-native-svg"
const BackSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="m21.887 4.838-2.224-2.213L7.3 15l12.375 12.375 2.212-2.212L11.725 15 21.887 4.838Z"
    />
  </Svg>
)
export default BackSvg
