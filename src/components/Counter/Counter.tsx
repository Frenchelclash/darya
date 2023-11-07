import React from "react";
import { FC, PropsWithChildren, HTMLProps } from "react";
import classNames from 'classnames';
import styles from './Counter.module.css';
import { Text } from "../../ui";

export type CounterType = PropsWithChildren<{
    counter: number;
}>& HTMLProps<HTMLDivElement>;

export const Counter: FC<CounterType> = ({counter, children, className, ...props}) => (
    <Text className={classNames(styles.root, className)} >
        счёт: {counter}
    </Text>
);
