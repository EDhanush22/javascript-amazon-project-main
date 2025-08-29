// To send Http message we use XMLhttpRequest class it is a built in class
const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

// listens or waits for an event,1st parameter event we want to listen or wait for,load means a response has loaded

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();

// When we send the request to the backend it takes time for the request to travel across the internet,so the response will be not available
// xhr.send() is an asynchronous code, we have to wait for the response 
// xhr.response // It is undefined
// we can send different messages we get different resonses,we can send request to different url paths
// a backend support a certain set of url paths


// Wrong url paths cause error
// we get error as response with status code
// Status code starts with 4 or 5 (400,404,500) - failed
// 4 means user problem, 5 means backends problem
// 2 means succeded

// How do we know which url paths are supported
// we can't say that some provide documentation and some don't
// The list of all url's are supported are called backend api
// API = application programming interface(interface means how we interact with ssomething)

// backend can respond with different type of data like text,JSON,HTML,image






// open takes two parameters 1.Type of HTTP message
// GET = get some information from backend
// The second parameter tells where to send the HTTP message
/* URL = Uniform Resource Locator
- Like an address,but for the computer
- Helps us locate another computer on the internet
Ex: https://amazon.com, s after http means using secure version of http,amazon.com says it is the domain name
*/
