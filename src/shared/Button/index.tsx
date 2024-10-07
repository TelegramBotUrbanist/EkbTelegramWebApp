import React from 'react';
import './Button.scss';
interface IProps{
  type:"primary"|"secondary"
  onClick?:(e)=>void
  disabled?:boolean
  children?:React.ReactNode
}
const Button:React.FC<IProps> = ({ type, onClick, children, disabled = false }) => {
  return (
    <button className={`button ${type} ${disabled ? 'disabled' : ''}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
