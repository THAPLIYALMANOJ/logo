# Repo for Propeller Labs logo

## Project structure
| Folder            | Description |
| ----------------- | ----------- |
| `src`             | Source resources often in file format not fit for deployment |
| `src/art`         | Art assets.  SVG files in this folder are actually in Inkscape format and should be exported as plain SVG before using |
| `dist`            | Distribution assets |
| `dist/icons`      | Icons |
| `demo`            | Various demos |
| `demo/animated1`  | Demo using D3 to transform and animate logo |

## Running demos 
The demos need to be served from a web-server as they load SVG files.  Run: 
1. `npm install -g http-server`
2. `http-sever` from the demo folder.