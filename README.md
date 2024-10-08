# LIGHTWAVE DASHBOARD

The **LIGHTWAVE Dashboard** is a powerful admin panel for managing the **[LIGHTWAVE](https://light-wave.vercel.app)** ecommerce platform, which specializes in selling electrical supplies. This dashboard provides various administrative features that allow store managers to control and monitor different aspects of the store, from products and categories to user management and order handling.

## Live Demo

Check out the live demo of the project [here](https://your-live-demo-link.com).

## Features

-   **Admin Authentication**: Only admins can log in and access the dashboard.
-   **Dashboard Overview**: View store statistics and performance data.
-   **Product Management**: Add, update, and delete products.
-   **Categories Management**: Manage product categories and subcategories.
-   **Deals Management**: Add or update special deals.
-   **Order Management**: Confirm, manage, and track orders.
-   **Inbox**: Receive and manage client messages and requests.
-   **User Management**: View the users table with options to add new users.
-   **Profile Page**: Update and manage personal admin information.
-   **Search Functionality**: Easily search for products across the store.
-   **Dark Mode**: Support for dark mode to enhance user experience.

## Technologies Used

-   **Frontend**: React
-   **Backend**: Supabase
-   **Libraries**:
    -   `react-query`
    -   `react-hot-toast`
    -   `sweetAlert`
    -   `react-paginate`
    -   `swiper-js`
    -   `date-fns`
    -   `recharts`
    -   `react-router-dom`
    -   `react-icons`
    -   `tailwindcss`

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/YasserCoder/LightWave-Dashboard.git
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up Supabase**:

    - Create a project on Supabase.
    - Copy the Supabase project URL and the API key.
    - Create a `.env` file in the root directory and add the following:
        ```env
        VITE_SUPABASE_URL=your_supabase_url
        VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
        ```

4. **Start the development server**:
    ```bash
    npm run dev
    ```

## Usage

Once you have logged in as an admin, you will have access to the following features:

1. **Dashboard Overview**: A summary of the store’s stats, such as total sales, number of products, and more.
2. **Product Management**: Manage the store's products—add new products, update existing ones, or delete them.
3. **Categories Management**: Organize products into categories and subcategories.
4. **Deals Management**: Create and manage special deals and promotions.
5. **Order Management**: Review, confirm, and manage customer orders.
6. **Inbox**: Handle customer inquiries and messages.
7. **User Management**: View the user base, add new users, or manage existing ones.
8. **Profile Page**: Update your personal information such as email, password, or profile picture.
9. **Dark Mode**: Toggle between light and dark themes for better accessibility.

## Contributing

We welcome contributions to improve and expand the functionality of the LIGHTWAVE Dashboard. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## Contact

For any questions or feedback, please reach out to:

-   **Yasser Laissaoui**
-   **Email**: yasser.laiss01@gmail.com
-   **GitHub**: [YasserCoder](https://github.com/YasserCoder)

## Inspiration

Design inspiration for the dashboard was taken from  [Link](https://www.figma.com/community/file/1324762163080748317/dashstack-free-admin-dashboard-ui-kit-admin-dashboard-ui-kit-admin-dashboard).
