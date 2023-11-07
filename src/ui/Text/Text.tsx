import { FC, HTMLProps, PropsWithChildren } from "react";
import { Color } from '../index';
import classNames from 'classnames';
import styles from './text.module.css';

type TextType = PropsWithChildren<
  {
    size?: 12 | 20 | 30 | 32 ;
    color?: Color;
    uppercase?: boolean;
    weight?: 400 | 700;
  } & HTMLProps<HTMLDivElement>
>;

export const Text: FC<TextType> = ({size, color, uppercase, weight, children, className, ...props}) => (
    <div
    className={classNames(
        styles.base,
        styles[`size-${size}`],
        styles[`color-${color}`],
        styles[`weight-${weight}`],
        uppercase && styles.uppercase,
        className,
      )}
      {...props}
    >
        {children}
    </div>
);