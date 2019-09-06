NODE=`which node`
all:
	git pull
	$(NODE) bin/get_all_amounts.js
	$(NODE) bin/donation_total.js  | tee data/total.json
	$(NODE) bin/total.js runners | tee data/runners.json
	$(NODE) bin/total.js clubs | tee data/clubs.json 
	$(NODE) bin/donation_total.js  | tee data/total.json
	git add .
	git commit -m 'upate by Makefile' | true
	git push
