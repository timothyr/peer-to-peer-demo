# Peer to Peer demo

Uses PeerJS to communicate between different browsers using WebRTC. 

## Getting Started

This demo was built using the [Angular6 Prerender Starter](https://github.com/timothyr/angular6-prerender-starter)

### Installation
* `npm install` or `yarn`

### Development (Client-side only rendering)
* run `npm run start` which will start `ng serve`

### Production (Pre-rendering locally)
**`npm run build:prerender && npm run serve:prerender`** - Compiles your application and prerenders your applications files, spinning up a demo http-server so you can view it on `http://localhost:8080`
**Note**: To deploy your static site to a static hosting platform you will have to deploy the `dist/browser` folder, rather than the usual `dist`