import React, { FC, HTMLProps, PropsWithChildren, useState, useEffect } from "react";
import classNames from 'classnames';
import styles from './GamePage.module.css';
import { Button, Text } from '../../ui'
import { Layout } from "../Layout";
import data from '../../data/data.json';
import { Counter } from "../Counter";

export type GamePageType = PropsWithChildren<
  {
  } & HTMLProps<HTMLDivElement>
>;

export const GamePage: FC<GamePageType> = ({ children, className, ...props}) => { 
  const original:string[] = data.original;
  const fake:string[] = data.fake;

  const [counter, setCounter] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [selectedOriginal, setSelectedOriginal] = useState('');
  const [selectedFake, setSelectedFake] = useState('');
  const [remainingOriginal, setRemainingOriginal] = useState([...original]);
  const [remainingFake, setRemainingFake] = useState([...fake]);
  const [shuffledValues, setShuffledValues] = useState([{}]);
  const [game, setGame] = useState(false);

  const getRandomValue = (array:string[]) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    const selectedString:string = array[randomIndex];
    return{selectedString, randomIndex};
  };

  useEffect(() => {
    const randomValueO = getRandomValue(remainingOriginal);
    setSelectedOriginal(randomValueO.selectedString);
    const randomValueF = getRandomValue(remainingFake);
    setSelectedFake(randomValueF.selectedString);
    const values:any = [ 
      { name: randomValueO.selectedString, array: "original" },
      {name: randomValueF.selectedString, array: "fake"}
    ]

    const shufflResult = shuffleButtons(values);
    setShuffledValues(shufflResult);
    setClickCount(clickCount + 1);
  }, [])

  const shuffleButtons = (array:{}[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  const handleButtonClick = () => {
    const randomValueO = getRandomValue(remainingOriginal);
    setSelectedOriginal(randomValueO.selectedString);
    const randomValueF = getRandomValue(remainingFake);
    setSelectedFake(randomValueF.selectedString);

    const values:any = [ 
      { name: randomValueO.selectedString, array: "original" },
      {name: randomValueF.selectedString, array: "fake"}
    ]

    const shufflResult = shuffleButtons(values);
    setShuffledValues(shufflResult);
    
    remainingOriginal.splice(randomValueO.randomIndex, 1);
    setRemainingOriginal([...remainingOriginal]);
    remainingFake.splice(randomValueF.randomIndex, 1);
    setRemainingFake([...remainingFake]);

    setClickCount(clickCount + 1);
  };

  const handleButtonClickOriginal = () => {
    handleButtonClick();
    setCounter(counter + 1);
  };

  const handleButtonClickFake= () => {
    handleButtonClick();
    setCounter(counter);
  };


  return (
    <Layout className={classNames(styles.root, className)} >
        { !game &&
          <div className={styles.wrapper}>
            <Text className="mb-12">
              нужно отличить настоящее название книги дарьи донцовой от сгенерированного чатом жпт
            </Text>
            <Button onClick={()=> setGame(true)}>играть</Button>
          </div>
        }

      { game &&  clickCount <= 10 &&
        <div className={styles.wrapper}>

          { shuffledValues.map((value:any, index)=> (
              <Button className={styles.Button} key={index} onClick={value.array === "original" ? handleButtonClickOriginal : handleButtonClickFake } resultColor={value.array === "original" ? 'green' : 'red'} >{value.name}</Button>
          ))}
          <Counter counter={counter}/>
        </div>
      }
        { game && clickCount > 10 && 
        <div className={styles.wrapper}>
          <Text> {(counter <= 3 && 'стоит потренироваться ещё') || (counter <= 6 && counter > 3 && 'ты в порядке') || (counter <= 10 && counter > 6 && 'вау поздравляю') }
          </Text>
          <Text> твой счёт {counter} из 10 </Text>
          <Button onClick={()=> {setClickCount(0); setCounter(0)}}>ещё раз</Button>
        </div>
        }
  </Layout>
  )

};