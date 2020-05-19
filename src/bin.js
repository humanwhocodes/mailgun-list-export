#!/usr/bin/env node

/**
 * @fileoverview CLI to download Mailgun data
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Requires
//-----------------------------------------------------------------------------

const { Env } = require("@humanwhocodes/env");
const fetch = require("node-fetch");
const fs = require("fs");
const debug = require("debug")("main");
const { SingleBar: ProgressBar } = require("cli-progress");

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

/**
 * Wrapper around basic API fetching.
 * @param {string} url The URL to fetch.
 * @returns {Promise<Object>} The API response. 
 */
async function getURL(url) {
	debug("Fetching " + url);
	const response = await fetch(url, {
		headers: {
			"Authorization": "Basic " + Buffer.from("api:" + env.required.MAILGUN_AUTH_KEY).toString("base64")
		}
	});

	if (response.status !== 200) {
		throw new Error("Invalid Mailgun API status ", response.status);
	}

	return response.json();
}

//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------

if (process.argv.length < 3) {
	console.error("Missing mailing list name.");
	console.error("Usage: mailgun-list-export your-list-name@example.com");
	process.exit(1);
}

const env = new Env();
const MAILGUN_MEMBERS_URL = `https://api.mailgun.net/v3/lists/${ process.argv[2] }/members/pages`;
const MAILGUN_LIST_URL = `https://api.mailgun.net/v3/lists/${ process.argv[2] }`;

(async () => {

	const members = [];
	let membersURL = MAILGUN_MEMBERS_URL;

	// Step 1: Get list data
	const listMeta = await getURL(MAILGUN_LIST_URL);
	const memberCount = listMeta.list.members_count;

	// set up progress bar
	const progress = new ProgressBar({
		stopOnComplete: true,
		clearOnComplete: true,
	});
	progress.start(memberCount, 0);

	// Step 2: Fetch the members
	do {
		const memberData = await getURL(membersURL);
		members.push(...memberData.items);
		progress.increment(memberData.items.length);
		membersURL = memberData.paging.next;
	} while (members.length < memberCount);

	// Step 3: Write to file
	fs.writeFileSync("./members.json", JSON.stringify(members, null, 2), "utf8");
	console.log("Exported", members.length, "members to members.json");
})();
