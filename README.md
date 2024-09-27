# Ionic Task Manager

This project is a simple task manager built using **Ionic with Angular**. It was created to test the
`@ngrx/component-store` library and demonstrate how state management can be efficiently implemented in an Ionic
application.

## Overview

The task manager allows you to create, edit, delete, and manage tasks in an organized manner. It uses **Ionic storage**
as a simulated backend to store data and employs the `@ngrx/component-store` for state management, ensuring better
performance by avoiding direct data reads from the backend.

## Key Features

- **Task Management**: Create, update, delete, and view tasks.
- **State Management**: Uses `@ngrx/component-store` for efficient and reactive state handling.
- **Simulated Backend**: Ionic storage is used to simulate backend data storage, making it easy to run the application
  without the need for an actual backend server.
- **Performance**: The app utilizes a component store to manage state, avoiding redundant data fetching and improving
  the overall responsiveness of the application.

## Technologies Used

- **Ionic Framework**: For building a cross-platform mobile application.
- **Angular**: As the main framework for developing the application's UI and logic.
- **@ngrx/component-store**: For state management, providing a more efficient way to handle state changes.
- **Ionic Storage**: Used to simulate backend data storage.

## Getting Started

### Prerequisites

- **Node.js** (v12 or later)
- **NPM** (Node Package Manager)
- **Ionic CLI**: Install globally by running `npm install -g @ionic/cli`

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/lucaszrz/ngrx-component-store-with-storage ionic-task-manager
```

2. Navigate to the project directory:

```bash
cd ionic-task-manager
```

3. Install dependencies:

```bash
npm install
```

### Running the Application

To run the application in development mode:

```bash
ionic serve
```

This will start the application and open it in your default web browser. You can also test the application on an emulator or a real device using the Ionic CLI commands.

### Building the Application

To build the application for production:

```bash
ionic build
```

## Using the Application

* Add, edit, and delete tasks using the intuitive UI.
* The application stores data locally using Ionic storage, so your tasks persist even after refreshing the page or closing the app.

## Understanding the Component Store Integration

The `@ngrx/component-store` is integrated into the application as the primary state management solution. It helps in:

* Managing the state of tasks efficiently.
* Reducing direct interaction with the simulated backend.
* Improving the overall performance and responsiveness of the app.

## Why Use `@ngrx/component-store`?

* **Reactive Programming:** The component store allows you to manage state reactively, making the app more responsive and easier to maintain.
* **Performance:** Reduces unnecessary data fetching by caching state changes locally.

## Future Improvements

* Integrate a real backend service to replace the simulated Ionic storage.
* Add authentication and user management features.
* Implement more advanced state management features using `@ngrx/component-store`.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

