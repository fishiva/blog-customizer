import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';


import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from '../select';
import * as articleProps from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { ArticleStateType } from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';


type ArticleParamsFormProps = {
	setAppState : (value: ArticleStateType) => void;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const {setAppState} = props

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [state,setState] = useState<ArticleStateType>(articleProps.defaultArticleState) 

	const change = (cellText:string) => {
		return (value: articleProps.OptionType) => {
			setState((curState) => ({
				...curState,
				[cellText]: value
			})
			);
		};
	};

	const submitChanges = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setAppState(state)
	}

	const resetChanges = (e: FormEvent<HTMLFormElement>) => {
		setAppState(articleProps.defaultArticleState);
		setState(articleProps.defaultArticleState);
	}

  const rootRef = useRef<HTMLDivElement | null>(null);

	function toggleOpen() {
		setIsOpen(prevActive => !prevActive)
   }

  useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

  // useEffect(() => {
  //   // if(isActive === false) return;
	// 	const handleClick = (evt: MouseEvent) => {
	// 	if (containerRef.current && !containerRef.current.contains(evt.target as Node)){
	// 		toggleOpen();
  //     console.log('1')
	// 	}

// 		window.addEventListener('click', handleClick)

// 		return () => {
// 			document.removeEventListener('click', handleClick);
// 		}
// 	}
// },[containerRef.current])
	  
	return (
		<>
      <div ref ={rootRef}>
        <ArrowButton 
          isOpen = {isOpen} onClick ={toggleOpen}/>
        <aside className={clsx(styles.container, isOpen && styles.container_open)} >
          <form className={styles.form} onSubmit={submitChanges} onReset={resetChanges}>
            <Text uppercase = {true} size={31} weight={800} fontStyle={'normal'}>Задайте параметры</Text>
            <Select title={'Шрифт'} selected={state.fontFamilyOption} options={articleProps.fontFamilyOptions} 
            onChange={change('fontFamilyOption')}></Select>
            <RadioGroup name = 'fontSizeOptions' options={articleProps.fontSizeOptions} selected={state.fontSizeOption}
            title='Размер шрифта' onChange={change('fontSizeOption')}></RadioGroup>
            <Select title={'Цвет шрифта'} selected={state.fontColor} options={articleProps.fontColors} 
            onChange={change('fontColor')}></Select>
            <Separator />
            <Select title={'Цвет фона'} selected={state.backgroundColor} options={articleProps.backgroundColors} 
            onChange={change('backgroundColor')}></Select>
            <Select title={'Ширина контента'} selected={state.contentWidth} options={articleProps.contentWidthArr} 
            onChange={change('contentWidth')}></Select>
            <div className={styles.bottomContainer}>
              <Button title='Сбросить' type='reset' />
              <Button title='Применить' type='submit' />
            </div>
          </form>
        </aside>
      </div>
  </>
);
};
