## Description

Projects using react, react-router, mobx, antd, electron using typescript.
modified based on https://github.com/electron-react-boilerplate/electron-react-boilerplate.git

## Install

First, clone the repo via git:

```bash
git clone master hhttps://github.com/lixinxiaobai/electron-ts-admin.git your-project-name
```

And then install the dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```

## Run

Start the app in the `dev` environment.

```bash
$ yarn dev
```

If you don't need autofocus when your files was changed, then run `dev` with env `START_MINIMIZED=true`:

```bash
$ START_MINIMIZED=true yarn dev
```

## Packaging

To package apps for the local platform:

```bash
$ yarn package
```

To package apps for all platforms:

```bash
$ yarn package-all
```

To package apps with options:

```bash
$ yarn package --[option]
```
