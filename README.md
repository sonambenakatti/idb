# Espressoyoself website repo
# GitPitch repo: https://github.com/ruchi-shekar/swe-pitch

## Requirements/Dependencies
In order to run the tests, please run `npm install`  in the root directory. You will also need the config.ini file in order to run `make unittest`. Scroll down to the Secrets section for more detail.

### Makefile commands (NOTE: `make frontend` and `make backend` have been changed to `make mocha` and `make unittest` respectively):

*make githubid*

*make reponame*

*make sha*

*make github*   - prints link to github repo

*make issues*   - prints link to current phase's issues

*make stories*  - prints link to current phase's stories

*make uml*      - prints link to uml diagram

*make selenium* - runs selenium tests

*make mocha* - runs frontend tests

*make unittest*  - runs backend tests

*make website*  - prints link to a website

*make report*   - prints link to technical report

*make apidoc*   - prints link to api documentation

*make self*     - prints link to self critique

*make other* - prints link to other critique

### Secrets

Add config.ini file into the backend directory for API and DB secrets so that `make unittest` will run without errors.
