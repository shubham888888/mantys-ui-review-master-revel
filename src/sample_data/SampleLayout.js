// Sample layout
import {COLORS} from '../commons/styles/theme';

/**
 * TODO: Get rid of the sample data and connect with the data store
 */

const getRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const viewsData = [
	{
		id: 1,
		config: {},
		label: 'Key Metrics',
		type: 'dashboard',
		filters: [
			{
				filterId: '1',
				filterName: 'Year',
				filterType: 'number',
				min: '2010',
				max: '2022'
			},
			{
				filterId: '2',
				filterName: 'Region',
				filterType: 'drop-down',
				allowedValues: ['Delhi', 'Rajasthan', 'Kerala', 'Karnataka']
			},
			{
				filterId: '3',
				filterName: 'Industry',
				filterType: 'drop-down',
				allowedValues: ['Construction', 'Education', 'Financial Services', 'Food', 'Agriculture']
			},
			{
				filterId: '4',
				filterName: 'Country',
				filterType: 'drop-down',
				allowedValues: ['India', 'USA', 'Australia', 'United Kingdom']
			}
		],
		data: [
			{
				id: 1,
				i: 'arr',
				type: 'box',
				label: 'ARR',
				value: {prefix: '$', suffix: '', data: 7450000, subtext: 'Some sub-text will be here'},
				background: '#fff',
				connectedReportId: 3,
				hoverText: 'MRR * 12',
				layout: {
					position: {
						x: 0,
						y: 0,
						w: 1,
						h: 1
					}
				}
			},
			{
				id: 2,
				i: 'customers',
				type: 'box',
				label: 'Total Customers',
				value: {prefix: '', suffix: '', data: 350, subtext: 'Some sub-text will be here'},
				background: '#fff',
				connectedReportId: 3,
				hoverText: 'Some more hover text',
				layout: {
					position: {
						x: 1,
						y: 0,
						w: 1,
						h: 1
					}
				}
			},
			{
				id: 3,
				i: 'orders',
				type: 'box',
				label: 'Total orders',
				value: {data: 2890000},
				background: '#fff',
				connectedReportId: 3,
				hoverText: 'Here will be some <b>formula</b>',
				layout: {
					position: {
						x: 2,
						y: 0,
						w: 1,
						h: 1
					}
				}
			},
			{
				id: 8,
				i: 'arpa',
				type: 'box',
				label: 'ARPA',
				value: {data: 43500, subtext: 'Average new ACV = 60.5k'},
				background: '#fff',
				connectedReportId: 3,
				hoverText: 'ARPA = ARR Live / Total customers <br/>Average new ACV = New ARR / New customers',
				layout: {
					position: {
						x: 3,
						y: 0,
						w: 1,
						h: 1
					}
				}
			},
			{
				id: 11,
				i: 'arr-summary',
				type: 'grid',
				label: 'ARR summary',
				value: [
					{id: 1, customer: 'Roodra Lata', address: 'Hyderabad', revenue: 84737},
					{id: 2, customer: 'Jayadeva Bakshi', address: 'Bhubaneswar', revenue: 75091},
					{id: 3, customer: 'Madhava Achaval', address: 'Gwalior', revenue: 71329},
					{id: 4, customer: 'Srijan Tavade', address: 'Solapur', revenue: 55576},
					{id: 5, customer: 'Raghu Jagatap', address: 'Salem', revenue: 83975}
				],
				background: '#fff',
				connectedReportId: 3,
				layout: {
					position: {
						x: 0,
						y: 1,
						w: 2,
						h: 2
					}
				}
			},
			{
				id: 9,
				i: 'top-customers',
				type: 'grid',
				label: 'Top Customers',
				value: [
					{id: 1, customer: 'Roodra Lata', address: 'Hyderabad', revenue: 84737},
					{id: 2, customer: 'Jayadeva Bakshi', address: 'Bhubaneswar', revenue: 75091},
					{id: 3, customer: 'Madhava Achaval', address: 'Gwalior', revenue: 71329},
					{id: 4, customer: 'Srijan Tavade', address: 'Solapur', revenue: 55576},
					{id: 5, customer: 'Raghu Jagatap', address: 'Salem', revenue: 83975},
					{id: 6, customer: 'Akshey Ashtikar', address: 'Noida', revenue: 72488},
					{id: 7, customer: 'Krishan Mukhtar', address: 'Salem', revenue: 73745},
					{id: 8, customer: 'Purshottama Navathe', address: 'Raipur', revenue: 87188},
					{id: 9, customer: 'Ragunath Bhaumik', address: 'Mangaluru', revenue: 71242},
					{id: 10, customer: 'Yogarasa Mahanta', address: 'Noida', revenue: 65837},
					{id: 11, customer: 'Shudraka Deshmukh', address: 'Saharanpur', revenue: 85448},
					{id: 12, customer: 'Amitabh Panda', address: 'Kurnool', revenue: 98931},
					{id: 13, customer: 'Sahadeva Viswan', address: 'Asansol', revenue: 81585},
					{id: 14, customer: 'Bhima Sarkar', address: 'Kanpur', revenue: 68271},
					{id: 15, customer: 'Vishnu Kamal', address: 'Indore', revenue: 50015},
					{id: 16, customer: 'Hira Bhattacharya', address: 'Hubli-Dharwad', revenue: 81048},
					{id: 17, customer: 'Viswamitra Holkar', address: 'Saharanpur', revenue: 54159},
					{id: 18, customer: 'Hira Ayyangar', address: 'Ajmer', revenue: 82593},
					{id: 19, customer: 'Vishnu Munshi', address: 'Vijayawada', revenue: 74993},
					{id: 20, customer: 'Vakpati Heravdakar', address: 'Amravati', revenue: 77388}
				],
				background: '#fff',
				connectedReportId: 3,
				layout: {
					position: {
						x: 0,
						y: 1,
						w: 2,
						h: 2
					}
				}
			},
			{
				id: 4,
				i: 'expansion-breakdown',
				type: 'pie-chart',
				label: 'Expansion Breakdown',
				background: '#fff',
				// data : [{label : value}] - data from backend - consider 0th index by default
				value: {
					labels: ['New', 'Returning', 'Inactive'],
					datasets: [
						{
							label: 'Expansion',
							data: [44, 15, 14],
							backgroundColor: ['#1d58f8', '#4f7ff9', '#e5e4e4']
						}
					]
				},
				layout: {
					position: {
						x: 2,
						y: 1,
						w: 1,
						h: 2
					}
				}
			},
			{
				id: 5,
				i: 'contraction-breakdown',
				type: 'doughnut',
				label: 'Contraction',
				background: '#fff',
				value: {
					labels: [' 0 to 10%', ' 20 to 40%', ' 40 to 60%', ' 60 to 80%', ' 80 to 100%'],
					datasets: [
						{
							label: 'Contraction',
							data: [11, 21, 19, 0, 0],
							backgroundColor: ['#49cf72', '#9ae5b1', '#ebfaef']
						}
					]
				},
				layout: {
					position: {
						x: 3,
						y: 1,
						w: 1,
						h: 2
					}
				}
			},
			{
				id: 6,
				i: 'net-revenue',
				type: 'line-chart',
				label: 'Net Revenue',
				background: '#fff',
				// value1 : [{month : september, churn_arr : value, new_arr: value, contraction_arr: value, expansion_arr: value, closing_arr: value}]
				value: {
					labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
					datasets: [
						{
							label: 'Actual',
							data: [
								// value1[0].churn_arr
								102.72029537910507, 435.19703773358094, 586.1091369866681, 753.0559589567364,
								951.4513230052844, 1275.1763061215133, 1620.746723249672
							],
							borderColor: 'rgb(53, 162, 235)',
							backgroundColor: 'rgba(53, 162, 235)'
						},
						{
							label: 'Planned',
							data: [
								// value1[0].churn_arr
								82.57567113368735, 466.2295023159397, 818.003420099341, 1052.5742823786286,
								1491.7850915330293, 1732.339027630573, 2159.3257175861245
							],
							borderColor: 'rgb(75, 192, 192)',
							backgroundColor: 'rgba(75, 192, 192)'
						},
						{
							label: 'Worst Case',
							data: [
								94.00411107666793, 109.45340409017199, 277.2875568506967, 395.8516735833618,
								481.95662356255986, 501.8066540386582, 692.0857816385544
							],
							borderColor: 'rgb(255, 99, 132)',
							backgroundColor: 'rgba(255, 99, 132)'
						}
					]
				},
				layout: {
					position: {
						x: 0,
						y: 2,
						w: 2,
						h: 2
					}
				}
			},
			{
				id: 7,
				i: 'revenue-attainment',
				type: 'graph',
				label: 'Revenue Attainment',
				value: {
					labels: ['September'],
					datasets: [
						{
							label: 'Expansion',
							data: [
								500.419307840630267, 171.84219160218987, 616.1355933197898, 725.6579281524289,
								846.4531286477868, 912.2788084284377, 1173.0458305151878
							],
							backgroundColor: '#34a2eb',
							stack: '0'
						},
						{
							label: 'Churn',
							data: [
								getRandom(500, 1500),
								getRandom(500, 1500),
								getRandom(500, 1500),
								getRandom(500, 1500),
								getRandom(500, 1500),
								getRandom(500, 1500),
								getRandom(500, 1500)
							],
							backgroundColor: COLORS.GREEN,
							stack: '0'
						}
					]
				},
				layout: {
					position: {
						x: 2,
						y: 2,
						w: 2,
						h: 2
					}
				}
			}
		]
	},
	{
		id: 2,
		label: 'Business Overview',
		config: {},
		type: 'dashboard',
		filters: [
			{filterId: '1', filterName: 'Year', filterType: 'number', min: '2010', max: '2022'},
			{
				filterId: '2',
				filterName: 'Region',
				filterType: 'drop-down',
				allowedValues: ['Delhi', 'Rajasthan', 'Kerela', 'Karnataka']
			},
			{
				filterId: '3',
				filterName: 'Industry',
				filterType: 'drop-down',
				allowedValues: ['Construction', 'Education', 'Financial Services', 'Food', 'Agriculture']
			},
			{
				filterId: '4',
				filterName: 'Country',
				filterType: 'drop-down',
				allowedValues: ['India', 'USA', 'Australia', 'United Kingdom']
			}
		],
		data: [
			{
				id: 1,
				i: 'arr',
				type: 'box',
				label: 'ARR',
				value: {prefix: '$', suffix: '', data: 3546579, subtext: 'Some sub-text will be here'},
				background: '#C1E8EE',
				connectedReportId: 4,
				layout: {
					position: {
						x: 0,
						y: 0,
						w: 1,
						h: 1
					}
				}
			},
			{
				id: 2,
				i: 'customers',
				type: 'box',
				label: 'Total Customers',
				value: {prefix: '', suffix: '', data: 50, subtext: 'Some sub-text will be here'},
				background: '#CCC1E8',
				connectedReportId: 4,
				layout: {
					position: {
						x: 1,
						y: 0,
						w: 1,
						h: 1
					}
				}
			},
			{
				id: 3,
				i: 'nrr',
				type: 'box',
				label: 'NRR',
				value: {prefix: '', suffix: '%', data: 115, subtext: 'Some sub-text will be here'},
				background: '#C1E8D6',
				connectedReportId: 4,
				layout: {
					position: {
						x: 2,
						y: 0,
						w: 1,
						h: 1
					}
				}
			},
			{
				id: 4,
				i: 'expansion-breakdown',
				type: 'pie-chart',
				label: 'Expansion Breakdown',
				background: '#fff',
				value: {
					labels: ['New', 'Returning', 'Inactive'],
					datasets: [
						{
							label: 'Expansion',
							data: [35, 17, 12],
							backgroundColor: ['#1d58f8', '#4f7ff9', '#e5e4e4']
						}
					]
				},
				layout: {
					position: {
						x: 0,
						y: 1,
						w: 1,
						h: 2
					}
				}
			},
			{
				id: 5,
				i: 'contraction-breakdown',
				type: 'doughnut',
				label: 'Contraction',
				background: '#fff',
				value: {
					labels: ['New', 'Returning', 'Inactive'],
					datasets: [
						{
							label: 'Expansion',
							data: [21, 20, 11],
							backgroundColor: ['#26aca9', '#fed4c6', '#9d9d9d']
						}
					]
				},
				layout: {
					position: {
						x: 1,
						y: 1,
						w: 1,
						h: 2
					}
				}
			},
			{
				id: 6,
				i: 'net-revenue',
				type: 'line-chart',
				label: 'Net Revenue',
				background: '#fff',
				value: {
					labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
					datasets: [
						{
							label: 'Actual',
							data: [
								65.10031201207168, 321.6945096168847, 612.7977118579004, 875.693443984992,
								1071.517149531001, 1245.8559310850478, 1586.3843959700273
							],
							borderColor: 'rgb(53, 162, 235)',
							backgroundColor: 'rgba(53, 162, 235)'
						},
						{
							label: 'Planned',
							data: [
								1.5780069845836175, 388.32071869360385, 830.2111541783898, 1180.9461682900628,
								1405.8069841844804, 1788.8622554475505, 2091.144044413527
							],
							borderColor: 'rgb(75, 192, 192)',
							backgroundColor: 'rgba(75, 192, 192)'
						},
						{
							label: 'Worst Case',
							data: [
								46.549241962941565, 149.13138943196793, 254.76143988131378, 344.217890536687,
								459.25486584672814, 503.33927786268293, 613.0052297591632
							],
							borderColor: 'rgb(255, 99, 132)',
							backgroundColor: 'rgba(255, 99, 132)'
						}
					]
				},
				layout: {
					position: {
						x: 0,
						y: 2,
						w: 4,
						h: 4
					}
				}
			},
			{
				id: 7,
				i: 'revenue-attainment',
				type: 'graph',
				label: 'Revenue Attainment',
				value: {
					labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
					datasets: [
						{
							label: 'Revenue in USD',
							data: [
								194.32539741666267, 225.39510822766294, 599.9450792102639, 710.1919942367032,
								715.4359965834182, 968.3122686809035, 1212.606583970332
							],
							backgroundColor: '#0254f2'
						}
					]
				},
				layout: {
					position: {
						x: 2,
						y: 1,
						w: 2,
						h: 2
					}
				}
			}
		]
	},
	{
		id: 3,
		config: {},
		type: 'report',
		label: 'ARR Analysis',
		data: [
			{id: 1, customer: 'Roodra Lata', address: 'Hyderabad', revenue: 84737},
			{id: 2, customer: 'Jayadeva Bakshi', address: 'Bhubaneswar', revenue: 75091},
			{id: 3, customer: 'Madhava Achaval', address: 'Gwalior', revenue: 71329},
			{id: 4, customer: 'Srijan Tavade', address: 'Solapur', revenue: 55576},
			{id: 5, customer: 'Raghu Jagatap', address: 'Salem', revenue: 83975},
			{id: 6, customer: 'Akshey Ashtikar', address: 'Noida', revenue: 72488},
			{id: 7, customer: 'Krishan Mukhtar', address: 'Salem', revenue: 73745},
			{id: 8, customer: 'Purshottama Navathe', address: 'Raipur', revenue: 87188},
			{id: 9, customer: 'Ragunath Bhaumik', address: 'Mangaluru', revenue: 71242},
			{id: 10, customer: 'Yogarasa Mahanta', address: 'Noida', revenue: 65837},
			{id: 11, customer: 'Shudraka Deshmukh', address: 'Saharanpur', revenue: 85448},
			{id: 12, customer: 'Amitabh Panda', address: 'Kurnool', revenue: 98931},
			{id: 13, customer: 'Sahadeva Viswan', address: 'Asansol', revenue: 81585},
			{id: 14, customer: 'Bhima Sarkar', address: 'Kanpur', revenue: 68271},
			{id: 15, customer: 'Vishnu Kamal', address: 'Indore', revenue: 50015},
			{id: 16, customer: 'Hira Bhattacharya', address: 'Hubli-Dharwad', revenue: 81048},
			{id: 17, customer: 'Viswamitra Holkar', address: 'Saharanpur', revenue: 54159},
			{id: 18, customer: 'Hira Ayyangar', address: 'Ajmer', revenue: 82593},
			{id: 19, customer: 'Vishnu Munshi', address: 'Vijayawada', revenue: 74993},
			{id: 20, customer: 'Vakpati Heravdakar', address: 'Amravati', revenue: 77388},
			{id: 21, customer: 'Manas Nancy', address: 'Nanded-Waghala', revenue: 73478},
			{id: 22, customer: 'Ayaan Marwah', address: 'Nanded-Waghala', revenue: 55219},
			{id: 23, customer: 'Katyayana Ashtekar', address: 'Meerut', revenue: 97963},
			{id: 24, customer: 'Prakash Heravdakar', address: 'Noida', revenue: 76620},
			{id: 25, customer: 'Ishwar Parekh', address: 'Jhansi', revenue: 55075},
			{id: 26, customer: 'Daksh Thakre', address: 'Raurkela', revenue: 74700},
			{id: 27, customer: 'Vakpati Parachure', address: 'Vasai-Virar', revenue: 94295},
			{id: 28, customer: 'Prakash Gupta', address: 'Moradabad', revenue: 63304},
			{id: 29, customer: 'Vinod Dalavi', address: 'Agartala', revenue: 76416},
			{id: 30, customer: 'Prashant Satavelekar', address: 'Jamshedpur', revenue: 77181},
			{id: 31, customer: 'Jawahar Chopade', address: 'Siliguri', revenue: 76934},
			{id: 32, customer: 'Chhotu Padhya', address: 'Ahmedabad', revenue: 52718},
			{id: 33, customer: 'Asha Prabhu', address: 'Kalyan-Dombivali', revenue: 79957},
			{id: 34, customer: 'Dhule Bhagat', address: 'Kalyan-Dombivali', revenue: 56424},
			{id: 35, customer: 'Rahul Bhaumik', address: 'Pondicherry', revenue: 80454},
			{id: 36, customer: 'Chunder Banahatti', address: 'Coimbatore', revenue: 65443},
			{id: 37, customer: 'Ravi Parikh', address: 'Meerut', revenue: 51696},
			{id: 38, customer: 'Akshey Mallaya', address: 'Bhagalpur', revenue: 54961},
			{id: 39, customer: 'Benegal Heravdakar', address: 'Agra', revenue: 88417},
			{id: 40, customer: 'Venkata Dayal', address: 'Jhansi', revenue: 77442},
			{id: 41, customer: 'Amish Deshmukh', address: 'Tirunelveli', revenue: 99448},
			{id: 42, customer: 'Kanada Ayyangar', address: 'Thiruvananthapuram', revenue: 69745},
			{id: 43, customer: 'Hala Thakre', address: 'Solapur', revenue: 67126},
			{id: 44, customer: 'Navneet Nayar', address: 'Saharanpur', revenue: 69849},
			{id: 45, customer: 'Daas Nijasure', address: 'Udaipur', revenue: 54156},
			{id: 46, customer: 'Ranjit Dayal', address: 'Bengaluru', revenue: 91920},
			{id: 47, customer: 'Panini Sirasikar', address: 'Jodhpur', revenue: 63784},
			{id: 48, customer: 'Rahul Pande', address: 'Varanasi', revenue: 71647},
			{id: 49, customer: 'Dyal Sanyal', address: 'Madurai', revenue: 79423},
			{id: 50, customer: 'Dhule Gurnani', address: 'Noida', revenue: 65708}
		]
	},
	{
		id: 4,
		config: {},
		type: 'report',
		label: 'MIS Report',
		data: [
			{id: 1, customer: 'Anya Bhate', address: 'Faridabad', revenue: 91415},
			{id: 2, customer: 'Shambhavi Shevade', address: 'Bhilai Nagar', revenue: 58287},
			{id: 3, customer: 'Sadhana Rajavade', address: 'Varanasi', revenue: 56079},
			{id: 4, customer: 'Karuna Talavalakar', address: 'Raurkela', revenue: 90283},
			{id: 5, customer: 'Sadhana Choraghad', address: 'Guntur', revenue: 94346},
			{id: 6, customer: 'Vayu Devadhikar', address: 'Asansol', revenue: 62635},
			{id: 7, customer: 'Uma Sharma', address: 'Chandigarh', revenue: 73995},
			{id: 8, customer: 'Durgawati Adhya', address: 'Tirunelveli', revenue: 54595},
			{id: 9, customer: 'Shinu Punja', address: 'Bhiwandi', revenue: 78655},
			{id: 10, customer: 'Shakuntala Ayyar', address: 'Bhagalpur', revenue: 72066},
			{id: 11, customer: 'Kalyani Ganapuli', address: 'Sangli', revenue: 54245},
			{id: 12, customer: 'Durga Limbu', address: 'Sangli', revenue: 81202},
			{id: 13, customer: 'Shalini Satavelekar', address: 'Akola', revenue: 78482},
			{id: 14, customer: 'Rekha Adwani', address: 'Meerut', revenue: 50869},
			{id: 15, customer: 'Chhaya Phadatare', address: 'Kalyan-Dombivali', revenue: 58446},
			{id: 16, customer: 'Nutan Rajavade', address: 'Bikaner', revenue: 76951},
			{id: 17, customer: 'Kalyani Shrivastav', address: 'Faridabad', revenue: 76024},
			{id: 18, customer: 'Ruhi Khamavant', address: 'Pondicherry', revenue: 92595},
			{id: 19, customer: 'Kavuri Gayakvad', address: 'Bikaner', revenue: 68690},
			{id: 20, customer: 'Shreya Bajpeyi', address: 'Jammu', revenue: 58560},
			{id: 21, customer: 'Indu Ojha', address: 'Asansol', revenue: 94725},
			{id: 22, customer: 'Satya Bhardvaj', address: 'Bhubaneswar', revenue: 57923},
			{id: 23, customer: 'Chandika Bhate', address: 'Ahmedabad', revenue: 52791},
			{id: 24, customer: 'Rani Mudaliyar', address: 'Vadodara', revenue: 61149},
			{id: 25, customer: 'Durgawati Vad', address: 'Bhopal', revenue: 60774},
			{id: 26, customer: 'Krishna Chaudhari', address: 'Jhansi', revenue: 65006},
			{id: 27, customer: 'Padmini Lata', address: 'Malegaon', revenue: 72948},
			{id: 28, customer: 'Aasiya Satavelekar', address: 'Dehradun', revenue: 53657},
			{id: 29, customer: 'Kasturbai Divekar', address: 'Raipur', revenue: 77863},
			{id: 30, customer: 'Jyoti Kayal', address: 'Patna', revenue: 83087},
			{id: 31, customer: 'Bumati Divekar', address: 'Visakhapatnam', revenue: 98447},
			{id: 32, customer: 'Radha Kusari', address: 'Meerut', revenue: 67402},
			{id: 33, customer: 'Ananya Pande', address: 'Kochi', revenue: 59933},
			{id: 34, customer: 'Durgautti Marwah', address: 'Bhubaneswar', revenue: 61694},
			{id: 35, customer: 'Shreya Gayakvad', address: 'Allahabad', revenue: 91075},
			{id: 36, customer: 'Ananya Kumar', address: 'Mira-Bhayandar', revenue: 96942},
			{id: 37, customer: 'Salani Bajpai', address: 'Bikaner', revenue: 70051},
			{id: 38, customer: 'Cheeno Nambiyar', address: 'Indore', revenue: 86033},
			{id: 39, customer: 'Jayanti Ahuja', address: 'Agra', revenue: 88362},
			{id: 40, customer: 'Jindan Bhatta', address: 'Jaipur', revenue: 76847},
			{id: 41, customer: 'Karuna Upalekar', address: 'Jabalpur', revenue: 50937},
			{id: 42, customer: 'Parvati Nambiyar', address: 'Udaipur', revenue: 88644},
			{id: 43, customer: 'Sukanya Mahanta', address: 'Jalandhar', revenue: 71721},
			{id: 44, customer: 'Kareena Pandya', address: 'Hubli-Dharwad', revenue: 56057},
			{id: 45, customer: 'Kumari Munshi', address: 'Bikaner', revenue: 82455},
			{id: 46, customer: 'Sarama Dalavi', address: 'Udaipur', revenue: 54900},
			{id: 47, customer: 'Manasa Panja', address: 'Nellore', revenue: 59811},
			{id: 48, customer: 'Indira Bhatavadekar', address: 'Aligarh', revenue: 55619},
			{id: 49, customer: 'Shristi Nayar', address: 'Visakhapatnam', revenue: 69296},
			{id: 50, customer: 'Durgautti Chitanis', address: 'Kozhikode', revenue: 52010}
		]
	}
];

