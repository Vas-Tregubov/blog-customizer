import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { useState } from 'react';
import {
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
}: ArticleParamsFormProps) => {
	const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(
		fontFamilyOptions[0]
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		fontSizeOptions[0]
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		fontColors[0]
	);

	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(backgroundColors[0]);

	const [selectedContentWidthArr, setSelectedContentWidthArr] =
		useState<OptionType>(contentWidthArr[0]);

	const handleFontFamilyChange = (option: OptionType) => {
		setSelectedFontFamily(option);
	};

	const handleFontSizeChange = (option: OptionType) => {
		setSelectedFontSize(option);
	};

	const handleFontColorChange = (option: OptionType) => {
		setSelectedFontColor(option);
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setSelectedBackgroundColor(option);
	};

	const handleContentWidthArrChange = (option: OptionType) => {
		setSelectedContentWidthArr(option);
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
						selected={selectedFontFamily}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={handleFontSizeChange}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={selectedFontColor}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={selectedBackgroundColor}
						onChange={handleBackgroundColorChange}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={selectedContentWidthArr}
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
