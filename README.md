## Twitter Challenge

A front-end with standards compliant, asynchronous, API driven, beauteous JavaScript, HTML and CSS.

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
They should be self explanitory.

```gulp dev-run```  
```gulp dev-build```
```gulp release-run```  
```gulp release-build```

## Twitter Proxy Server

The twitter proxy service is installed on Heroku at https://gm-twitter-proxy.herokuapp.com.

### config.js

Before running the commands below, please ensure you add the necessary values to the 
twitter-proxy/config.js file. I did not commit these secrete values.

Do the following commands in order

```cd twitter-proxy```  
```npm install```  
```npm start```  

## Launch the application

Here are the steps for successfully running the application.
From the root directory run the following commands.

```npm install```  
```cd twitter-proxy```  
```npm install```  
```npm start```  

... at this point will have to open another terminal and cd back to the root dir.

To run application without minification.  
```gulp dev-run```

To run application with minification.  
```gulp release-run```

To build application for dev.  
```gulp dev-build```

To build application for release.  
```gulp release-build```

## Bower

I use Bower for all of the client-side libraries. There is a postinstall target 
defined in the package.json, so bower install should be run automatically on npm install.