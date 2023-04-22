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
		createBill: (_, { BillTemplate }) => {
			console.log(BillTemplate)
			let bill = generalRequest(`${URL}/bill`, 'POST', BillTemplate)
			console.log(bill)
			return bill
		},
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
