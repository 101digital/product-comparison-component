import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const FailedIcon: React.FC<Props> = ({ size, color }) => {
  return (
    <SvgCss
      xml={`<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
 <g>
     <g>
         <path d="M256,0C114.51,0,0,114.497,0,256c0,141.49,114.497,256,256,256c141.49,0,256-114.497,256-256C512,114.51,397.503,0,256,0z
              M360.121,335.987c6.665,6.664,6.665,17.471,0,24.136c-6.664,6.664-17.469,6.667-24.136,0L256,280.136l-79.986,79.987
             c-6.665,6.665-17.471,6.665-24.136,0c-6.665-6.664-6.665-17.471,0-24.136L231.864,256l-79.986-79.987
             c-6.665-6.664-6.665-17.471,0-24.136s17.471-6.665,24.136,0L256,231.864l79.986-79.987c6.664-6.664,17.471-6.664,24.136,0
             c6.665,6.664,6.665,17.471,0,24.136L280.136,256L360.121,335.987z"/>
     </g>
 </g>
 </svg>`}
      width={size}
      height={size}
      fill={color}
    />
  );
};
export { FailedIcon };
