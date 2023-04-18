import Typography from '@mui/material/Typography';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {CustomLink} from '../../../../../commons/components/commons';
import {LinkButton, OptionContainer, OptionDetails, OptionLinks} from './ConfigurationOptionsStyles';

function ConfigurationOptions() {
	const navigate = useNavigate();

	// TODO update the configuration with the correct links
	const configOptions = [
		{
			title: 'Dashboards',
			subtitle: 'Track metrics and create real time dashboards',
			link: '/dashboards',
			links: [
				{
					name: 'Dashboards',
					link: '/dashboards'
				},
				{
					name: 'Templates',
					link: '/'
				}
			]
		},
		{
			title: 'Modelling',
			subtitle: 'Plan, forecast, analyse to stay ahead of your actuals',
			link: '/models',
			links: [
				{
					name: 'Planning',
					link: '/'
				},
				{
					name: 'Budgeting',
					link: '/'
				},
				{
					name: 'Forecasting',
					link: '/'
				},
				{
					name: 'Analysis',
					link: '/'
				}
			]
		},
		{
			title: 'Reporting',
			subtitle: 'Create views for compliance, monthly MIS or otherwise',
			link: '/views',
			links: [
				{
					name: 'Compliance',
					link: '/'
				},
				{
					name: 'MIS',
					link: '/'
				},
				{
					name: 'Defined Internal Reports',
					link: '/'
				},
				{
					name: 'Templates',
					link: '/'
				}
			]
		}
	];

	return configOptions.map((option, key) => (
		<OptionContainer key={`placeholderConfigOption${key}`}>
			<LinkButton variant="outlined" onClick={() => navigate(option.link)}>
				{option.title}
			</LinkButton>
			<OptionDetails>
				<Typography variant="body1">{option.subtitle}</Typography>
				<OptionLinks>
					{option.links.map((item, linkKey) => (
						<CustomLink to={item.link} key={`configOptionLink${linkKey}`}>
							{item.name}
						</CustomLink>
					))}
				</OptionLinks>
			</OptionDetails>
		</OptionContainer>
	));
}

export default ConfigurationOptions;
