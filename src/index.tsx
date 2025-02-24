import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState<Record<string, boolean>>({
		sidebar: false,
	});

	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const [tempArticleState, setTempArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const sidebarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target as Node)
			) {
				if (isOpen.sidebar) {
					toggleState('sidebar');
				}
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const toggleState = (key: string) => {
		setIsOpen((prevState) => ({
			...prevState,
			[key]: !prevState[key],
		}));
	};

	const handleArticleParamsChange = <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => {
		setTempArticleState((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const handleApplyChanges = () => {
		setArticleState(tempArticleState);
	};

	const handleResetChanges = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				ref={sidebarRef}
				isOpen={isOpen.sidebar}
				onToggle={() => toggleState('sidebar')}
				articleState={tempArticleState}
				onApply={handleApplyChanges}
				onReset={handleResetChanges}
				onChange={handleArticleParamsChange}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
