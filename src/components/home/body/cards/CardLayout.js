/* eslint-disable react/display-name, react/prop-types */
import React, {forwardRef} from 'react';
import {CardContainer, LayoutContainer} from './CardStyles';

/**
 * Component for rendering the React grid layout grid item
 * See {@link https://github.com/react-grid-layout/react-grid-layout}
 *
 * @author mudit
 */
const CustomGridItemComponent = forwardRef(({style, className, onMouseDown, onMouseUp, onTouchEnd, ...props}, ref) => {
	return (
		<LayoutContainer
			style={{...style}}
			className={className}
			ref={ref}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onTouchEnd={onTouchEnd}
		>
			{props.children}
			<CardContainer variant="none" background={props.background}>
				{props.value}
			</CardContainer>
		</LayoutContainer>
	);
});

export default CustomGridItemComponent;
