# Project Template

Welcome to the project! This project uses Django for the backend and React with Vite for the frontend.<br />

### Prerequisites

Before you can run the project, make sure you have the following installed:
- Python (version 3.9 or higher)
- Node.js (version 16 or higher)
- npm (comes with Node.js installation)
- postgres

### Backend Setup (Django) 

Follow these steps: 

- Create a virtual environment:
- Open a terminal and navigate to the project directory.
- Create a virtual environment using the following command:

    `python -m venv <virtual_environment_name>`

Activate the virtual environment:

- On Windows:

    `<virtual_environment_name>\Scripts\activate`

- On macOS/Linux:

    `source <virtual_environment_name>/bin/activate`

* Change username, database_name and password in backend/setttings.py according to your local postgres configurations

- Install the backend dependencies:

    `cd backend`

    `pip install -r requirements.txt`

    `python manage.py makemigrations`

    `python manage.py migrate`

- Run the Django server:

    `python manage.py runserver`

The backend server should now be running at http://127.0.0.1:8000/.


### Frontend Setup (React with Vite)

- Navigate to the frontend directory:

    `cd frontend`

- Install the frontend dependencies:

    `npm install`

- Start the Vite development server:

    `npm run dev`

The frontend server should now be running at http://localhost:5173/.



### Contributing

If you would like to contribute to the project, please follow the standard GitHub workflow:

- Fork the repository.
- Create a new branch for your feature or bug fix.(MUST)
- Make your changes and commit them.
- Push your branch to your forked repository.
- Submit a pull request to the main repository.


We appreciate your contributions!
