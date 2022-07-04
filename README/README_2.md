# Create the homepage

The first thing I’m going to do is working on the homepage.

Here’s what we want to have at the end of this lesson:

![Screen Shot 2022-03-22 at 08.59.35.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f08f4442-2802-499d-a324-3fde4b208b7e/Screen_Shot_2022-03-22_at_08.59.35.png)

Scrolling down we see the house details, some reviews:

![Screen Shot 2022-03-22 at 08.59.27.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bbcc93ca-8dc8-4d79-9124-81864ed50a66/Screen_Shot_2022-03-22_at_08.59.27.png)

and a list of popular destinations around our house, so guests can prepare their holidays beforehand.

![Screen Shot 2022-03-22 at 08.59.23.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/550df155-546d-4321-8ff7-05dbe5e8e696/Screen_Shot_2022-03-22_at_08.59.23.png)

Let’s do it!

Right now our homepage code, in `pages/index.js`, is quite minimal:

```jsx
import Head from 'next/head';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Rental Apartment</title>
				<meta name='description' content='Rental Apartment Website' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<h1>Welcome!</h1>
		</div>
	);
}
```

![Screen Shot 2022-03-22 at 09.01.37.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a9376e96-5e14-4b7c-92c3-d360d32f4537/Screen_Shot_2022-03-22_at_09.01.37.png)

The first thing we’ll do is switch to a dark color theme. In `styles/globals.css` add the `color` and `background-color` CSS properties like this:

```css
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  **background-color: black;
  color: white;**
}
```

![Screen Shot 2022-03-22 at 09.04.03.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0be27219-0279-4a23-aab4-e25751de3ec1/Screen_Shot_2022-03-22_at_09.04.03.png)

For the rest of the lesson we’ll just work on a single file: `pages/index.js`.

First we add the heading part:

```jsx
import Head from 'next/head'
**import Link from 'next/link'**

export default function Home() {
  return (
    <div>
      <Head>
        <title>Rental Apartment</title>
        <meta name='description' content='Rental Apartment Website' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='relative'>
        <div className='absolute inset-0'>
          <img
            className='h-full w-full object-cover'
            src='/img/1.jpeg'
          />
        </div>
        <div className='relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8  bg-gray-800/80'>
          <h1 className='text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
            A Charming Old House
            <span className='block text-gray-300'>on the Italian Alps</span>
          </h1>
          <p className='mt-6 max-w-2xl mx-auto text-center text-xl'>
            House located in the hamlet of Valle di Morbegno, at 800 meters of
            height, is 10 minutes from Morbegno. It can be reached by car and by
            bus from Morbegno, with a stop near the house. Ideal for mountain
            and animal lovers. Your furry friends are welcome. Equipped with
            heating by pellet stove, it is also possible to light the large
            fireplace.
          </p>
          <div className='mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center'>
            <div className=''>
              <Link href={`/calendar`}>
                <a className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 sm:px-8'>
                  See availability calendar and prices
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

Notice I used a `1.jpeg` image here.

Find some fancy images from [https://unsplash.com/s/photos/interior-design](https://unsplash.com/s/photos/interior-design) or [https://unsplash.com/s/photos/tiny-house](https://unsplash.com/s/photos/tiny-house) or [https://unsplash.com/s/photos/villa-bali](https://unsplash.com/s/photos/villa-bali) (find the style you like) and download them to your `public/img` folder, naming them as `1.jpeg`, `2.jpeg` and so on, so they can be accessed like this: `localhost:3000/img/1.jpeg`

![Screen Shot 2022-03-22 at 09.08.53.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0b9ab562-5065-43a2-83ec-3476a12415ec/Screen_Shot_2022-03-22_at_09.08.53.png)

Note that we imported `Link` from `next/link` and we use it to link the button to a `/calendar` URL we’ll build later.

Next up we add the image gallery.

```jsx
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
		<div className='aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4'>
			<img src='/img/5.jpg' className='w-full h-full object-center object-cover' />
		</div>
	</div>
</div>
```

Here’s the result, in a nice grid:

![Screen Shot 2022-03-22 at 09.11.30.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/23d9234e-f29c-4a7c-9d17-ff4393a46b24/Screen_Shot_2022-03-22_at_09.11.30.png)

When the screen is small we only show one image, the last one, and we hide all the others:

![Screen Shot 2022-03-22 at 09.19.27.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6242298b-32f4-4766-bdd1-a5ddd5f1ee47/Screen_Shot_2022-03-22_at_09.19.27.png)

![Screen Shot 2022-03-22 at 09.19.23.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5c5255f9-30fd-4a2d-9017-563cbb803382/Screen_Shot_2022-03-22_at_09.19.23.png)

We do this in the markup with these classes, so the images are hidden until the screen is _large_, so the `lg:` modifier works and we can apply the block or grid layouts:

```jsx
<div className='pt-6'>
  <div className='mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8'>
    <div className='**hidden** aspect-w-3 aspect-h-4 rounded-lg overflow-hidden **lg:block**'>
      <img
        src='/img/2.jpg'
        className='w-full h-full object-center object-cover'
      />
    </div>
    <div className='**hidden lg:grid** lg:grid-cols-1 lg:gap-y-8'>
      <div className='aspect-w-3 aspect-h-2 rounded-lg overflow-hidden'>
        <img
          src='/img/3.jpg'
          className='w-full h-full object-center object-cover'
        />
      </div>
      <div className='aspect-w-3 aspect-h-2 rounded-lg overflow-hidden'>
        <img
          src='/img/4.jpg'
          className='w-full h-full object-center object-cover'
        />
      </div>
    </div>
    <div className='aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4'>
      <img
        src='/img/5.jpg'
        className='w-full h-full object-center object-cover'
      />
    </div>
  </div>
