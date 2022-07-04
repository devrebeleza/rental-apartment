# Set up a blank Next.js website with create-next-app

This lesson is common for all the projects in the bootcamp. For all our projects, we’ll start with the same set of tasks:

1. set up an empty Next.js app
2. allow absolute imports for modules
3. add Tailwind CSS
4. create a PostgreSQL database
5. install Prisma

---

Go into the folder where you store all the sofware projects on your computer, and install Next.js using the command

```bash
npx create-next-app@latest rental-apartment
```

This will create a `rental-apartment` folder.

Go in that folder and create a `jsconfig.json` file with this content:

```jsx
{
  "compilerOptions": {
    "baseUrl": "."
  }
}
```

This will allow us to import modules we add without needing relative paths. Very useful!

We’re going to set up Tailwind CSS.

Run:

```bash
npm install -D tailwindcss postcss autoprefixer
```

And run this command:

```jsx
npx tailwindcss init -p
```

This generates two files:

- **`tailwind.config.js`**
- **`postcss.config.js`**

Now open with your code editor **`tailwind.config.js`** because we need to add this configuration to it:

```jsx
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [],
};
```

Now open the fle `styles/globals.css` and add this content:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

While you’re here, remove the `styles/Home.module.css` as we’ll not use that.

Now change the content of `pages/index.js` with:

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

Done with Tailwind!

Now create a new PostgreSQL database. As for all the bootcamp projects, you can decide to create it locally, or on a cloud service like [Railway.app](http://railway.app).

> TIP: If you worked on another project and you have TablePlus already open, click the `SQL` button and type the SQL query `CREATE DATABASE rental_apartment;` to create the database quickly.

I prefer to keep the database local so I can also work offline if I want, but it’s up to you. If you forgot how to create a database, go back to Week 6 to get a refresher.

What you need in the end is a working empty database and a connection URL like this:

```jsx
//locally:

postgresql://flaviocopes@127.0.0.1/rental_apartment

//or with Railway:

postgresql://postgres:zHSFcCwioUwpEseCPBD3ST@containers-us-west-16.railway.app:7131/railway
```

Now go back to the terminal, and install Prisma using

```jsx
npm install -D prisma
```

Now run this to setup Prisma for your Next.js project:

```
npx prisma init
```

This will create a `prisma` folder in the project, and inside it, a `schema.prisma` file:

```jsx
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

It also created a `.env` file, in case you didn't have one already, with the `DATABASE_URL` environment variable:

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

Change this string to your database connection URL.

Now create a file `lib/prisma.js` with this content:

```jsx
import { PrismaClient } from '@prisma/client';

let global = {};

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
```

We’ll import this any time we need to use Prisma.

In this project we don’t use NextAuth, so you’ll have to install `@prisma/client` yourself with

```jsx
npm install @prisma/client
```

[1. Set up a blank Next.js website with create-next-app.mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cc2f337d-32fd-48b6-a8c9-4d2273d47cc8/1._Set_up_a_blank_Next.js_website_with_create-next-app.mp4)

Next lesson: [Create the homepage](https://www.notion.so/Create-the-homepage-a7ff2274c07e4a3cba06e84073853688)
