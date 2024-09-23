# Niwas-Saathi

Are you far from your hometown and need to find a place to stay? Are you a college student looking for a room or hostel? 

Let Niwas Saathi help you find a place to stay.

![Niwas Saathi](https://github.com/user-attachments/assets/6ca0ceda-26a0-48d9-a713-edb41856d954)


# To Clone the Repository:

Step 1 : Clone the repository

```
git clone https://github.com/Hap-404/Software-Group-Project.git
```
Step 2 : Open the LOGIN given in separate folder.
```
 cd LOGIN
 cd src
```

Step 3 : Install all dependencies give in package.json
```
npm i bcrypt cors dotenv express express-handlebars hbs mongoose
nodemon stripe
```
Step 4 : Do this change in package.json in LOGIN Folder
```
"dev": "nodemon src/index.js -e js,hbs"
```
Step 5 :  run below command in you terminal.
```
npm run dev
```