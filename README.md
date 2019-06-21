# Administrative-web-app

Administrative and management web application for tracking changes, review statistics and managing data.

# How to install the App?

First clone the project:

    git clone https://github.com/VladAnn9/Administrative-web-app.git

After this go to 'backend' and 'early-stage-manager' folders and install npm packages:

    npm install
    
## Database

Then install and config your database. You can use for that Mysql Workbench.
You can download and install it here: 

    https://www.mysql.com/products/workbench/
    
After that you need to create new connection and import SQL file to your database.
Here's description how you can create connection: 

    https://dev.mysql.com/doc/workbench/en/wb-mysql-connections-new.html
    
You can leave it with default values and not sign a password.

Then you need to add some data to your just created connection.
Here's how you can do this.

    https://dev.mysql.com/doc/workbench/en/wb-admin-export-import-management.html

In the Data Import / Import Options menu select 'Import from Self-Contained File' instead of 'Import from Dump Project Folder'.

After you need to fill up the 
    backend/data/config.js file with your connection credentials which you have signed before.
    
That's it)

# Last steps!

So, now we can launch our application, to do so we just need to buils our backend.

In console of backend folder write:

    npm run build
    
And now we can serve our frontend side of project:

In frontend's folder, console write:
    
    ng serve -o
    
And the app will automatically open in your browser tab.

# Conclusion

Welcome to check it out. Hope you enjoy it.

If you have some suggestions, I'm open to hear from you :)
    
