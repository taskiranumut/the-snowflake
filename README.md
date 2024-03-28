# The Snowflake

<p align="center">
  <img src="https://github.com/taskiranumut/the-snowflake/blob/main/public/main-logo.png" alt="The Snowflake Logo" width="200" />
</p>

<h3>The Snowflake web application is a reservation and container management panel developed for the employees of a winter, forest and container themed luxury hotel.</h3>

👉 [PROJECT LINK](https://the-snowflake.netlify.app/login)

## Features

- **Employee-Exclusive Access:** Registration and application use are restricted to hotel employees. A personal account is created for hotel employees within the application.
- **User Profile Customization:** Profiles can be personalized by adding a photo and updating names and passwords.
- **Container Management Interface:** The application presents a table view for managing container details such as photos, names, capacities, prices, and discounts, with options to add, edit, or remove listings.
- **Booking Management:** The system displays a overview of bookings, including dates, statuses, payments, and guest information, with filters for status categorization.
- **Detailed Booking Records:** Tracks guest numbers, duration of stays, special requests, and breakfast bookings, alongside associated costs.
- **Check-In and Check-Out Management:** Allows the confirmation of payments and the management of guest arrivals and departures directly within the app.
- **Breakfast Option During Check-In:** Guests have the option to add breakfast for their entire stay at the time of check-in.
- **Guest Database:** A database stores detailed guest information such as names, emails, IDs, nationalities, and flags for identification purposes.
- **Dashboard Insights:** Offers a dashboard that summarizes critical information and statistics for the past 7, 30, or 90 days, including guest activities and financial data.
- **Sales and Stay Duration Analytics:** Features charts that depict total and additional sales, with a focus on the duration of stays as a metric.
- **Global Settings Configuration:** Provides the ability to adjust settings for breakfast pricing, the number of nights per booking, and maximum guest allowance.
- **Localization Support:** Supports Turkish and English, enhancing usability for hotel employees and guests by allowing interface navigation and interaction in their preferred language.
- **Dark Mode Availability:** Includes a dark mode setting for improved visual ergonomics in low-light conditions.

## Tech Stack

- [React](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com/en/main)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Recharts](https://recharts.org/en-US)
- [React Icons](https://react-icons.github.io/react-icons/)

## Usage of Application

- First, the application must be logged in.
- `test@test.com` and `123123123` login information can be used for the first login.
- Afterwards, if desired, a new account can be created from the Users tab. Account information is secured by [Supabase Auth](https://supabase.com/docs/guides/auth).
- All accounts view a single data set and manipulate the same data set.
- Since the application is a general admin panel, a user-specific database table is not created.
- Now, can be played with all data freely. Enjoy.

## Installation and Development

To run the application in locale, a database structure must first be created in Supabase. You must create a free account (or login) on [Supabase](https://supabase.com/dashboard/sign-up) and create tables according to the [API schema](https://github.com/taskiranumut/the-snowflake/blob/main/src/services/supabase/schema.types.ts). For image storage, areas should be created for profile pictures and containers under [Supabase storage](https://supabase.com/docs/guides/storage). Environment variables must be defined in the `.env` file in the project root directory, as in the [example file](https://github.com/taskiranumut/the-snowflake/blob/main/.env.example).

RLS policy configurations must be done for tables and storages, [more information](https://supabase.com/docs/guides/auth/row-level-security).

After the database installations are completed, the npm project can be run.

```
npm install
npm run dev
npm run build
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
