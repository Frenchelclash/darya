import React from "react";
import {  ButtonHTMLAttributes, DetailedHTMLProps, FC, PropsWithChildren } from "react";
import classNames from 'classnames';
import styles from './button.module.css';

export type ButtonType = PropsWithChildren<{
  custom?: boolean;
  resultColor?: 'red' | 'green';
}& DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

export const Button: FC<ButtonType> = ({custom, children, className, resultColor, ...props}) => (
    <button 
    type="button"
    className={classNames(styles.root, custom && styles.custom, className, resultColor === 'green' ? styles.green : styles.red)}
    {...props}
    >
    {children}
  </button>
);
