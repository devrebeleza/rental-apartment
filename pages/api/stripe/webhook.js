import prisma from 'lib/prisma';
import getRawBody from 'raw-body';

export const config = {
	api: {
		bodyParser: false,
	},
};

const handler = async (req, res) => {
	if (req.method !== 'POST') return res.status(405).end();

	const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

	const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
	const sig = req.headers['stripe-signature'];

	const rawBody = await getRawBody(req, {
		encoding: 'utf-8',
	});

	let event;

	try {
		event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
	} catch (err) {
		res.writeHead(400, {
			'Content-type': 'application/json',
		});
		console.error(err.messagge);
		res.end(
			JSON.stringify({
				status: 'success',
				messagge: `Webhook Error: ${err.messagge}`,
			})
		);
		return;
	}

	if (event.type === 'checkout.session.completed') {
		const sessionId = event.data.object.id;

		const email = event.data.object.customer_details.email;
		try {
			const booking = await prisma.booking.findFirst({
				where: { sessionId },
			});

			await prisma.booking.updateMany({
				data: {
					paid: true,
					sessionId: '',
					email,
				},
				where: { sessionId },
			});
		} catch (err) {
			console.error(err);
		}
	}

	res.writeHead(200, {
		'Content-type': 'application/json',
	});

	res.end(JSON.stringify({ received: true }));
};
export default handler;
