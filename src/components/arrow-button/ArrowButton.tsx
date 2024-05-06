import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';
import { useEffect, useRef } from 'react';

/** Функция для обработки открытия/закрытия формы */
// export type OnClick = () => void;
export type ArrowButtonProps = {
	isOpen: boolean;
	onClick: () => void;
};

export const ArrowButton = (props: ArrowButtonProps) => {
	const { isOpen, onClick } = props;
	const butRef = useRef<HTMLElement>(null);
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={() => onClick()}
			className={clsx(styles.container, isOpen && styles.container_open)}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isOpen && styles.arrow_open)}
			/>
		</div>
	);
};