let i = 1;
export const DAILY = 'DAILY';
export const WEEKLY = 'WEEKLY';
export const MONTHLY = 'MONTHLY';
export const YEARLY = 'YEARLY';
export const templateVersionOptions = [
	{
		id: i++,
		name: 'Accrued Revenue',
		schema: {
			headers: 1,
			skipRows: 0,
			emptyCells: true,
			columns: []
		},
		frequency: MONTHLY,
		buffer: 5,
		downloadPath: '/templates/unearned-revenue.xlsx'
	},
	{
		id: i++,
		name: 'Unbilled Revenue',
		schema: {
			headers: 2,
			skipRows: 0,
			emptyCells: true,
			columns: []
		},
		frequency: MONTHLY,
		buffer: 5,
		downloadPath: '/templates/unbilled-revenue.xlsx'
	},
	{
		id: i++,
		name: 'Billing Sheet',
		schema: {
			headers: 2,
			skipRows: 0,
			emptyCells: true,
			columns: []
		},
		frequency: 'YEARLY',
		buffer: 5,
		downloadPath: '/templates/billing-sheet.xlsx'
	},
	{
		id: i++,
		name: "Billing Sheet MAU's",
		schema: {
			headers: 1,
			skipRows: 0,
			emptyCells: true,
			columns: []
		},
		frequency: 'YEARLY',
		buffer: 5,
		downloadPath: '/templates/billing-sheet-mau.xlsx'
	},
	{
		id: i++,
		name: 'Booking To Invoicing',
		schema: {
			headers: 1,
			skipRows: 0,
			emptyCells: true,
			columns: []
		},
		frequency: 'YEARLY',
		buffer: 5,
		downloadPath: '/templates/booking-to-invoicing.xlsx'
	},
	{
		id: i++,
		name: 'Cost Moengage',
		schema: {
			headers: 1,
			skipRows: 0,
			emptyCells: true,
			columns: []
		},
		frequency: 'YEARLY',
		buffer: 5,
		downloadPath: '/templates/cost-moengage.xlsx'
	},
	{
		id: i++,
		name: 'New Agreements',
		schema: {
			headers: 3,
			skipRows: 0,
			emptyCells: true,
			columns: []
		},
		frequency: 'YEARLY',
		buffer: 5,
		downloadPath: '/templates/new-agreements.xlsx'
	},
	{
		id: i++,
		name: 'Pricing Terms',
		schema: {
			headers: 3,
			skipRows: 0,
			emptyCells: true,
			columns: []
		},
		frequency: 'YEARLY',
		buffer: 5,
		downloadPath: '/templates/pricing-terms.xlsx'
	},
	{
		id: i++,
		name: 'Recently Signed',
		schema: {
			headers: 1,
			skipRows: 0,
			emptyCells: true,
			columns: []
		},
		frequency: 'YEARLY',
		buffer: 5,
		downloadPath: '/templates/recently-signed.xlsx'
	}
];
