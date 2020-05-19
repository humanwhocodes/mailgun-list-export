# Mailgun List Export

by [Nicholas C. Zakas](https://humanwhocodes.com)

If you find this useful, please consider supporting my work with a [donation](https://humanwhocodes.com/donate).

## Description

A simple command-line utility to download all of the members of a [Mailgun](https://mailgun.com) email list. Mailgun itself doesn't provide this ability and the API limits members returned to 100 per call. This utility uses calls the Mailgun API repeatedly to download all of the members of an email list.

## Required: Mailgun API Key

In order to use this utility, you must have a [Mailgun API key](https://help.mailgun.com/hc/en-us/articles/203380100-Where-can-I-find-my-API-key-and-SMTP-credentials-) and that key must be stored in an [environment variable](https://linuxize.com/post/how-to-set-and-list-environment-variables-in-linux/) called `MAILGUN_AUTH_KEY`.

## Global Installation and Usage

Install globally using [npm][npm] or [yarn][yarn]:

```
npm install @humanwhocodes/mailgun-list-export -g

# or

yarn global add @humanwhocodes/mailgun-list-export
```

You can then run this utility by passing in the name of the mailing list:

```
$ mailgun-list-export my-list-name@example.com
```

The complete member list will be downloaded into a file called `members.json` in the current working directory.

## Local Installation and Usage

You can also install the utility locally using [npm][npm] or [yarn][yarn]:

```
npm install @humanwhocodes/mailgun-list-export --save-dev

# or

yarn add @humanwhocodes/mailgun-list-export -D
```

You can then run this utility with npx by passing in the name of the mailing list:

```
$ npx mailgun-list-export my-list-name@example.com
```

The complete member list will be downloaded into a file called `members.json` in the current working directory.

## Copyright and License

Copyright Human Who Codes LLC. Apache 2.0 license.

[npm]: https://npmjs.com/
[yarn]: https://yarnpkg.com/
