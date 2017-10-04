# Site Checker
Checks the websites every interval, and sends an email for any websites that are down (statu 404 on the base path/home page).

## Instructions
1. Run npm install to install the dependencies
2. Copy the json files from src/templates/ to src/.
3. Set up a Gmail (or whichever smtp host) smtp key in Gmail.  See Nodemailer for instructions.
4. Add the Gmail app key to auth.json
5. Fill in the other values in the .json files.
    - Any number of websites can be added to sites.json
6. Run the src/checker.js script with a daemon tool like forever or pm2.


## Notes
- If the interval time is very small and a website goes down, you'll get a lot of emails in a short time.  Take this into account when deciding an interval time.  I've found every 15 minutes to be a reasonable interval for my websites.
- This daemon process lends itself well to a low power server device like Raspberry Pi, or any server you currently have running 24/7.
- The base email functionality is in Nodemailer.  Look at these docs for instructions or retooling.
