# boogie_brigade

Git Work Flow

1. Before making any changes pull the most up to date master from Git Hub

2. git checkout -b branchName
	-Label your branch accoding to the section of code you are working on ex. vision api

3. Push that branch to Git Hub
	- git add .
	- git commit -m "comments"
	- git push origin branchName

4. Go to Git hub and open a pull request for that branch
	- we will be able to communicate about that pice of code through that pull request on Git Hub

	- on the right side of the message box choose a milestone and assign yourself to that pull request


5. Then go to the Projects tab
	- open the boogie brigade project
	- on the right side click add a card, you will see the branch you just pushed in there each new pull request creates a new issue automatically
	- click on it and slide it to the inprogress columb
		-note: your inital comment from your first push will reamin as the issue title but all additional pushes will be visible in that issue

6. Before moving to another pice of code
	- git checkout master
	- git pull
	- start over again at step 2.

Git Branches Work Flow:

I'm going to make two branches off of the master one for the front end and one for the backend.

I think this will let us merge smaller working pices into the master more efficiently.

Basically the flow is the same as above except when you pull you just add origin and branch name, ex

	GIT PULL ORIGIN FRONTEND

	and you can also clone the main branch to your computer just like you do with the master so everyone can have the same working copy

This way the master is always protected from large edits and it will be easier to pice certain portions of code together.

You command line will go as follows:

	GIT PULL ORIGIN FRONTEND

	GIT BRANCH -B [YOUR BRANCH NAME]

		CODE AWAY

	GIT ADD .
	GIT COMMIT -M ""
	GIT PUSH ORIGIN [YOUR BRANCH NAME]

Then go to GitHub and make a pull request

If we do it this way it will be easir merge the FRONTEND and BACKEND branches and then merge those into the master

