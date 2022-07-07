# Send confirmation emails

When we got the payment confirmation from Stripe in the webhook, we’ll send 2 emails. One to the apartment owner, another to the user that booked.

To do so we first install the `nodemailer` library:

```jsx
npm install nodemailer
```

and we create the `lib/email.js` file with a single `sendEmail()` function

```jsx
import nodemailer from 'nodemailer';

export default function sendEmail(to, subject, body) {
	const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);

	transporter.sendMail(
		{
			from: process.env.EMAIL_FROM,
			to: to,
			subject: subject,
			html: body,
		},
		function (err, info) {
			if (err) {
				console.log(err);
			} else {
				//ok
				console.log('email sent');
			}
		}
	);
}
```

We also add to the `.env` file the variables `EMAIL_SERVER` and `EMAIL_FROM`, like this:

```jsx
EMAIL_SERVER=smtp://YOURACCESS:YOURPASSWORD@smtp.mailtrap.io:465
EMAIL_FROM=Your name <you@email.com>
```

Now in `pages/api/stripe/webhook.js` I first import this function:

```jsx
import sendEmail from 'lib/email.js';
```

and right after the call to `prisma.booking.updateMany()` I send 2 emails like this:

```jsx
sendEmail('you@youremail.com', 'New booking', `${email} booked from ${new Date(booking.from).toDateString()} to ${new Date(booking.to).toDateString()}`);

sendEmail(email, 'Thanks for booking', `Your booking from ${new Date(booking.from).toDateString()} to ${new Date(booking.to).toDateString()} is confirmed!`);
```

[13. Send confirmation emails.mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f7eee2bf-9f0c-454d-9d14-f3f9eb88934a/13._Send_confirmation_emails.mp4)

Next lesson: [Show bookings from the database in the calendar](https://www.notion.so/Show-bookings-from-the-database-in-the-calendar-8e70eb97622346eaa5a82f8d269013b9)
