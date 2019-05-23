all:
	/usr/local/bin/node bin/get_all_amounts.js
	/usr/local/bin/node bin/donation_total.js  | tee data/total.json
