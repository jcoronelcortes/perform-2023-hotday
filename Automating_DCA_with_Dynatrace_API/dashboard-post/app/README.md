# Automated Deployment, Configuration, and Analytics with Dynatrace API's
## Analytics Workshop

Using Dynatrace, GitHub, webcoach, Node.js and npm, we can set up a best practices dashboard for your application providing actionable insights in a dashboard automatically in no time. This guide will show you how to get up and running step-by-step, and integrate any tool to work with the Dynatrace API's. In this example we used [webcoach](https://www.npmjs.com/package/webcoach) a third-party open source tool to help augment the data we're seeing in Dynatrace by providing additional analytics as well as best practice advice to the applications we have monitored in Dynatrace.

Prerequisites
-------------

*   Access to a [GitHub](https://github.com/)\-repository
*   [Node.js](https://nodejs.org)
*   [npm](https://www.npmjs.com/)
*   [Google Chrome](https://www.google.com/chrome)

Step 1: Download the GitHub Repo
--------------------------------

Clone the GitHub repository to your machine. This can be done using the command `git clone <repo-url>`, where `<repo-url>` is the link to the repository.

Step 2: Install the npm Packages
--------------------------------

Navigate to the cloned repository's directory using `cd <directory-name>`. Once inside, run `npm install` to install all the necessary packages for the project.

Step 3: Edit the .env File
--------------------------

To ensure the application environment variables are correctly configured, find the `.env` file and edit it using your favorite text editor.  
Make sure the variables `DYNATACE_TENANT_URL` and `DYNATRACE_API_TOKEN` are set.

Step 4: Run the App
-------------------

Execute the application by running `node index.js` in your terminal. The application should now be running!

Try it Out
----------

Once you have followed all the steps, you can start using the application.