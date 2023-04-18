import T from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary} from '../styles/accordionStyles';
import {COLORS} from '../styles/theme';

/**
 * Accordion based on material design
 * @param props
 * @returns {JSX.Element}
 * @constructor
 *
 * @author mudit
 */

export default function MaterialAccordion(props) {
	const [expanded, setExpanded] = useState(props.expanded);
	useEffect(() => {
		if (!expanded) setExpanded(props.expanded);
	}, [props.expanded]);
	return (
		<Accordion
			TransitionProps={{unmountOnExit: true}}
			defaultExpanded={props.defaultExpanded}
			expanded={expanded}
			onChange={() => {
				setExpanded(!expanded);
			}}
		>
			<AccordionSummary style={{backgroundColor: COLORS.LIGHT_BG_TRANSPARENT}}>{props.title}</AccordionSummary>
			<AccordionDetails>{props.children}</AccordionDetails>
		</Accordion>
	);
}

MaterialAccordion.propTypes = {
	title: T.string,
	children: T.any
};
