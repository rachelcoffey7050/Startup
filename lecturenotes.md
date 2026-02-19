# Intro Principles
## Jan 8: Intro
Introduced the project and learned about Git and GitHub.
Useful references include this helpful [guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) to writing in github.
## Jan 10: readings
Command line hints:
- echo - Output the parameters of the command
- cd - Change directory
- mkdir - Make directory
- rmdir - Remove directory
- rm - Remove file(s)
- mv - Move file(s)
- cp - Copy files
- ls - List files
- curl - Command line client URL browser
- grep - Regular expression search
- find - Find files
- top - View running processes with CPU and memory usage
- df - View disk statistics
- cat - Output the contents of a file
- less - Interactively output the contents of a file
- wc - Count the words in a file
- ps - View the currently running processes
- kill - Kill a currently running process
- sudo - Execute a command as a super user (admin)
- ssh - Create a secure shell on a remote computer
- scp - Securely copy files to a remote computer
- history - Show the history of commands
- ping - Check if a website is up
- tracert - Trace the connections to a website
- dig - Show the DNS information for a domain
- man - Look up a command in the manual
## Jan 13 - Development Environment
### History of the web

There was redundancy built in by the department of defense.

More computers in this classroom than on the internet in 1973.

The Web Father - Tim Berners-Lee. Sharing papers over the internet. Took TCP and DNS ideas and made the world wide web. 
stml from the publishing industry was adapted to html

Hakin Wium Lie thought html was ugly so he created CSS for styling and animation.
Go play with it! Revert back with git if you mess it up.

Brendan Eich - Javascript. Makes things interactive. "Always bet on JS." 

### Asking Questions
In order to succeed in this class, you need to know how to ask questions. Ask yourself first (use your brain), then Web/AI, Peers, TA, Instructor.
Guidelines for getting help:
- don't use anything you don't understand
- Ask AI to explain, _then rewrite it from scratch_
- Ask AI to critique your code

### Editors
*Look up how to do multiple select in VS Code
Console - navigates the disk, runs console applications, run scripts. (git bash)
vi/vim is on everyone's computers. Important to know.

# Server
Tech stack

## Jan 15
Upgrade to paid plan in AWS

### How does the internet work?
user, facilitator, website
Layers
- Application (HTTPS or SSH) - functionality like web browsing
- Transport (TCP/UDP) - packet delivery (make sure they get there and get there in order) UDP is fast (good for streaming), TCP will get everything correct
- Internet (IP) - Establishing connections, routing
- Link (Fiber, Hardware) physical connections

When you connect, you look up the IP address and it looks up address in domain name list. You are also talking to the webserver to actally get you to the correct address. 

Use nslookup (your website) to look for more info. And there is a command that starts with who, and dns

**Domain names:** subdomain.secondary.top. Root is secondary (sld) and top (tld). localhost (127.0.0.1) - talking to yourself.

DNS record type - basically you can control where things will take you
- A/AAAA - AAAA has a lot more than A. It brings you directly to the site.
- CNAME - an alias that brings you to something else before bringing you to an IP address.

Different organizations own the top level domain, and you are leasing from them

**Renting a Sever:** EC2 -> instances -> launch an instance. Name it something specific like byu-cs260-webserver. Follow the instructions. Make sure you are in N Virginia. 
network settings - allow SSH, allow traffic from the internet.

Caddy - looks at the request and decides where it should go. Set up for on port 4000 it goes to startup and port 3000 it goes to simon. TELL IT WHAT YOUR DOMAIN NAME IS. 'your domain name here'

HTTPS - you need a host name. But Caddy takes care of everything else for you. sudo service restart or something like that.

## Jan 27

### Responsive Design

