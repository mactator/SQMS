# Queue Management System

A simple queue management system built with React, Next.js, Hono, DaisyUI, ShadCN, and TailwindCSS. This project allows users to manage a queue of customers efficiently, providing separate interfaces for ticket dispensing, a waiting room display, and counters where tickets are called.

## Overview

This queue management system consists of three main parts:

1. **Counter Page**: Displays the current ticket number being serviced at each counter. Each counter has a button that, when pressed, updates the display with the next ticket number in line.
2. **Ticket Dispenser Page**: This page is for customers arriving in the queue. Customers can press a button to receive a unique ticket number.
3. **Waiting Room Page**: This is where customers with tickets can wait and see the current status of each counter. Each counter display updates to show the ticket currently being serviced.

### Tools and Libraries

- **React** & **Next.js**: For building the front-end and routing.
- **Hono**: A small and simple web framework.
- **DaisyUI**: Provides pre-defined, customizable UI components for TailwindCSS.
- **ShadCN**: Used for Tailwind utilities and component styling.
- **TailwindCSS**: For styling and utility classes.

## Getting Started

### Prerequisites

- Node.js and npm should be installed on your machine.

### Installation

1. **Clone the repository**:
   
   ```bash
   git clone <repository-url>
   cd QUEUE_MANAGEMENT_SYSTEM
   ```
2. **Install dependencies**:
   
   ```bash
   npm install
   ```
3. **Run the development server**:
   
   ```
   npm run dev
   ```
4. **Access the app**: Open [http://localhost:3000]() in your browser to view the app.



# **Project Structure**:

Below is the general structure of the project:

```lua
QUEUE_MANAGEMENT_SYSTEM/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── ticket_dispenser/
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   ├── server/
│   └── styles/
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Key directories

* ​**src/app**​: Contains the main pages, API routes, and layouts.
* ​**src/components**​: Houses reusable React components.
* ​**src/styles**​: Contains global and custom CSS files.
* ​**public**​: For static assets.

## Basic Concepts

### Routing in Next.js

Next.js simplifies routing by using the file system. Each file in the `src/app` directory represents a route. Here’s how routing works in this project:

* ​`ticket_dispenser/page.tsx`​: This file represents the `/ticket_dispenser` route for the ticket dispenser page.
* `not-found.tsx`​: Used to handle 404 errors.

To add a new page, create a folder inside `src/app` and add a `page.tsx` file within that folder. This will automatically create a new route. For example, `src/app/counter/page.tsx` would create a `/counter` route.

### Using DaisyUI and ShadCN with TailwindCSS

DaisyUI provides ready-to-use UI components that work with TailwindCSS. Each component in DaisyUI has predefined TailwindCSS class names that can be customized. Here are some examples:

1. ​**Button**​:

```jsx
<button className="btn btn-primary">GetTicket</button>
```

* `btn`: Base button styling.
* `btn-primary`: Applies the primary color from DaisyUI theme.

2. Card:

```jsk
<div className="card shadow-lg p-5">
  <p>Counter Display</p>
</div>
```

* `card`: Basic card styling.
* `shadow-lg`: Applies a large shadow.
* `p-5`: Adds padding.

For more information, check out the [DaisyUI documentation](https://daisyui.com/) for the full list of classes.


## Pages and Components

* ​**Counter Page**​: Each counter has a button to update the current ticket number. This is where the counter staff can serve the next customer by updating the display.
* ​**Ticket Dispenser Page**​: This page generates a unique ticket number for arriving customers. After taking a ticket, customers move to the waiting room page.
* ​**Waiting Room Page**​: Displays the current ticket being serviced at each counter, allowing customers to monitor their position in line.

## Additional Resources
* [React Documentation]()
* [Next.js Documentation]()
* [DaisyUI Documentation](https://daisyui.com/)
* [TailwindCSS Documentation](https://tailwindcss.com/docs)

## Contributing
If you'd like to contribute, please fork the repository and make a pull request. For major changes, please open an issue to discuss what you would like to change.

