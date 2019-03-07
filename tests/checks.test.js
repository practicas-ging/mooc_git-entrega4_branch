/**
 * Checker Script for mooc_git-entrega4_branch
 */


// IMPORTS
const should = require('chai').should();
const git = require('simple-git/promise');
const Utils = require("./utils");
const to = require("./to");
const path = require('path');
const fs = require('fs-extra');


// Parse input arguments
const args = JSON.parse(JSON.stringify(process.argv));

// Gets the student name from args[2]
if (!(args.length > 2)) {
    console.error("ERROR: Student name not found");
    process.exit(1);
}
const account_student = args[2];

// Gets the second account name from args[3]
if (!(args.length > 3)) {
    console.error("ERROR: second account name not found");
    process.exit(1);
}
const account_auxiliary = args[3];

// CONSTS
const REPO_NAME = 'cal_2com';
const PATH_ASSIGNMENT = path.resolve(path.join(__dirname, "../"));
const REPO_URL = `https://github.com/${account_student}/${REPO_NAME}`;
const AUXILIARY_REPO_URL = `https://github.com/${account_auxiliary}/${REPO_NAME}`;
const PATH_REPO = path.join(PATH_ASSIGNMENT, REPO_NAME);
const BRANCH_NAME = "inverse";

// GLOBALS
let error_critical1 = null;
let error_critical2 = null;
let output = null;
let mygit = git(PATH_ASSIGNMENT);

describe('mooc_git-entrega4_branch', function () {

    it("", async function () {
        const expected = AUXILIARY_REPO_URL;
        this.name = `1. Checking that the auxiliary repo ${expected} exists`;
        this.score = 1;
         this.msg_ok = `${expected} found`;
        [_, _] = await to(fs.remove(PATH_REPO));
        [error_repo, _] = await to(mygit.clone(expected));
        if (error_repo) {
            this.msg_err = `${expected} not found.\n\t\tError: >>${error_repo}<<`;
            error_critical1 = this.msg_err;
            should.not.exist(error_critical1);
        }
        await to(mygit.cwd(PATH_REPO));
        should.not.exist(error_repo);
    });

    it("", async function () {
        const expected = BRANCH_NAME;
        this.name = `2. Checking that the auxiliary repo contains the branch '${BRANCH_NAME}'`;
        this.score = 1;
        if (error_critical1) {
            this.msg_err = error_critical1;
            should.not.exist(error_critical1);
        } else {
            let output;
            this.msg_ok = `Found branch '${BRANCH_NAME}'`;
            [error_branch, branches] = await to(mygit.branch());
            if (error_branch) {
                this.msg_err = `Error reading branches from ${PATH_REPO}`;
                error_critical1 = this.msg_err;
                should.not.exist(error_critical1);
            } else {
                output = branches.all;
            }
            const no_branch = !Utils.search(expected, output);
            if (no_branch){
                this.msg_err = `Branch '${BRANCH_NAME}' not found`;
                error_critical1 = this.msg_err;
                should.not.exist(error_critical1);
            }
            Utils.search(expected, output).should.be.equal(true);
        }
    });

    it("", async function () {
        const expected = "inverse";
        this.name = `3. Checking that the auxiliary repo branch '${BRANCH_NAME}' includes '${expected}'`;
        this.score = 1;
        if (error_critical1) {
            this.msg_err = error_critical1;
            should.not.exist(error_critical1);
        } else {
            this.msg_ok = `Found '${expected}' in auxiliary repo branch '${BRANCH_NAME}'`;
            [error_log, log] = await to(mygit.log([`origin/${BRANCH_NAME}`]));
            if (error_log) {
                this.msg_err = `Error reading logs from ${PATH_REPO}`;
                error_critical1 = this.msg_err;
                should.not.exist(error_critical1);
            }
            let output = log.all[0]["message"];
            this.msg_err = `'${expected}' not found in the last commit from the auxiliary repo branch '${BRANCH_NAME}'.\n\t\tReceived: >>${output}<<`;
            Utils.search(expected, output).should.be.equal(true);
        }
    });

    it("", async function () {
        const expected = "inverse";
        this.name = `4. Checking that the auxiliary repo master branch includes '${expected}'`;
        this.score = 2;
        if (error_critical1) {
            this.msg_err = error_critical1;
            should.not.exist(error_critical1);
        } else {
            this.msg_ok = `Found '${expected}' in auxiliary repo master branch`;
            [error_log, log] = await to(mygit.log());
            if (error_log) {
                this.msg_err = `Error reading logs from ${PATH_REPO}`;
                error_critical1 = this.msg_err;
                should.not.exist(error_critical1);
            }
            let output = log.all[0]["message"];
            this.msg_err = `'${expected}' not found in the last commit from the auxiliary repo master branch.\n\t\tReceived: >>${output}<<`;
            Utils.search(expected, output).should.be.equal(true);
        }
    });

    it("", async function () {
        const expected = REPO_URL;
        this.name = `5. Checking that the main repo ${expected} exists`;
        this.score = 1;
        this.msg_ok = `${expected} found`;
        await to(mygit.cwd(PATH_ASSIGNMENT));
        [_, _] = await to(fs.remove(PATH_REPO));
        [error_repo, _] = await to(mygit.clone(expected));
        if (error_repo) {
            this.msg_err = `${expected} not found.\n\t\tError: >>${error_repo}<<`;
            error_critical2 = this.msg_err;
            should.not.exist(error_critical2);
        }
        await to(mygit.cwd(PATH_REPO));
        should.not.exist(error_repo);
    });

    it("", async function () {
        const expected = "inverse";
        this.name = `6. Checking that the main repo master branch includes '${expected}'`;
        this.score = 2;
        if (error_critical1) {
            this.msg_err = error_critical1;
            should.not.exist(error_critical1);
        } else {
            this.msg_ok = `Found '${expected}' in main repo master branch`;
            [error_log, log] = await to(mygit.log());
            if (error_log) {
                this.msg_err = `Error reading logs from ${PATH_REPO}`;
                error_critical1 = this.msg_err;
                should.not.exist(error_critical1);
            }
            let output = log.all[1]["message"];
            this.msg_err = `'${expected}' not found in the second to last commit from the main repo master branch.\n\t\tReceived: >>${output}<<`;
            Utils.search(expected, output).should.be.equal(true);
        }
    });

    it("", async function () {
        const expected = "pull request";
        this.name = `7. Checking that the main repo master branch includes '${expected}'`;
        this.score = 2;
        if (error_critical1) {
            this.msg_err = error_critical1;
            should.not.exist(error_critical1);
        } else {
            this.msg_ok = `Found '${expected}' in main repo master branch`;
            [error_log, log] = await to(mygit.log());
            if (error_log) {
                this.msg_err = `Error reading logs from ${PATH_REPO}`;
                error_critical1 = this.msg_err;
                should.not.exist(error_critical1);
            }
            let output = log.all[0]["message"];
            this.msg_err = `'${expected}' not found in the last commit from the main repo master branch.\n\t\tReceived: >>${output}<<`;
            Utils.search(expected, output).should.be.equal(true);
        }
    });
});
