# Implement payment via Stripe

Now let’s set up our site to accept payments.

I assume you already have Stripe set up from the past project.

If not, go back to the past project to see how we did it.

Install the Stripe and `raw-body` libraries using this command in the terminal:

```bash
npm install stripe raw-body
```

We’ll need `raw-body` to handle the Stripe webhook.

Now add to the `.env` file the environment variables we need for Stripe:

```jsx
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
BASE_URL=http://localhost:3000
STRIPE_WEBHOOK_SECRET=
```

Fill your Stripe public and secret keys, you can find them in your Stripe dashboard.

In a separate terminal, run the command

```jsx
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

to set up webhooks and get the webhook secret key to paste in `.env` as the value of `STRIPE_WEBHOOK_SECRET`.

Remember to restart `npm run dev` after this `.env` change.

Now, add the Stripe frontend to the `pages/calendar.js` page:

```jsx
//...

export default function Calendar() {
  //...

  return (
    <div>
      <Head>
        <title>Rental Apartment</title>
        <meta name='description' content='Rental Apartment Website' />
        <link rel='icon' href='/favicon.ico' />
        **<script src='https://js.stripe.com/v3/'></script>**
      </Head>
```

If people selected nights, after the reset button we now show a “Book now” button:

```jsx
{
	numberOfNights > 0 && <button className='bg-green-500 text-white mt-5 mx-auto w-40 px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm  sm:px-8'>Book now</button>;
}
```

When people click the button, we make an API call to `/api/stripe/session` like we did in the previous project to initiate a Stripe request:

```jsx
{
	numberOfNights > 0 && (
		<button
			className='bg-green-500 text-white mt-5 mx-auto w-40 px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm  sm:px-8'
			onClick={async () => {
				const res = await fetch('/api/stripe/session', {
					body: JSON.stringify({
						from,
						to,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'POST',
				});

				//SOON
			}}>
			Book now
		</button>
	);
}
```

In `pages/api/stripe/session.js` we first calculate the cost of stay server-side from the `from` and `to` parameters passed in the body, and we initiate a Stripe request:

```jsx
import prisma from 'lib/prisma';
import { calcTotalCostOfStay } from 'lib/cost';

export default async (req, res) => {
	if (req.method !== 'POST') {
		res.status(405).end(); //Method Not Allowed
		return;
	}

	const amount = calcTotalCostOfStay(new Date(req.body.from), new Date(req.body.to)) * 100;

	const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
	const stripe_session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [
			{
				name: 'Purchase nights from ' + new Date(req.body.from).toDateString() + ' to ' + new Date(req.body.to).toDateString(),
				amount: amount,
				currency: 'usd',
				quantity: 1,
			},
		],
		success_url: process.env.BASE_URL + '/success',
		cancel_url: process.env.BASE_URL + '/calendar',
	});

	//SOON
};
```

Then we create a booking with the price and dates, the Stripe session id, set as unpaid.

Then we send some data back to the client:

```jsx
import prisma from 'lib/prisma'
import { calcTotalCostOfStay } from 'lib/cost'

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end() //Method Not Allowed
    return
  }

  const amount =
    calcTotalCostOfStay(new Date(req.body.from), new Date(req.body.to)) * 100

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
  const stripe_session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        name:
          'Purchase nights from ' +
          new Date(req.body.from).toDateString() +
          ' to ' +
          new Date(req.body.to).toDateString(),
        amount: amount,
        currency: 'usd',
        quantity: 1,
      },
    ],
    success_url: process.env.BASE_URL + '/success',
    cancel_url: process.env.BASE_URL + '/calendar',
  })

  **await prisma.booking.create({
    data: {
      price: amount,
      sessionId: stripe_session.id,
      from: req.body.from,
      to: req.body.to,
    },
  })

  res.writeHead(200, {
    'Content-Type': 'application/json',
  })

  res.end(
    JSON.stringify({
      status: 'success',
      sessionId: stripe_session.id,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
    })
  )**
}
```

In the client side, in `pages/calendar.js`, we get this data and we redirect to Stripe so they can handle the payment:

```jsx
{
	numberOfNights > 0 && (
		<button
			className='bg-green-500 text-white mt-5 mx-auto w-40 px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm  sm:px-8'
			onClick={async () => {
				const res = await fetch('/api/stripe/session', {
					body: JSON.stringify({
						from,
						to,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'POST',
				});
				const data = await res.json();
				const sessionId = data.sessionId;
				const stripePublicKey = data.stripePublicKey;

				const stripe = Stripe(stripePublicKey);
				const { error } = await stripe.redirectToCheckout({
					sessionId,
				});

				if (error) console.log(error);
			}}>
			Book now
		</button>
	);
}
```

![Screen Shot 2022-03-22 at 15.03.04.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/673a89dc-6595-4ee7-8040-835a80dee833/Screen_Shot_2022-03-22_at_15.03.04.png)

![Screen Shot 2022-03-22 at 15.02.49.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/012bacd5-8250-4de8-b18a-e684747d1c38/Screen_Shot_2022-03-22_at_15.02.49.png)

As usual with testing Stripe, you can use the `4242 4242 4242 4242` card and use any expiration date and CVC, and email/name.

When the payment is done, we redirect the user to the `/success` URL, which we handle with the page `pages/success.js`:

```jsx
import Head from 'next/head';
import Link from 'next/link';

export default function Success() {
	return (
		<div>
			<Head>
				<title>Rental Apartment</title>
				<meta name='description' content='Rental Apartment Website' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='relative overflow-hidden'>
				<div className='relative'>
					<div className='absolute inset-x-0 bottom-0 h-1/2 bg-gray-100'></div>
					<div className=''>
						<div className='relative shadow-xl  sm:overflow-hidden'>
							<div className='absolute inset-0'>
								<img className='h-full w-full object-cover' src='/img/1.jpeg' />
								<div className='absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 mix-blend-multiply'></div>
							</div>
							<div className='relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8  bg-gray-800/80'>
								<h1 className='text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
									<span className='block text-white'>Successfully booked!</span>
								</h1>
								<h2 className='text-center text-2xl font-normal tracking-tight mt-10'>
									<span className='block text-gray-300'>You will receive an email with all the details</span>
								</h2>
								<div className='mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center'>
									<div className='space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5'>
										<Link href={`/`}>
											<a className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-indigo-50 sm:px-8'>
												⬅ Back to the house details
											</a>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
```

In the meantime Stripe sends us a webhook, that we handle in `pages/api/stripe/webhook.js`:

```jsx
import prisma from 'lib/prisma';
import getRawBody from 'raw-body';

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async (req, res) => {
	if (req.method !== 'POST') {
		res.status(405).end(); //Method Not Allowed
		return;
	}

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
			'Content-Type': 'application/json',
		});
		console.error(err.message);
		res.end(
			JSON.stringify({
				status: 'success',
				message: `Webhook Error: ${err.message}`,
			})
		);
		return;
	}

	if (event.type === 'checkout.session.completed') {
		const sessionId = event.data.object.id;

		const email = event.data.object.customer_details.email;
		try {
			const booking = await prisma.booking.findFirst({
				where: {
					sessionId,
				},
			});

			await prisma.booking.updateMany({
				data: {
					paid: true,
					sessionId: '',
					email,
				},
				where: {
					sessionId,
				},
			});
		} catch (err) {
			console.error(err);
		}
	}

	res.writeHead(200, {
		'Content-Type': 'application/json',
	});
	res.end(JSON.stringify({ received: true }));
};
```

[11. Implement payment via Stripe.mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9170b756-5551-456b-abdc-414c5a21da47/11._Implement_payment_via_Stripe.mp4)

Next lesson: [Send confirmation emails](https://www.notion.so/Send-confirmation-emails-13b778f8fcab453994df5c32dbf069ab)
