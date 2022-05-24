.DEFAULT_GOAL := build

typings:
	npx -p typescript tsc src/*.js --declaration --allowJs --emitDeclarationOnly --outDir dist

compile:
	npx babel src -d dist

commit:
	git diff --exit-code || git commit -am "Updating build"

changelog:
	github_changelog_generator --user compwright --project axios-oauth-client && git add CHANGELOG.md && git commit -am "Updating changelog"
	git push origin

lint:
	npx semistandard src/*.js src/**/*.js tests/*.js tests/**/*.js --fix

test: lint
	npx nyc mocha tests/ --timeout 10000

build: test compile typings commit

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