```

Next we define the details and the reviews part.

When the screen is large we show this on two columns, while when the screen is small we use a single column:

![Screen Shot 2022-03-22 at 09.25.12.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3d093c38-f6b0-4b17-8ede-81bfe92d9315/Screen_Shot_2022-03-22_at_09.25.12.png)

![Screen Shot 2022-03-22 at 09.25.07.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ec26e7fa-fe97-491a-9295-17fc0a3df023/Screen_Shot_2022-03-22_at_09.25.07.png)

```jsx
<div className='max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8'>
	<div className='mt-10 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
		<div>
			<div className=''>
				<h1 className='text-2xl font-extrabold tracking-tight  sm:text-3xl mb-10'>Details about the house</h1>

				<p className='text-xl '>
					The house is an old building recently renovated. It has two floors. On the ground floor there is a large terrace with coffee table, cozy living room with kitchenette, pellet stove and
					fireplace. On the upper floor which is accessed with an internal staircase are the double bedroom, and through the terrace you can access the second bedroom, containing two single beds, and
					the bathroom with bathtub (and shower curtain). It is possible to use the washing machine.
					<br />
					<br />
					Lots of local restaurants will serve the typical and traditional foods and wines this valley is known for.
					<br />
					<br />
					For the more adventurous, nearby you will find the famous Fly Emotion, fly across the valley connected to a steel cable!
				</p>
			</div>
		</div>
	</div>

	<div className='mt-10'>
		<p className='text-2xl font-bold'>Reviews</p>
	</div>
</div>
```

We add the reviews by defining a `reviews` array at the top of the file:

```jsx
const reviews = [
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
```

and then we iterate on this array in the JSX to print the data:

```jsx
<div className='max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8'>
	<div className='mt-10 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
		<div>
			<div className=''>
				<h1 className='text-2xl font-extrabold tracking-tight  sm:text-3xl mb-10'>Details about the house</h1>

				<p className='text-xl '>
					The house is an old building recently renovated. It has two floors. On the ground floor there is a large terrace with coffee table, cozy living room with kitchenette, pellet stove and
					fireplace. On the upper floor which is accessed with an internal staircase are the double bedroom, and through the terrace you can access the second bedroom, containing two single beds, and
					the bathroom with bathtub (and shower curtain). It is possible to use the washing machine.
					<br />
					<br />
					Lots of local restaurants will serve the typical and traditional foods and wines this valley is known for.
					<br />
					<br />
					For the more adventurous, nearby you will find the famous Fly Emotion, fly across the valley connected to a steel cable!
				</p>
			</div>
		</div>
	</div>

	<div className='mt-10'>
		<p className='text-2xl font-bold'>Reviews</p>
		**<div className='mt-6'>
			{reviews.map((review, index) => (
				<div className='mb-5' key={index}>
					<div>{review.text}</div>
					<div className='mt-2 text-gray-300'>
						{review.author}, {review.date}
					</div>
				</div>
			))}
		</div>**
	</div>
</div>
```

Finally we add the destinations list.

We do a similar thing like we did for reviews, by defining a `destinations` array on top:

```jsx
const destinations = [
	{
		name: 'Lake Como',
		description: '26km, 32 minutes by car',
	},
	{
		name: 'Milano',
		description: '124km, 2h by car or 1h 40m by train',
	},
	{
		name: 'Passo San Marco',
		description: '17km, 28 minutes by car',
	},
	{
		name: 'Passo Spluga',
		description: '71km, 1h 37min by car',
	},
	{
		name: 'St Moritz',
		description: '92km, 1h 52m by car',
	},
	{
		name: 'Passo Bernina',
		description: '92km, 1hr 51 minutes by car',
	},
	{
		name: 'Bormio',
		description: '97km, 1h 43 min by car',
	},
	{
		name: 'Livigno',
		description: '133km, 2h 35min by car',
	},
];
```

And we iterate on them, displaying them on a nice grid that is 4 columns on a big screen, 2 on a medium screen, and one column in a small screen:

```jsx
<div className='relative  py-16 sm:py-24 lg:py-32'>
	<div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
		<h2 className='text-base font-semibold tracking-wider uppercase'>The surroundings</h2>
		<p className='mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl'>Popular destinations for your holidays</p>
		<p className='mt-5 max-w-prose mx-auto text-xl text-gray-300'>From challenging mountain trails to beautiful alpine lakes to cities, lots of destinations in reach for a day trip</p>
		<div className='mt-12'>
			<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
				{destinations.map((destionation, index) => (
					<div className='pt-6' key={index}>
						<div className='  rounded-lg px-6 pb-8'>
							<div className='-mt-6'>
								<h3 className='mt-8 text-lg font-medium  tracking-tight text-white'>{destionation.name}</h3>
								<p className='mt-5 text-base text-gray-200'>{destionation.description}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	</div>
</div>
```

![Screen Shot 2022-03-22 at 09.28.47.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4bab967b-6e9d-47c2-b6ce-984c8f1e1174/Screen_Shot_2022-03-22_at_09.28.47.png)

![Screen Shot 2022-03-22 at 09.29.07.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/50bcef60-363b-430f-bfdd-70a43d1fe1a8/Screen_Shot_2022-03-22_at_09.29.07.png)

![Screen Shot 2022-03-22 at 09.29.13.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f3736ad7-2f66-4acc-afdc-990b9b55cb46/Screen_Shot_2022-03-22_at_09.29.13.png)

[2. Create the homepage.mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cbd2a431-78ce-4b35-816d-34d61258c97f/2._Create_the_homepage.mp4)

Next lesson: [Defining the data we need in a config file](https://www.notion.so/Defining-the-data-we-need-in-a-config-file-a0beb52a54eb42d5aef0070a179c2e34)
