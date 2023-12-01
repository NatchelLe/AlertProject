import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const MyLocationSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={270}
    height={248}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#3F3D56"
        d="m258.04 247.67-.36-.14c-.079-.031-7.942-3.16-11.625-10.256-3.684-7.095-1.88-15.639-1.862-15.724l.085-.389.36.14c.079.031 7.941 3.16 11.625 10.255 3.684 7.096 1.88 15.64 1.861 15.725l-.084.389Zm-11.396-10.726c3.115 6 9.328 9.075 10.903 9.777.299-1.753 1.238-8.841-1.874-14.834-3.111-5.993-9.327-9.073-10.902-9.777-.299 1.754-1.238 8.841 1.873 14.834Z"
      />
      <Path
        fill="#32CCFE"
        d="M248.87 234.785c6.619 4.137 9.168 12.354 9.168 12.354s-8.183 1.51-14.802-2.627c-6.62-4.137-9.169-12.354-9.169-12.354s8.183-1.509 14.803 2.627Z"
      />
      <Path
        fill="#FFB7B7"
        d="M142.3 132.911a4.27 4.27 0 0 1 1.239-1.289 4.089 4.089 0 0 1 1.637-.65 4.028 4.028 0 0 1 1.75.102c.57.161 1.101.446 1.558.836.144.124.279.258.405.402l16.485-2.493.918-12.877a3.785 3.785 0 0 1 1.237-2.553 3.51 3.51 0 0 1 2.613-.897 3.552 3.552 0 0 1 2.458 1.286 3.828 3.828 0 0 1 .858 2.783l-1.607 18.068-.008.04a3.376 3.376 0 0 1-1.195 1.728 3.178 3.178 0 0 1-1.952.646l-19.39-.348a4.221 4.221 0 0 1-1.615 1.479 4.055 4.055 0 0 1-3.426.146 4.194 4.194 0 0 1-1.693-1.289 4.47 4.47 0 0 1-.935-2.515 4.495 4.495 0 0 1 .663-2.605ZM175.535 242.699h-4.701l-2.237-18.838h6.939l-.001 18.838Z"
      />
      <Path
        fill="#2F2E41"
        d="M176.735 247.433h-15.161v-.199c0-1.626.622-3.185 1.729-4.334a5.788 5.788 0 0 1 4.172-1.796l9.26.001v6.328Z"
      />
      <Path
        fill="#FFB7B7"
        d="m208.39 238.271-4.45 1.577-7.972-17.079 6.568-2.327 5.854 17.829Z"
      />
      <Path
        fill="#2F2E41"
        d="m210.996 242.35-14.349 5.083-.062-.188a6.349 6.349 0 0 1 .289-4.682 5.979 5.979 0 0 1 3.391-3.098h.001l8.763-3.105 1.967 5.99ZM180.713 77.988s-4.68-1.605-7.688 4.816c-3.009 6.422-7.688 13.486-7.688 13.486l2.674.642s.668-4.495 2.34-5.137l-.669 5.779s20.056 6.743 29.081-.642l-.334-2.248s1.337.321 1.337 2.248l1.003-.963s-1.003-1.927-4.011-4.495c-1.975-1.686-2.653-4.894-2.887-6.9a8.177 8.177 0 0 0-2.001-4.546c-1.999-2.225-5.642-4.59-11.157-2.04Z"
      />
      <Path
        fill="#FFB7B7"
        d="M182.438 100.424c4.72 0 8.547-3.975 8.547-8.878 0-4.904-3.827-8.879-8.547-8.879-4.721 0-8.547 3.975-8.547 8.879 0 4.903 3.826 8.878 8.547 8.878Z"
      />
      <Path
        fill="#CBCBCB"
        d="m171.041 107.735-1.554-.538s-3.108 1.345-3.108 3.766c0 2.422-.518 12.107-.518 12.107l6.994.807-1.814-16.142Z"
      />
      <Path
        fill="#FFB7B7"
        d="M198.856 160.655a4.292 4.292 0 0 1-1.025-2.721 4.297 4.297 0 0 1 .933-2.757l-4.363-37.952a3.46 3.46 0 0 1 .837-2.436 3.211 3.211 0 0 1 2.248-1.11 3.187 3.187 0 0 1 2.347.864 3.438 3.438 0 0 1 1.073 2.334l.001.037 3.903 37.992c.142.148.272.306.39.475.313.449.538.958.662 1.498.123.54.143 1.1.059 1.648a4.342 4.342 0 0 1-.553 1.546 4.167 4.167 0 0 1-1.217 1.306 3.93 3.93 0 0 1-3.44.517 4.01 4.01 0 0 1-1.855-1.241Z"
      />
      <Path
        fill="#CBCBCB"
        d="m194.861 123.07 6.993-.807s-.518-9.685-.518-12.107c0-2.421-3.108-3.766-3.108-3.766l-1.554.538-1.813 16.142Z"
      />
      <Path
        fill="#2F2E41"
        d="M172.077 136.509s-5.957 11.313-5.957 25.035c0 13.721-.518 76.677-.518 76.677s7.771 3.767 12.433-.807l4.144-69.682 16.317 68.337s7.771 1.614 11.397-1.077l-6.994-47.62s-2.849-44.661-10.619-47.89c-7.77-3.229-20.203-2.973-20.203-2.973ZM173.202 91.602c3.026-2.275 5.475-4.895 7.095-8.011 0 0 5.553 6.409 8.946 6.73 3.394.32.309-7.692.309-7.692l-6.17-1.602-5.861.641-4.628 3.204.309 6.73Z"
      />
      <Path
        fill="#CBCBCB"
        d="M190.985 104.775s.247-.137-14.504.421l-6.173 1.766-.821.235s.777 16.142 2.849 19.102c2.072 2.959 1.554 4.574 1.036 4.843-.518.269-1.813-.269-1.036 1.076.777 1.345 1.813.538.777 1.345-1.036.807-1.554 3.767-1.554 3.767l22.793 3.228s.777-10.493 2.849-15.873c2.072-5.381 2.59-7.534 2.59-7.534l-1.554-10.761-7.252-1.615Z"
      />
      <Path
        fill="#3F3D56"
        d="M147.651 58.884h-1.31V21.587c0-5.725-2.19-11.216-6.087-15.264C136.357 2.274 131.071 0 125.559 0H49.487C43.975 0 38.69 2.274 34.792 6.323c-3.897 4.048-6.087 9.538-6.087 15.264v204.616c0 5.725 2.19 11.216 6.087 15.264s9.183 6.323 14.695 6.323h76.072c2.729 0 5.431-.559 7.953-1.643a20.75 20.75 0 0 0 6.742-4.68 21.661 21.661 0 0 0 4.505-7.003 22.322 22.322 0 0 0 1.582-8.261V85.433h1.31V58.884Z"
      />
      <Path
        fill="#fff"
        d="M141.918 21.738v204.316a16.66 16.66 0 0 1-1.175 6.165 16.161 16.161 0 0 1-3.357 5.228 15.48 15.48 0 0 1-5.028 3.496 14.99 14.99 0 0 1-5.932 1.232H49.96c-4.113.003-8.059-1.691-10.97-4.71-2.91-3.019-4.547-7.116-4.55-11.388V21.738a16.654 16.654 0 0 1 1.177-6.165 16.168 16.168 0 0 1 3.358-5.23 15.486 15.486 0 0 1 5.03-3.495 15.009 15.009 0 0 1 5.933-1.23h9.295a7.93 7.93 0 0 0-.508 3.673 7.847 7.847 0 0 0 1.215 3.49 7.48 7.48 0 0 0 2.653 2.487c1.067.59 2.258.9 3.467.9h43.582a7.156 7.156 0 0 0 3.467-.9 7.475 7.475 0 0 0 2.652-2.487 7.836 7.836 0 0 0 1.215-3.49 7.93 7.93 0 0 0-.507-3.674h9.929c4.112-.004 8.058 1.69 10.968 4.708 2.911 3.017 4.548 7.113 4.552 11.384v.03Z"
      />
      <Path
        fill="#E5E5E5"
        d="M141.918 51.966v-6.96h-10.14V6.613a14.96 14.96 0 0 0-5.38-.995h-1.32v39.39H89.904v-28.84h-6.7v28.84H53.726V5.617H49.96a14.817 14.817 0 0 0-2.934.289v39.1H34.44v6.96h12.586v16.097L34.44 75.611v8.038L47.026 76.1v47.894H34.44v6.96h12.586V200.2H34.44v6.959h12.586v34.727c.967.194 1.95.291 2.934.289h3.766v-35.016h29.478v35.016h6.7v-35.016h35.174v35.016h1.32a14.942 14.942 0 0 0 5.38-.995v-34.021h10.14V200.2h-10.14v-30.273h10.049v-6.959h-10.049v-32.013h10.14v-6.96h-10.14V81.543h10.14v-6.959h-10.14V51.966h10.14Zm-68.05 0L53.727 64.048V51.966h20.143ZM53.727 72.082l29.478-17.68v69.593H53.726V72.082Zm0 128.118v-69.245h29.478V200.2H53.726Zm71.352 0H89.904v-30.273h35.174V200.2Zm0-37.233H89.904v-32.012h35.174v32.012Zm0-38.972H89.904V81.543h35.174v42.452Zm0-49.411H89.904V51.966h35.174v22.618Z"
      />
      <Path
        fill="#32CCFE"
        d="M147.522 74.713c0 22.1-38.523 71.333-38.523 71.333S70.475 96.813 70.475 74.713c0-10.613 4.059-20.791 11.283-28.296 7.225-7.504 17.023-11.72 27.241-11.72 10.217 0 20.015 4.216 27.24 11.72 7.224 7.505 11.283 17.683 11.283 28.296Z"
      />
      <Path
        fill="#fff"
        d="M131.778 72.973a24.32 24.32 0 0 1-3.839 13.146c-2.503 3.89-6.06 6.924-10.223 8.715a21.99 21.99 0 0 1-13.161 1.346c-4.419-.913-8.478-3.167-11.663-6.476-3.186-3.309-5.355-7.525-6.234-12.115a24.515 24.515 0 0 1 1.296-13.671c1.724-4.324 4.644-8.02 8.39-10.62 3.746-2.599 8.15-3.987 12.655-3.987 2.99-.001 5.951.61 8.714 1.796a22.727 22.727 0 0 1 7.389 5.124 23.743 23.743 0 0 1 4.939 7.67 24.45 24.45 0 0 1 1.737 9.05v.022Z"
      />
      <Path
        fill="#32CCFE"
        d="M108.92 82.313c4.687 0 8.486-3.946 8.486-8.815 0-4.868-3.799-8.815-8.486-8.815-4.687 0-8.487 3.947-8.487 8.815 0 4.869 3.8 8.815 8.487 8.815ZM121.236 93.632a22.184 22.184 0 0 1-12.239 3.699 22.186 22.186 0 0 1-12.239-3.703c.761-2.762 2.367-5.192 4.576-6.921a12.42 12.42 0 0 1 7.665-2.664c2.765 0 5.456.936 7.664 2.666 2.208 1.73 3.813 4.16 4.573 6.923ZM108.999 174.927c5.735 0 10.384-4.829 10.384-10.787 0-5.957-4.649-10.787-10.384-10.787-5.736 0-10.385 4.83-10.385 10.787 0 5.958 4.649 10.787 10.385 10.787Z"
      />
      <Path
        fill="#CBCBCB"
        d="M269.665 248H.335a.33.33 0 0 1-.237-.102.355.355 0 0 1 0-.492.33.33 0 0 1 .237-.102h269.33a.33.33 0 0 1 .237.102.354.354 0 0 1 .098.246.354.354 0 0 1-.098.246.33.33 0 0 1-.237.102Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h270v248H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default MyLocationSvg;
