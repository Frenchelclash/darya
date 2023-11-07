import React, { FC, HTMLProps, PropsWithChildren } from "react";
import classNames from 'classnames';
import styles from './Header.module.css';
import { ReactComponent as Icon } from "../../data/logo.svg";

export type HeaderType = PropsWithChildren<
  {
  } & HTMLProps<HTMLDivElement>
>;

export const Header: FC<HeaderType> = ({children, className, ...props}) => (
    <div className={classNames(styles.root, className)} {...props}>
        <a href="/"><Icon /></a>
        {children}
    </div>
);