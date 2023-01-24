# React + TS External Components For Content Hub

This is a template example to use when building a solution for managing external components

## Installation

npm install

## Usage

### Build your dist specific components feature
npm run build --component=ComponentFolderName 

### Watch build while developing
npm run watch --component=ComponentFolderName 

### Run you dev server
npm run dev --component=ComponentFolderName

### How to test in Content Hub

1. Go to page and create external component
2. Edit the component select "From Path"
3. Paste dev server url in box (E.g https://localhost:5173/dist/entitydetails.js)
4. Save and navigate to the page with external component

If you need to do changes, you will need to stop the server, run the build, and run server again.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)