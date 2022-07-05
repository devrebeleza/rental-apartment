import Head from 'next/head';
import Link from 'next/link';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function Calendar() {
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
						<DayPicker />
					</div>
				</div>
			</div>
		</div>
	);
}