CSS controls the entire layout. This needs to respond to different sizes/shapes of devices. So CSS was enhanced to be more responsive. 
- `<meta name="viewport" content="width+device-width, initial-scale=1"/>` this is in the head to keep it from auto adjusting
- `aside {float:right;}` making something just float on the right of the screen. It stays the same size as the screen size changes
- `display` Display none will hide the element.
  - Can also display as flex - flexible for children: grow (to satisfy the fr you specify), shrink, basis(ideal - could be pixels or a percent)
  - grid (you tell it how to organize children, specifically for boxes),
  - inline (won't resize),
  - block (fits screen), etc.
- `<div> class="card" </div>` - tag just tells you what it is so you can accesss it with the CSS.

**media queries**
```
@ media (orientation: portrait) {
  div {
    transform: rotate(270deg);
  }
}
```
So depending on the size it will have different properties.

Bootstrap
- import bootstrap CSS
- ` class ="btn btn-outline-primary"`
- you have to know the class you're importing, but other than that just import.
- Some of the bootstrap stuff requires javascript which requires an extra import.


## Jan 29

Build something that looks like a temple of God - make what you create greater than yourself.

### Javascript
Javascript is an interpreted language but every computer with a browser has a javascript interpreter. 
But we will need to install in interpreter so we can also run javascript on the server.

Javascript was made for client-side interactivity (rather than server side). Inspired by Scheme programming language which is a list oriented language.
It looks a little like C. 
Dynamically typed like python, so we don't have to declare all the types. If you want type annotations, use typescript.

First Program:
```
const msg = "Hello world";
const msg = new String(passedInString)

1 + 'cow' = '1cow'

console.log('Hello' + ' ' + "world")
document.body.innerText =
document.body.innerHTML = 
```
Javascript is a very forgiving language.
Console is an object with funtion log.
Functions are first order objects (so you can pass it directly into another function.
Document is the webpage. You can edit the text directly or edit the HTML.
Semi-colons are unnessesary, unless you want multiple statements on one line.

For each function - `words.forEach((word) => console.log(word));` This is an arrow function, which passes the function as a parameter.

Node JS - Javascript that runs on your computer (not brower). You will have to download. So you can run your backend code. 
Once you've installed, set a breakpoint, and debug with f5.

NPM - Node package manager - bring in packages from elsewhere.

## Feb 3 - React Basics

### Web Frameworks
React is for Javascript what bootstrap is for css.

JSX: Combines javascript and html. Evaluates the javascript to render the result. 
You need a transpiler (called Babel) that changes it into javascript function call which dynamically builds html in the DOM.

Components: a function. So you can have multiple of the same type of thing. 
```
const Hello = () => {
  return <div> Hello React</div>;}
```
Returns JSX. It injects the function inside the element selected as a child. 
You can pass a property to a component. You can pass in multiple, but only take out the ones you want.
You can also give a default value. 
It is asycronous, so the change happens out of your code. So by the end of your function, the change hasn't happened yet.

At the next deliverable, you will only have one html page, all that html code goes into the jsx files. You will inject the page with the correct property into the html.
vite will do what liveserver has been doing in the past.

## Feb 19
Browser rendering is single threaded. This means there is one thing going on and something finishes before it keeps going. 
So if a process is still running, you won't be able to change it/start another.
Forces people to write code that is very efficient. You need a way to execute big things off to the side, not in thread.

A callback is put on the web API stack. It is only put on the call stack/single thread when the rest executes. Tagged with `setTimeout`
Scheduling a timed event so that everything works responsivly. A Promise.

### Promises
'I promise that I will call you back when the work is done/has failed'. Promise is a javascript object. 

```
function callback(resolve) {
  resolve('done');
}
const p = new Promise(callback);
p.then((result => console.log(result));
```
Meaning: When the promise resolves I then want to call this function.

fetch - callback funtion internally. `fetch('url').then((r) => console.log(r))`
All the mechanics are inside the fetch function. Write promises using the fetch function.

then, catch (error), finally (executes whether or not it works)

### async/await
await turns everything after it into a then block. 
async. 
You can use the same catch/finally with an await block. 
