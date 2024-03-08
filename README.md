# Brief

A quality control report generation app written in ReactJS + NodeJS + MySQL.
You can watch the demo below:
[Part I](https://drive.google.com/file/d/18RFKHFKM0Q8rGWeyn8TVxnI90V8JlBt3/view).
[Part II](https://drive.google.com/file/d/1cpEXjej8XPt374YOVtDDAH9izu50KgwC/view).
[Part III](https://drive.google.com/file/d/1iW082lBG-T6NfJIiSkvy6JfC1-u87iP_/view).

# Setup
There are two sections:
- frontend
- backend

clone the repository in your local computer and them install the required packages for each folder using "npm install".
After that you'd need to create two environment files in both folder.

For Frontend, you'd need the following values in you .env file (create it at the base):
- REACT_APP_BASE_URL (the url of your backend i.e. https://localhost:8000)

For backend you'd need the following values in your .env file (create it inside the src folder):
- ACCESS_TOKEN_SECRET (since i've used JWT for token varification)
- CLOUDINARY_CLOUD_NAME
- COLUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- PORT=8000

cloudinary has been used to save the product image and the generated pdf file; their links are being stored in the database for easy access.

After which you can run the project using "npm run dev" on both frontend, as well as backend; then visit http://localhost:3000 to view and use the app.

# Screenshots
- this is the homepage where all the generated reports would be visible
![image](https://github.com/codewithmero/quality-analist/assets/20500860/dddcfb02-32ee-49f9-bc38-d3a2aa840c50)

- By clicking on the green add icon below, we can generate a new report. The interface is something like this
![image](https://github.com/codewithmero/quality-analist/assets/20500860/856d7e33-abd4-453e-801a-3057c826ab1a)

- By clicking the camera icon, we can capture the image
![image](https://github.com/codewithmero/quality-analist/assets/20500860/895158a5-7554-4bf6-963d-498a11ffa729)

- Once we have generated a report it would redirect us to a view panel where we can read the report
![image](https://github.com/codewithmero/quality-analist/assets/20500860/5a78981f-b737-4249-9890-a372d56f34ec)
while the report is loading, a loader becomes visible. Similarly, report generation phase also as a loader

- we can also search for the reports by clicking on the search icon on the homepage;
![image](https://github.com/codewithmero/quality-analist/assets/20500860/e93f1a03-8c70-4c7d-9f26-2996a7d22385)
it searches based on a lot of factors - item name, contractor name, report name, etc.,

- we also have a nav for quick access;
![image](https://github.com/codewithmero/quality-analist/assets/20500860/c39c411f-5fa1-4c64-bb62-de33761596ee)

Right now, the user authentication and role access hasn't been implemented on the frontend due to the time constraints. But I've created the required controllers at the backend.


