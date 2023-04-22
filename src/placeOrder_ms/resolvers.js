import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		historyByClientId: (_, { idCliente }) =>//historial de facturas de un cliente
			generalRequest(`${URL}/history/${idCliente}`, 'GET'),
		allBills: (_) =>//todas las facturas
			generalRequest(`${URL}/bill`, 'GET'),
		billById: (_, { idBill }) =>//una factura en especifico
			generalRequest(`${URL}/bill/${idBill}`, 'GET'),
	},
	Mutation: {
		createBill: (_, { idCliente }) =>
			generalRequest(`${URL}/bill`, 'POST', { "idCliente": 15,
			"date": "2023-05-11T12:30:00Z",
			"user": "malejaja",
			"state": "Pendiente",
			"products": [
			  {
				"idProduct": 1,
				"name": "Papas",
				"description": "",
				"price": 23.4,
				"quantity": 10
			  },
			  {
				"idProduct": 3,
				"name": "Pescado",
				"description": "",
				"price": 25.4,
				"quantity": 4
			  }
			]}),
			updateStateBill: (_, { idBill, state }) =>
			generalRequest(`${URL}/bill/${idBill}`, 'PUT', { "idBill": idBill, "state": state }),
		deleteBill: (_, { idBill }) =>
			generalRequest(`${URL}/bill/${idBill}`, 'DELETE')
			
		
	

			/*

		updateCategory: (_, { id, category }) =>
			generalRequest(`${URL}/${id}`, 'PUT', category),
		deleteCategory: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
			*/
	}
};

export default resolvers;
