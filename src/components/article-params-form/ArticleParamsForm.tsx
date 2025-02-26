import { useState, useRef, useEffect, FormEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	formState: ArticleStateType;
	setFormState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	formState,
	setFormState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [localFormState, setLocalFormState] = useState(formState);
	const sidebarRef = useRef<HTMLElement | null>(null);

	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		if (!isOpen) return;
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);
	const handleArticleParamsChange = <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => {
		setLocalFormState((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};
	const handleResetChanges = () => {
		setLocalFormState(defaultArticleState);
		setFormState(defaultArticleState);
	};
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(localFormState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleResetChanges}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={localFormState.fontFamilyOption}
						onChange={(option) =>
							handleArticleParamsChange('fontFamilyOption', option)
						}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={localFormState.fontSizeOption}
						onChange={(option) =>
							handleArticleParamsChange('fontSizeOption', option)
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={localFormState.fontColor}
						onChange={(option) =>
							handleArticleParamsChange('fontColor', option)
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={localFormState.backgroundColor}
						onChange={(option) =>
							handleArticleParamsChange('backgroundColor', option)
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={localFormState.contentWidth}
						onChange={(option) =>
							handleArticleParamsChange('contentWidth', option)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
