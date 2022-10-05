.DEFAULT_GOAL := build

lint:
	node_modules/.bin/standard --fix src

test: lint
	NODE_OPTIONS=--experimental-vm-modules node_modules/.bin/jest src

clean:
	rm -Rf ./dist

build: test clean
	./node_modules/.bin/unbuild

release:
	node_modules/.bin/standard-version
