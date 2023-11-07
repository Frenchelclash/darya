import React, { FC, HTMLProps, PropsWithChildren } from "react";
import classNames from 'classnames';
import styles from './Footer.module.css';

export type FooterType = PropsWithChildren<
  {
  } & HTMLProps<HTMLDivElement>
>;

export const Footer: FC<FooterType> = ({children, className, ...props}) => (
    <div className={classNames(styles.root, className)} {...props}>
      <a href="https://github.com/Frenchelclash">github</a>
      <a href="https://www.linkedin.com/in/anna-vasileva-8a33a7254/">linkedin</a>
        {children}
    </div>
);
