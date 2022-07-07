# Create the data model to host bookings

Now that our calendar is working with fake bookings data, it’s time to switch to displaying actual bookings.

Before we can do so, we need to define a model for the data.

This time the model is pretty simple as we’ll just have one:

```jsx
model Booking {

}
```

We add an `id`, we store the `from` and `to` information, we store the price.

We need to store the user’s email, so we know who made the reservation. We’ll get this data from the Stripe transaction. Speaking of Stripe, we also need the session ID data, and if the transaction has been paid:

```jsx
model Booking {
  id        String   @id @default(cuid())
  from      DateTime
  to        DateTime
  price     Decimal?
  email     String? //needed for Stripe
  sessionId String? //needed for Stripe
  paid      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

Remember to run

```css
npx prisma migrate dev
```

in the terminal after you saved the changes, to apply them to the database.

[10. Create the data model to host bookings.mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/edaa2230-5659-45d6-89b1-fb7ba644a8aa/10._Create_the_data_model_to_host_bookings.mp4)

Next lesson: [Implement payment via Stripe](https://www.notion.so/Implement-payment-via-Stripe-50503eef5b17445b8234ad7d8d51a8e3)
