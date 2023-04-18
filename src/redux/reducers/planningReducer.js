import {SET_EDITABLE_PARAMS, SET_PLANNING_DATA} from '../actions/actionConstants';

const sampleData = [
	{id: 1, customer: 'Anya Bhate', address: 'Faridabad', revenue: 91415, term: 12, rate: 1244},
	{id: 2, customer: 'Shambhavi Shevade', address: 'Bhilai Nagar', revenue: 58287, term: 12, rate: 1244},
	{id: 3, customer: 'Sadhana Rajavade', address: 'Varanasi', revenue: 56079, term: 12, rate: 1244},
	{id: 4, customer: 'Karuna Talavalakar', address: 'Raurkela', revenue: 90283, term: 12, rate: 1244},
	{id: 5, customer: 'Sadhana Choraghad', address: 'Guntur', revenue: 94346, term: 12, rate: 1244},
	{id: 6, customer: 'Vayu Devadhikar', address: 'Asansol', revenue: 62635, term: 12, rate: 1244},
	{id: 7, customer: 'Uma Sharma', address: 'Chandigarh', revenue: 73995, term: 12, rate: 1244},
	{id: 8, customer: 'Durgawati Adhya', address: 'Tirunelveli', revenue: 54595, term: 12, rate: 1244},
	{id: 9, customer: 'Shinu Punja', address: 'Bhiwandi', revenue: 78655, term: 12, rate: 1244},
	{id: 10, customer: 'Shakuntala Ayyar', address: 'Bhagalpur', revenue: 72066, term: 12, rate: 1244},
	{id: 11, customer: 'Kalyani Ganapuli', address: 'Sangli', revenue: 54245, term: 12, rate: 1244},
	{id: 12, customer: 'Durga Limbu', address: 'Sangli', revenue: 81202, term: 12, rate: 1244},
	{id: 13, customer: 'Shalini Satavelekar', address: 'Akola', revenue: 78482, term: 12, rate: 1244},
	{id: 14, customer: 'Rekha Adwani', address: 'Meerut', revenue: 50869, term: 12, rate: 1244},
	{id: 15, customer: 'Chhaya Phadatare', address: 'Kalyan-Dombivali', revenue: 58446, term: 12, rate: 1244},
	{id: 16, customer: 'Nutan Rajavade', address: 'Bikaner', revenue: 76951, term: 12, rate: 1244},
	{id: 17, customer: 'Kalyani Shrivastav', address: 'Faridabad', revenue: 76024, term: 12, rate: 1244},
	{id: 18, customer: 'Ruhi Khamavant', address: 'Pondicherry', revenue: 92595, term: 12, rate: 1244},
	{id: 19, customer: 'Kavuri Gayakvad', address: 'Bikaner', revenue: 68690, term: 12, rate: 1244},
	{id: 20, customer: 'Shreya Bajpeyi', address: 'Jammu', revenue: 58560, term: 12, rate: 1244},
	{id: 21, customer: 'Indu Ojha', address: 'Asansol', revenue: 94725, term: 12, rate: 1244},
	{id: 22, customer: 'Satya Bhardvaj', address: 'Bhubaneswar', revenue: 57923, term: 12, rate: 1244},
	{id: 23, customer: 'Chandika Bhate', address: 'Ahmedabad', revenue: 52791, term: 12, rate: 1244},
	{id: 24, customer: 'Rani Mudaliyar', address: 'Vadodara', revenue: 61149, term: 12, rate: 1244},
	{id: 25, customer: 'Durgawati Vad', address: 'Bhopal', revenue: 60774, term: 12, rate: 1244},
	{id: 26, customer: 'Krishna Chaudhari', address: 'Jhansi', revenue: 65006, term: 12, rate: 1244},
	{id: 27, customer: 'Padmini Lata', address: 'Malegaon', revenue: 72948, term: 12, rate: 1244},
	{id: 28, customer: 'Aasiya Satavelekar', address: 'Dehradun', revenue: 53657, term: 12, rate: 1244},
	{id: 29, customer: 'Kasturbai Divekar', address: 'Raipur', revenue: 77863, term: 12, rate: 1244},
	{id: 30, customer: 'Jyoti Kayal', address: 'Patna', revenue: 83087, term: 12, rate: 1244},
	{id: 31, customer: 'Bumati Divekar', address: 'Visakhapatnam', revenue: 98447, term: 12, rate: 1244},
	{id: 32, customer: 'Radha Kusari', address: 'Meerut', revenue: 67402, term: 12, rate: 1244},
	{id: 33, customer: 'Ananya Pande', address: 'Kochi', revenue: 59933, term: 12, rate: 1244},
	{id: 34, customer: 'Durgautti Marwah', address: 'Bhubaneswar', revenue: 61694, term: 12, rate: 1244},
	{id: 35, customer: 'Shreya Gayakvad', address: 'Allahabad', revenue: 91075, term: 12, rate: 1244},
	{id: 36, customer: 'Ananya Kumar', address: 'Mira-Bhayandar', revenue: 96942, term: 12, rate: 1244},
	{id: 37, customer: 'Salani Bajpai', address: 'Bikaner', revenue: 70051, term: 12, rate: 1244},
	{id: 38, customer: 'Cheeno Nambiyar', address: 'Indore', revenue: 86033, term: 12, rate: 1244},
	{id: 39, customer: 'Jayanti Ahuja', address: 'Agra', revenue: 88362, term: 12, rate: 1244},
	{id: 40, customer: 'Jindan Bhatta', address: 'Jaipur', revenue: 76847, term: 12, rate: 1244},
	{id: 41, customer: 'Karuna Upalekar', address: 'Jabalpur', revenue: 50937, term: 12, rate: 1244},
	{id: 42, customer: 'Parvati Nambiyar', address: 'Udaipur', revenue: 88644, term: 12, rate: 1244},
	{id: 43, customer: 'Sukanya Mahanta', address: 'Jalandhar', revenue: 71721, term: 12, rate: 1244},
	{id: 44, customer: 'Kareena Pandya', address: 'Hubli-Dharwad', revenue: 56057, term: 12, rate: 1244},
	{id: 45, customer: 'Kumari Munshi', address: 'Bikaner', revenue: 82455, term: 12, rate: 1244},
	{id: 46, customer: 'Sarama Dalavi', address: 'Udaipur', revenue: 54900, term: 12, rate: 1244},
	{id: 47, customer: 'Manasa Panja', address: 'Nellore', revenue: 59811, term: 12, rate: 1244},
	{id: 48, customer: 'Indira Bhatavadekar', address: 'Aligarh', revenue: 55619, term: 12, rate: 1244},
	{id: 49, customer: 'Shristi Nayar', address: 'Visakhapatnam', revenue: 69296, term: 12, rate: 1244},
	{id: 50, customer: 'Durgautti Chitanis', address: 'Kozhikode', revenue: 52010, term: 12, rate: 1244}
];

const initialState = {
	editableParams: {},
	data: sampleData
};

export default function planningReducer(state = initialState, action) {
	switch (action.type) {
		case SET_EDITABLE_PARAMS: {
			if (isNaN(action.payload.value)) return state;
			return {
				...state,
				editableParams: {...state.editableParams, [action.payload.name]: action.payload.value}
			};
		}
		case SET_PLANNING_DATA:
			return {...state, data: action.payload.data};
		default:
			return state;
	}
}
