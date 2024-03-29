import Head from 'next/head';
import Link from 'next/link';

const mockReviews = [
	{
		text: `We absolutely loved to stay at Ivana's place. She's an extremely welcoming host and takes care of every detail - clear communication, a spotless and well-equipped apartment, a home-made cake to welcome the guests and much more! We could not have had a better time in Valtellina and will surely stay with Ivana again on our next visit to Morbegno. Highly recommended!`,
		author: 'Stefan',
		date: 'Nov 2021',
	},
	{
		text: `Ivana was a very caring and sweet host. The hospitality goes beyond imagination. She welcomed us with a fabulous cake, a couple of beers, sodas, milk, butter and a bottle of local red wine. The place is highly recommended.`,
		author: 'Tomáš',
		date: 'Oct 2021',
	},
	{
		text: `Fantastic accommodation, highly recommended for a quiet stay surrounded by stunning views with plenty of active options for walking and cycling. Ivana is a wonderful host!`,
		author: 'Ross',
		date: 'Oct 2021',
	},
];

const mockDestinations = [
	{
		name: 'Circuito Chico',
		description: '60km, 55 minutes by car',
		src: '/img/circuito_chico.png',
	},
	{
		name: 'Cerro Campanario',
		description: '25km, 15 minutes by car',
		src: '/img/campanario.jpg',
	},
	{
		name: 'Cerro Catedral',
		description: '5 minutes walking, in winter ski or snowboard, in summer trekking ',
		src: '/img/catedral.jpeg',
	},
	{
		name: 'National Park Los Arrayanes',
		description: '35km, 37 minutes by boat',
		src: '/img/arrayanes.jpg',
	},
	{
		name: 'Lago Traful y bosque inundado',
		description: '92km, 1h 52m by car',
		src: '/img/traful-2.jpg',
	},
	{
		name: 'Colonia Suiza',
		description: '25km, 30 minutes by car',
		src: '/img/colonia_suiza.jpg',
	},
	{
		name: 'El Bolson',
		description: '130km, 1h 43 min by car',
		src: '/img/el-bolson.jpg',
	},
	{
		name: 'Villa la Angostura',
		description: '82.2km, 1h 24min by car',
		src: '/img/villa_la_angostura.jpg',
	},
];

export default function Home() {
	return (
		<div>
			<Head>
				<title>Rental Domos</title>
				<meta name='description' content='Rental Apartment website' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='relative'>
				<div className='absolute inset-0'>
					<img className='h-full w-full object-cover' src='/img/1.jpg' alt='' />
				</div>
				<div className='relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8 bg-gray-800/80'>
					<h1 className='text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
						A Charming New Domo House
						<span className='block text-gray-300'>in the Argentine Patagonia</span>
					</h1>
					<p className='mt-6 max-w-2xl mx-auto text-center text-xl'>
						Domo locate in the hamlet of Valle di Bariloche, at 800 meters of height, is 10 minutes from Bariloche. It can be reached by car and by bus from Bariloche, with a stop near the house.
						Ideal for mountain and animal lovers. Your furry friends are welcome. Equipped with heating by pellet stove, it is also possible to light the large fireplace.
					</p>
					<div className='mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm: justify-center'>
						<div>
							<Link href={`/calendar`}>
								<a
									className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm
                text-gray-700 bg-white hover:bg-gray-200 sm:px-8'>
									See availability calendar and prices
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className='pt-6'>
				<div className='mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8'>
					<div className='hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block'>
						<img src='/img/2.jpg' className='w-full h-full object-center object-cover' />
					</div>
					<div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
						<div className='aspect-w-3 aspect-h-2 rounded-lg overflow-hidden'>
							<img src='/img/3.jpg' className='w-full h-full object-center object-cover' />
						</div>
						<div className='aspect-w-3 aspect-h-2 rounded-lg overflow-hidden'>
							<img src='/img/4.jpg' className='w-full h-full object-center object-cover' />
						</div>
					</div>
					<div className='aspect-w-4 aspect-h-5 rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4'>
						<img src='/img/5.jpg' className='w-full h-full object-center object-cover' />
					</div>
				</div>
			</div>
			<div className='max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:grid lg:grid-cols-3 lg:grid-rows[auto,auto,1fr] lg:gap-x-8'>
				<div className='mt-10 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
					<div>
						<div>
							<h1 className='text-2xl font-extrabold sm:text-3xl mb-10 tracking-tight'>Details about the Domo</h1>
							<p className='text-xl'>
								Transparent roof dome to sleep under the stars and private decks, enables a new way of traveling with equal doses of security, freedom and adventure.
								<br /> Each dome has its own park of 72 square meters, with tables and chairs. En-suite domes of almost 30 square meters with views of Mount Fitz Roy and private bathroom.
								<br /> The restaurant and reception function in two community domes. To stay in a natural environment with low ecological impact.
								<br /> The luxury dome offers the possibility of sleeping in the middle of the forest with the comforts of a 5-star hotel.
								<br /> Lots of local restaurants will serve the typical and traditional foods and wines this valley is known for.
								<br />
								<br /> For the more adventurous, nearby you will find the famous Fly Emotion, fly across the valley connected to a steel cable!
							</p>
						</div>
					</div>
				</div>
				<div className='mt-10'>
					<p className='text-2xl font-bold'>Reviews</p>
					<div className='mt-6'>
						{mockReviews.map((review, index) => (
							<div className='mb-5' key={index}>
								<div>{review.text}</div>
								<div className='mt-2 text-gray-300'>
									{review.author}, {review.date}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className='relative py-16 sm:py-24 lg:py-32'>
				<div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
					<h2 className='text-base font-semibold tracking-tight uppercase'>The surroundings</h2>
					<p className='mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl'>Popular destinatios for your holidays</p>
					<p className='mt-5 max-w-prose mx-auto text-xl text-gray-300'>From challenging mountain trails to beautifull alpine lakes to cities, lots of destinatios in reach for a day trip</p>
					<div className='mt-12'>
						<div className='grid grid-cols-1 gap-8 sm:grid-cols.2 lg:grid-cols-4'>
							{mockDestinations.map((destination, index) => (
								<div className='pt-6' key={index}>
									<div className='rounded-lg px-6 pb-8'>
										<div className='-mt-6'>
											{destination.src && (
												<div className='aspect-w-4 aspect-h-5 rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4'>
													{/* <img src='/img/5.jpg' className='w-full h-full object-center object-cover' /> */}
													<img src={destination.src} alt={destination.name} className='w-full h-full object-center' />
												</div>
											)}
											<h3 className='mt-8 text-lg font-medium tracking-tight '>{destination.name}</h3>
											<p className='mt-5 text-base text-gray-400'>{destination.description}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
