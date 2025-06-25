# PMP280425

## GPT Question Page

To use the GPT-powered question page you need to provide the backend API URL.
Create a `.env` file inside the `frontend` folder with the following variable:

```bash
REACT_APP_PMP_GENIE_URL=<your-api-endpoint>
```

Replace `<your-api-endpoint>` with the actual endpoint that returns question
data. When this variable is not set the app defaults to a placeholder URL and
will display an error like "Failed to fetch questions. Please try again.".
