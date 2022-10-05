.DEFAULT_GOAL := build

lint:
	node_modules/.bin/standard src/*.js src/**/*.js tests/*.js tests/**/*.js --fix

test: lint
	NODE_OPTIONS=--experimental-vm-modules node_modules/.bin/jest

clean:
	rm -Rf ./dist

build: test clean
	./node_modules/.bin/unbuild

commit:
	git diff --exit-code || git commit -am "Updating build"

changelog:
	github_changelog_generator --user compwright --project axios-oauth-client && git add CHANGELOG.md && git commit -am "Updating changelog"
	git push origin

release-pre: build
	npm version prerelease && npm publish --tag pre
	git push origin --tags

release-patch: build
	npm version patch && npm publish
	git push origin --tags

release-minor: build
	npm version minor && npm publish
	git push origin --tags

release-major: build
	npm version major && npm publish
	git push origin --tags
