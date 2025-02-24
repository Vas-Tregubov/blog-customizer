import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	articleState: ArticleStateType;
	onChange: <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	articleState,
	onChange,
}: ArticleParamsFormProps) => {
	const handleFontFamilyChange = (option: OptionType) => {
		onChange('fontFamilyOption', option);
	};

	const handleFontSizeChange = (option: OptionType) => {
		onChange('fontSizeOption', option);
	};

	const handleFontColorChange = (option: OptionType) => {
		onChange('fontColor', option);
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		onChange('backgroundColor', option);
	};

	const handleContentWidthArrChange = (option: OptionType) => {
		onChange('contentWidth', option);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={articleState.fontFamilyOption}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={articleState.fontSizeOption}
						onChange={handleFontSizeChange}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={articleState.fontColor}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={articleState.backgroundColor}
						onChange={handleBackgroundColorChange}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={articleState.contentWidth}
						onChange={handleContentWidthArrChange}
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
