import React, { FC, HTMLProps, PropsWithChildren } from "react";
import classNames from 'classnames';
import styles from './Layout.module.css';
import { Header } from "../Header";
import { Footer } from "../../Footer";

export type LayoutType = PropsWithChildren<
  {
  } & HTMLProps<HTMLDivElement>
>;

export const Layout: FC<LayoutType> = ({children, className, ...props}) => (
    <div className={classNames(styles.root, className)} {...props}>
      <Header />
      <div className={styles.wrapper}>
        {children}
      </div>
      <Footer />
    </div>
);
