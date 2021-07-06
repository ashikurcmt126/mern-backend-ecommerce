1. install some package:
==> npm install --save express express-validator mongoose dotenv

2. install nodemon
==> npm install --save-dev nodemon
To start project, Run below command:
==> npm start

3. install body-parser 
To pass json data, Run below command,
==> npm install --save body-parser
use:
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

4. sign in on mongodb server.
Step 1: Create cluster
step 2: Add Ip address from network access... 
step 3: Allow access from anywhere..
step 4: Database access:
* username: root
* password: V'M,g.e"4T
#Add your connection string into your application code
mongodb+srv://root:<password>@cluster0.xjtdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
step 5: install slugify for slug...
step 6: multer npm is a node.js middleware for handling multipart/form-data
step 7: shortid npm is help to create my file name short id