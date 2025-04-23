# whatsapp-bot-server

## Local Server Setup

<p>Follow this instruction to setup on your local machine</p>
<ul>
<li>1. git clone this repository</li>
<li>2. npm install</li>
<li>3. "npm run dev", to start the nodejs server </li>
</ul>

## Production Server Setup

<p>Follow this instruction to setup on your production server</p>
<ul>
<li>1. git clone this repository</li>
<li>2. npm install</li>
<li>3. "npm run start", to start the server </li>
</ul>

## Deployment on Render

1. Create a new account or login to [Render](https://render.com)
2. Click on "New" and select "Web Service"
3. Connect your GitHub repository
4. Use the following settings:
   - **Name**: whatsapp-bot (or choose your own)
   - **Environment**: Node
   - **Region**: Choose nearest to your location
   - **Branch**: main (or your default branch)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click "Create Web Service"
6. Wait for deployment to complete

## API Documentation

<p>After starting the nodejs server. Navigate to "http://localhost:4000/api-docs" on your browser to see the api documentation</p>
