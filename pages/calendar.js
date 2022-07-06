import Head from 'next/head';
import Link from 'next/link';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { addDayToRange, getBlockedDates, getCost, getDatesBetweenDates, isDaySelectable, monthsFromNow, yesterDay } from 'lib/dates';
import { useState } from 'react';
import { getBookedDates } from 'lib/booking';

export default function Calendar() {
	const [from, setFrom] = useState();
	const [to, setTo] = useState();
	const monthsBefore = 6; // months before to disable dates

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
	};

	return (
		<div>
			<Head>
				<title>Rental Apartment - Calendar</title>
				<meta name='description' content='Rental Apartment Website' />
				<link rel='icon' href='/favicon.ico' />
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
