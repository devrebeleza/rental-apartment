This is a project developed in Bootcamp Flavio Copes 2022

People can use this app to rent our house.

We have our own nice looking website where people can look at the photos of the house, the map to reach it, some information about what they will find in the house and in the surroundings, a page with the availability calendar, and a Stripe checkout.

It’s like an hotel, but with a single room. Or a villa.

When a new booking comes in w'll send a confirmation email to the buyer, and a notification to the apartment owner.

we’ll define prices through a configuration file.

Instead of a dashboard, we’ll email you when someone books, to add the reservation to your house calendar.

## Libraries Installed

1. Next.js app (ReactJS Framework)
2. TailwindCSS with postcss, autoprefixer (CSS)
3. Prisma (ORM)
4. PostgreSQL (railway)
5. Stripe to Payment Processing Platform for the Internet
6. react-day-picker (to create calendars)

> We need to define a database locally or on a cloud service like [Railway.app](http://railway.app).

> We need in the end is a working empty database and a connection URL like this:

```jsx
//locally:

postgresql://rgarcia@127.0.0.1/digital_download_platform

//or with Railway:

postgresql://postgres:zHSFcCwioUwpEseCPBD3ST@containers-us-west-16.railway.app:7131/railway
```

> Create a `.env` file, with the environment variables:

```bash
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
EMAIL_SERVER=smtp://user:pass@smtp.mailtrap.io:2525  // port: 25 or 465 or 587 or 2525
EMAIL_FROM=Your name <you@email.com>
NEXTAUTH_URL=http://localhost:3000
SECRET=<ENTER A UNIQUE STRING HERE>
```

To define a SECRET key, we can use [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32

We can use [https://mailtrap.io](https://mailtrap.io/) to test the emails.

> For Stripe we need to define our secret and public key, and our webhook key

```bash
STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BASE_URL=http://localhost:3000  (for local test)
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxx
```

> To apply changes to the database execute

```bash
  npx prisma migrate dev
```

> run the app

```bash
  npm run dev
```

> in other cmd, init webhook Stripe to accept POST request to our API (windows)

```bash
.\stripe listen --forward-to localhost:3000/api/stripe/webhook
```

we need to execute the previous command to listen stripe, don't close this connection
