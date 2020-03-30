# Next-graphql-pwa

A Hacker News Clone pwa app built with next.js, react and apollo-graphql.

## About this project

I wanna use next.js and apollo-graphql together, so I created this project.

### Implementation pages

except `/front`, `/login`, `/from`, `/hide`, `/upvote` and `reply` (HackerNews does not provide API), others pages have been implemented.

[Live demo](https://next-gql-hnpwa.now.sh/)

## Built With

- [react.js](https://reactjs.org/)
- [next.js](https://rometools.github.io/rome/) - The react framework used
- [styled-components](http://www.dropwizard.io/1.0.2/docs/) - CSS-in-JS styling framework
- [apollo-GraphQL](https://www.apollographql.com/) - Implementation of GraphQL that can transfer data between server and client
- [pwa](https://github.com/hanford/next-offline) - Offline support with next-offline
- [prettier](https://prettier.io/) - Auto format code with commit hooks
- [typescript](https://www.typescriptlang.org/) - typed superset of JavaScript
- [eslint](https://eslint.org/) - The linter rules I used are maintained by create-react-app

### Development

First, clone this repo into your computer

```
$ git clone https://github.com/FalloutChonny/next-gql-pwa.git
```

Install the dependency

```
$ yarn install

// or use npm

$ npm install
```

Launch app after Installation is complete

```
$ yarn run dev
```

## The Production Build

First, build the app

```
yarn run build
```

Launch app after build successfully

```
yarn run start
```

## Deployment

This project uses `now` as the deployment tool and platform, it's very easy to use.

```
$ yarn add global now

// or

$ npm install -g now
```

And just run

```
$ now
```

## Authors

- **Chonny Chu** - _Initial work_ - [ChonnyChu](https://github.com/FalloutChonny)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hacker News
