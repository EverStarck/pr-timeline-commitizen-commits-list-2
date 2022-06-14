const core = require('@actions/core');
const github = require('@actions/github');


const main = async () => {
    try {

        console.log("Hello World!");
        /**
         * We need to fetch all the inputs that were provided to our action
         * and store them in variables for us to use.
         **/
        const token = core.getInput('github-token', { required: true });
        const owner = core.getInput('owner', { required: true });
        const repo = core.getInput('repo', { required: true });
        const pull_number = core.getInput('pull_number', { required: true });

        /**
         * Now we need to create an instance of Octokit which will use to call
         * GitHub's REST API endpoints.
         * We will pass the token as an argument to the constructor. This token
         * will be used to authenticate our requests.
         * You can find all the information about how to use Octokit here:
         * https://octokit.github.io/rest.js/v18
         **/
        const octokit = new github.getOctokit(token);

        console.log(owner, "owner");
        console.log(repo, "repo");
        console.log(pull_number, "pull_number");

        console.log("Hello World! 2");

        /**
         * We need to fetch the list of files that were changes in the Pull Request
         * and store them in a variable.
         * We use octokit.paginate() to automatically loop over all the pages of the
         * results.
         * Reference: https://octokit.github.io/rest.js/v18#pulls-list-files
         */

        console.log("BRRR")

        const prNumber = github.context.payload.pull_request.number;
        const xd = JSON.stringify(github.context.payload)

        console.log(xd, "Xd")
        console.log(github)
        console.log({ prNumber })


        const { data: changedFiles } = await octokit.rest.pulls.listFiles({
            owner,
            repo,
            pull_number: pull_number,
        });

        console.log(changedFiles)

        core.setOutput("pull-request-body", "yeyeyeyeyye");
    } catch (error) {
        console.log("error")
        core.setFailed(error.message);
    }
}

// Call the main function to run the action
main();
