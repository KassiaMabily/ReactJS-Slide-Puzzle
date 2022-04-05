import React from 'react'

const Flag = ({ image, isSelected, ...props } : IProps) => (
  <img   
    alt="flag" 
    src={image} 
    className={isSelected ? 'flag selected' : 'flag'}  
    {...props}   
  />
)

export default Flag

interface IProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  image: string;
  isSelected: boolean;
}
