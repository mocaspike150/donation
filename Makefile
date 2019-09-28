update: git_config pull build
	git add _data data
	git commit -m 'update by Makefile' | true
	git push -u https://ontouchstart:${GITHUB_TOKEN}@github.com/mocaspike150/donation master

git_config:
	git config --global user.email "ontouchstart@gmail.com"
	git config --global user.name "Sam Liu"

pull:
	git checkout master
	git pull

build:
	node bin/get_all_amounts.js
	node bin/donation_total.js  | tee data/total.json
	node bin/total.js runners | tee data/runners.json
	node bin/total.js clubs | tee data/clubs.json 
	node bin/donation_total.js  | tee data/total.json
