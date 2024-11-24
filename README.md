<h3>Blog management platform:</h3>
<ul>
<li>Users can read blogs.</li>
<li>Admins can create, edit, and delete blogs.</li>
<li>Blogs can have rich-text formatting, images, and tags.</li>
<li>All users can filter and search blogs based on tags or keywords.</li></ul>

<br/>
<h4>Tech stack used:</h4>
<ul>
  <li>Frontend -> React</li>
  <li>Backend -> Node, Express and MongoDB</li>
</ul>

<h4>Local Setup</h4>
<h5>Backend</h5>
<ol>
  <li>git clone https://github.com/abhigurjeet/blog-management-platform.git</li>
  <li>cd backend</li>
<li>npm install</li>
  <li>Create a .env file in backend folder and paste below variables (For db, you can set up free cluster on mongodb)(JWT secret is any random string)</li>
  <ul><li>
PORT=3001</li><li>
DB_URL=</li><li>
JWT_SECRET=
</li></ul>
<li>npm run dev</li>
  <b>The server starts running at PORT of your choice</b>
</ol>
<h5>Frontend</h5>
<ol>
  <li>cd frontend</li>
<li>npm install</li>
  <li>Create a .env file in frontend folder and paste below variables (Set api url to http://localhost:PORT)</li>
  <ul><li>
REACT_APP_API_URL=</li>
</ul>
<li>npm start</li>
  <b>The application starts running on local system now</b>
</ol>
