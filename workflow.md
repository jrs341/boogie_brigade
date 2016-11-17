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

6. Before moving to another pice of code
	- git checkout master
	- git pull
	- start over again at step 2.