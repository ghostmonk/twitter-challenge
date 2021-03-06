## Twitter Challenge

A front-end with standards compliant, asynchronous, API driven, beauteous JavaScript, HTML and CSS.
The complete application can be found at https://appdirect-twitter-challenge.herokuapp.com.

##Node and npm

This project is built using node and npm.  
At the time of writing, I used the most current and stable version of node.

npm 3.8.6  
node v6.1.0

##Backbone and Underscore

Almost all javascript developers have used underscore, but unfortunately I had no experience with backbone.  
I spent some time researching and playing with the framework for this project.   
It was very enjoyable, and time well spent.

## Angular

After doing a little research on backbone, I didn't find a lot, outside of underscore, for structuring an application.  
Therefore I decided to pull in angular to allow some sensible organization of the files.  
I considered creating something custom, but I enjoyed the opportunity of brushing up on Angular.  
This, of course, will make the application a little bigger, but programming is a series of trade offs.  

## Gulp build

The following command will list all available commands.  

```gulp help```  

However, only the following commands will be of interest.

- To run application without minification.  
```gulp run-dev```  

- To run application from the src folder  
```gulp run-src```  


- To build application for dev.  
```gulp build-dev```  


- To run application with minification.  
```gulp run-release```  


- To build application for release.  
```gulp build-release```  


## Twitter Proxy Server

The twitter proxy service is installed on Heroku at https://gm-twitter-proxy.herokuapp.com.

## Launch the application

```npm install```  
```npm start```  

## Bower

I use Bower for all of the client-side libraries. There is a postinstall target 
defined in the package.json, so bower install should be run automatically on npm install.

## Known Issues

* Rendering is not good in ie.
* Broke nodemon
* There is no error view

## Thanks for the Opportunity

Whatever ever happens in the near future, I want to thank you for the opportunity. 
I had a great time building this application.
I look forward to receiving feedback.

