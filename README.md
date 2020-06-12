# CSS Coverage Tool

This simple program was created to extract used CSS from routes / urls.

## How to use

* Create a file called *routes.txt* in the root folder, put an route/url in each line. 

* Run `npm start` to compile the code.

* Run `node dist/dev/index.js` - this creates the file *dist/all.css*

* Run `npm run build` to create a minified + optimized css file.