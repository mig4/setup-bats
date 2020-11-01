[![tag-badge][]]() [![CI][ci-badge]][ci-target]

# Setup BATS 🦇

A :octocat: GitHub Action to setup [BATS testing framework][bats].

## Usage 🚀

A sample workflow to run tests using [BATS][] (`.github/workflows/ci.yml`):

``` yaml
name: "CI"
on: [push, pull_request]
jobs:
  build:
    name: build
    runs-on: ubuntu-latest
    steps:

      - name: Setup BATS
        uses: mig4/setup-bats@v1
        with:
          bats-version: 1.2.1

      - name: Check out code
        uses: actions/checkout@v1

      - name: Test
        run: bats -r .
```

### Options 🎨

Options available as keys in `with` block

- `bats-version` (`string`): version of [BATS][] to setup, defaults to 1.2.1 if
  not set

## Platforms 🖥

So far this action has only been tested on Linux [environments](https://help.github.com/en/articles/virtual-environments-for-github-actions#supported-virtual-environments-and-hardware-resources).

## Contributing 🤝

See known [issues](https://github.com/mig4/setup-bats/issues), if you found
one that's not on the list or have a suggestion for improvement, open a new
issue. If you can, fork and send a PR, it will be appreciated 💖.

### Hacking 🧰

#### Building

Install the dependencies  

``` bash
$ npm install
```

Build the typescript, apply formatting, lint and package the code for
distribution and run unit tests:

```bash
$ npm run all
```

Run the tests separately :heavy_check_mark:  

```bash
$ npm test
...
 PASS  __tests__/installer.test.ts
  installer tests
    ✓ Acquires version of BATS if no matching version is installed (1051ms)
    ✓ Throws if no matching version of BATS can be found (674ms)
```

#### Code

The `action.yml` file defines the inputs and output, description, etc. of the
action.

See the documentation:

- [Metadata syntax](https://help.github.com/en/articles/metadata-syntax-for-github-actions)
- [Toolkit](https://github.com/actions/toolkit/blob/master/README.md#packages)

#### Publishing to a distribution branch

Actions are run from GitHub repos so the branch which will be used at runtime
needs to have the `dist/` folder checked-in. It's recommended for users to only
refer to released versions instead of consuming master directly.

The distribution is created with [ncc](https://github.com/zeit/ncc) which can
be invoked via:

``` bash
$ npm run package
$ git add dist
$ git commit -a -m "prod package"
```

Now to release a new minor/patch versions (replace `.x.y` as appropriate):

``` bash
# update "version" property in `package.json`
$ npm install
$ npm run all
$ git add -A
$ git commit -v -m "Release v1.x.y"
$ git push
$ git tag -s v1.x.y
$ git tag -fs v1 -m "Update v1 tag"
$ git push --tags --force
```

For the tag to be published to marketplace you need to create a release from
it which you can do by going into _Releases_ in GitHub UI, then _Tags_ and
clicking the menu next to the newly created tag and select _Create release_.
Alternatively use the URL (replace `x.y` as appropriate):
https://github.com/mig4/setup-bats/releases/new?tag=v1.x.y

The action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Acknowledgements 👍

* [typescript-action](https://github.com/actions/typescript-action) template
* [existing setup actions](https://github.com/actions?utf8=%E2%9C%93&q=setup&type=&language=)

## License 📝

[![license-badge][]](LICENSE)


[tag-badge]: https://img.shields.io/github/v/tag/mig4/setup-bats
[ci-badge]: https://github.com/mig4/setup-bats/workflows/CI/badge.svg
[ci-target]: https://github.com/mig4/setup-bats/actions?workflow=CI
[bats]: https://github.com/bats-core/bats-core
[license-badge]: https://img.shields.io/github/license/mig4/setup-bats?style=for-the-badge
