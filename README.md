# Brief

A quality control report generation app written in ReactJS + NodeJS + MySQL.
[You can visit here to watch a demo ](https://devfolio-liard.vercel.app/).

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

After which you can run the project using "npm run dev" on both frontend, as well as backend;

# Screenshots
![image](https://github.com/codewithmero/quality-analist/assets/20500860/dddcfb02-32ee-49f9-bc38-d3a2aa840c50)

