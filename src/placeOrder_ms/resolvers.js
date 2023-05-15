import { generalRequest, getRequest ,getCartInfoRequest } from '../utilities';
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
		createBill: async (_, { idCliente}) => {
			
			let BillTemplate = await getCartInfoRequest(idCliente)
			let variable =BillTemplate.items.map((item) => {
				return {
					"idProduct": item.itemId,
					"name": item.name,
					"price": item.price,
					"quantity": item.quantity
				}
			})
			let variable2 = {
				"idCliente": idCliente,
				"user":idCliente,
				"date": new Date().toISOString(),
				"products": variable}

			console.log(variable2)
			let bill = await generalRequest(`${URL}/bill`, 'POST', variable2)
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
