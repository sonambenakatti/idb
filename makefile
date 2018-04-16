#.DEFAULT_GOAL := all

# uncomment these three lines when you've created those files
# you must replace GitHubID with your GitHubID
#    .travis.yml                           \
#    collatz-tests/GitHubID-RunCollatz.in  \
#    collatz-tests/GitHubID-RunCollatz.out \

selenium: ./frontend/guitests.py
	-python3 ./frontend/guitests.py

mocha: ./frontend/tests.js
	npm install --global mocha
	npm ./frontend/tests.js

unittest: ./backend/tests.py
	-python3 ./backend/tests.py

github:
	@echo "https://github.com/sonambenakatti/idb"

web:
	@echo "http://www.espressoyoself.me"

report:
	@echo "https://legacy.gitbook.com/book/sonambenakatti/espresso-yoself/details"

api:
	@echo "https://legacy.gitbook.com/book/sonambenakatti/api/details"
