# Image Gallery
A minimalist image gallery made with NextJS, with both client and server versions.

## About
More info coming soon.

## Commands
`npm install` - Install necessary dependencies for the project to run  
`npm run dev` - Generate thumbnails and start the local development server  
`npm run build` - Generate thumbnails and build the project for production (server version)  
`npm run export` - (_Not supported yet_) Build the project for static-file deployment (client-only version)  
`npm run thumbs` - Generate image thumbnails (can be used while dev server is running)  

## Gallery Config
Use the `gallery-config.json` file in the project root to configure the image gallery.

Available options:
`public` - Whether the sourceDir path is relative to the "public" folder (used for client-only builds)  
`sourceDir` - The source directory where images are located (can be an absolute or relative path)  
`fileTypes` - An array of file extensions to allow  
