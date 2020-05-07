# mevn-basic-auth

# Boilerplate for MEVN applications with following features :

1. User Registration / Login / Logout
2. Send Account Activation Link to registered email
3. Resend Account Activation Link if not received email
4. Forgot password which send email to reset password

Server (express) is arranged in a MVC pattern layout to make it easy to arrange files amongst the directories.

# Steps to get it up & running in your local machine :

1. Ensure you already have node & npm installed.
2. Run `npm install` to install all the dependencies.
3. Copy `.env.setup` to `.env` and prepare the .env files with the settings
4. Start Mongo in a new terminal window `mongod`
5. Run `npm run build`
6. Run `npm run dev`