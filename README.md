# gulp-powered

A Client-side Gulp build, Bootstrap-v4 powered static website app starter-kit project

## Getting Started

Whenever you think about building a soft-depended static web app project, just use this kit to start developing on it. This boilerplate-like project is completely free-to-use for your public projects.  

These instructions below will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### What is going on?

When you install this project, it starts to build immediately by Gulp. Afterwards, there will be rendered files/folders inside the /dist directory. The web page you see, comes from only /dist folder and derivatives.

### Prerequisites

What things you need to install the software and how to install them:

```
- [nodejs & npm] (https://nodejs.org/en/)
- [gulp] (https://gulpjs.com/)
```

### Preparing

If you have already installed the packages above skip this part.
If you don't have packages above, follow instructions below:

1- Download nodejs + npm bundle from [here] ()
```
2- npm install gulp-cli -g
3- npm install gulp -D
```

### Installing & Running

# Running with Browsersync web server
```
1- npm install gulp-powered
2- npm -i
3- gulp
```

or

```
npm install gulp-powered && npm -i && gulp
```
# Running with live-server or other (configure port and mounting) web servers
```
1- $ npm install gulp-powered && npm -i
2- # change DIR as 'protocol + dev + dist' instead of 'protocol + dev' in 'src/partials/main.html' / line:7
3- $ live-server --port=3000 --open=/dist
```
Now it must be running on localhost

## Built With

* [Gulp](https://gulpjs.com) - Gulp: toolkit for automating painful or time-consuming tasks in your development workflow

## Contributing

* Currently there is no external contribution.

## Versioning
* 1.0.0 - Initial Release

## Authors

* **@cagcak** - *Gulp Starter Kit with Bootstrap v4* - [cagcak](https://github.com/cagcak)


## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/cagcak/gulp-powered/blob/master/LICENSE) file for details
