import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
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
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const [isOpen, setIsOpen] = useState(false);

	const sidebarRef = useRef<HTMLElement | null>(null);

	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
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
	}, []);

	const handleArticleParamsChange = <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => {
		setArticleState((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const handleResetChanges = () => {
		setArticleState(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleApply = () => {
		onApply(articleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form}>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={articleState.fontFamilyOption}
						onChange={(option) =>
							handleArticleParamsChange('fontFamilyOption', option)
						}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={articleState.fontSizeOption}
						onChange={(option) =>
							handleArticleParamsChange('fontSizeOption', option)
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={articleState.fontColor}
						onChange={(option) =>
							handleArticleParamsChange('fontColor', option)
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={articleState.backgroundColor}
						onChange={(option) =>
							handleArticleParamsChange('backgroundColor', option)
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={articleState.contentWidth}
						onChange={(option) =>
							handleArticleParamsChange('contentWidth', option)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetChanges}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
