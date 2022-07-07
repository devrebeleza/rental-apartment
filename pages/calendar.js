import Head from 'next/head';
import Link from 'next/link';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { addDayToRange, calcNumberofNightsBetweenDates, calcTotalCostOfStay, getBlockedDates, getCost, getDatesBetweenDates, isDaySelectable, monthsFromNow, yesterDay } from 'lib/dates';
import { useState } from 'react';
import { getBookedDates } from 'lib/booking';

export default function Calendar() {
	const [from, setFrom] = useState();
	const [to, setTo] = useState();
	const monthsBefore = 6; // months before to disable dates
	const [numberOfNights, setNumberOfNights] = useState(0);
	const [totalCost, setTotalCost] = useState(0);

	const handleDayClick = (day) => {
		const range = addDayToRange(day, { from, to });

		if (!range.to) {
			if (!isDaySelectable(range.from)) {
				alert('This date cannot be selected');
				return;
			}
			range.to = range.from;
		}

		if (range.to && range.from) {
			if (!isDaySelectable(range.to)) {
				alert('The end date cannot be selected');
				return;
			}
		}

		const daysInBeetween = getDatesBetweenDates(range.from, range.to);

		for (const dayInBeetween of daysInBeetween) {
			if (!isDaySelectable(dayInBeetween)) {
				alert('Some days between those 2 dates cannot be selected');
				return;
			}
		}

		setFrom(range.from);
		setTo(range.to);

		if (!range.from) {
			setNumberOfNights(0);
			setTotalCost(0);
		} else {
			setNumberOfNights(calcNumberofNightsBetweenDates(range.from, range.to) + 1);
			setTotalCost(calcTotalCostOfStay(range.from, range.to));
		}
	};

	const bookNow = async () => {
		const res = await fetch('/api/stripe/session', {
			body: JSON.stringify({
				from,
				to,
			}),
			headers: {
				'Content-type': 'application/json',
			},
			method: 'POST',
		});

		const data = await res.json();
		const sessionId = data.sessionId;
		const stripePublicKey = data.stripePublicKey;

		const stripe = Stripe(stripePublicKey);
		const { error } = await stripe.redirectToCheckout({ sessionId });

		if (error) console.log(error);
	};

	return (
		<div>
			<Head>
				<title>Rental Apartment - Calendar</title>
				<meta name='description' content='Rental Apartment Website' />
				<link rel='icon' href='/favicon.ico' />
				<script src='https://js.stripe.com/v3' async></script>
			</Head>

			<div className='relative overflow-hidden'>
				<div className='relative'>
					<div className='absolute inset-x-0 bottom-0 h-1/2 bg-gray-100'></div>
					<div>
						<div className='relative shadow-xl sm:overflow-hidden'>
							<div className='absolute inset-0'>
								<img src='/img/1.jpg' className='h-full w-full object-cover' />
								<div className='absolute  bg-gradient-to-r from-gray-100 to-gray-200 mix-blend-mutiply'></div>
							</div>
							<div className='relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8 bg-gray-800/80'>
								<h1 className='text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
									A Charming Dome House
									<span className='block text-gray-300'> in the Argentine Patagonia</span>
								</h1>
								<div className='mt-10 mx-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center'>
									<div className='space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5'>
										<Link href={'/'}>
											<a className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-blue-50 sm:px-8'>
												⬅ Back to the house details
											</a>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col mt-10'>
					<p className='text-2xl font-bold text-center my-10'>Availability and prices per night</p>
					<p className='text-center'>{numberOfNights > 0 && `Stay for ${numberOfNights} nights`}</p>
					<p className='text-center mt-2'>{totalCost > 0 && `Total cost: ${totalCost}`}</p>
					<p className='text-center'>
						{from && to && (
							<button
								className='border px-2 py-1 mt-4'
								onClick={() => {
									setFrom(null);
									setTo(null);
									setNumberOfNights(0);
									setTotalCost(0);
								}}>
								Reset
							</button>
						)}
						{numberOfNights > 0 && (
							<button className='bg-green-500 text-white mt-5 mx-auto w-40 px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm sm:px-8 ml-3' onClick={async () => bookNow()}>
								Book now
							</button>
						)}
					</p>
					<div className='flex justify-center pt-6 availability-calendar'>
						<DayPicker
							components={{
								DayContent: (props) => (
									<div className={`relative text-right ${!isDaySelectable(props.date) && 'text-gray-500'}`}>
										<div>{props.date.getDate()}</div>
										{isDaySelectable(props.date) && (
											<div className='-mt-2 '>
												<span className={`bg-white text-black rounded-md  font-bold px-1 text-xs`}>${getCost(props.date)}</span>
											</div>
										)}
									</div>
								),
							}}
							selected={[from, { from, to }]}
							modifiers={{ start: from, end: to }}
							onDayClick={handleDayClick}
							// mode='range'
							disabled={[...getBlockedDates(), ...getBookedDates(), { from: new Date('0000'), to: yesterDay() }, { from: monthsFromNow(monthsBefore), to: new Date('4000') }]}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
