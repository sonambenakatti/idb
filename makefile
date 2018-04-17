# Makefile specification
# ----------------------

GithubID = sonambenakatti
RepoName = idb
SHA      = 30a68ea7bb9d1fbed2ec9f2e79cd5f226dce96ca

githubid:
	@echo "${GithubID}"

reponame:
	@echo "${RepoName}"

sha:
	@echo "${SHA}"

# The Makefile should be present in the root of the project.
# There should be the following commands written:

# make github   - prints link to github repo
github:
	@echo "http://www.github.com/${GithubID}/${RepoName}"

# make issues   - prints link to current phase's issues
issues:
	@echo "http://www.github.com/${GithubID}/${RepoName}/issues"

# make stories  - prints link to current phase's stories
stories:
	@echo "https://github.com/${GithubID}/idb/projects/1"

# make uml      - prints link to uml diagram
uml:
	@echo "https://${GithubID}.gitbooks.io/espresso-yoself/content/uml-diagram.html"

# make selenium - runs selenium tests
selenium:
	python3 frontend/guitests.py

# make mocha - runs frontend tests
mocha:
	@(cd frontend; npm test)

# make unittest  - runs backend tests
unittest:
	@(cd backend; python3 tests.py)

# make website  - prints link to a website
website:
	@echo "http://www.espressoyoself.me"

# make report   - prints link to technical report
report:
	@echo "https://sonambenakatti.gitbooks.io/espresso-yoself/content/"

# make apidoc   - prints link to api documentation
apidoc:
	@echo "https://sonambenakatti.gitbooks.io/api/content/"

# make self     - prints link to self critique
self:
	@echo "https://sonambenakatti.gitbooks.io/espresso-yoself/content/self-critique.html"

# make other    - prints link to other critique
other:
	@echo "https://sonambenakatti.gitbooks.io/espresso-yoself/content/other-critique.html"
