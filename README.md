# How to run code TheCocktailUI

Before running this project you must have at least `10.1.4` version of angular-cli and node `12.18.0` in your system. If you have installed above you must follow below steps to run the project.

Step 1: Download project using `Download ZIP`. System would download the zip file with named `theCocktailUI-main`.

Step 2: Extract above zip file and then go to the extracted folder (theCocktailUI-main) using command prompt. 

Step 3: Hit the command `npm install` in your 'cmd' on above project location. This will install all required dependency to the project. Make sure you are on correct project location and have good internet connection.

Step 4: After completion of above step hit the next command `ng serve`. This will compile the code and run it on `http://localhost:4200/`. Hit this url in your browser then.


# How to use the Application
After successfull running of code. You will see the project UI.

UI is divided in to two main part first is `toolbar` and second is `tabular informaion of drinks`.

Toolbar is divided into 3 parts. 

First is`filter part` where you can filter your drinks on the selection of given dropdown filters. All the data in to the dropdown is dynamic.

Second is `i am feeling lucky` here you can get a random drink by simply click on this button.

Third is `Search part` here you can select a appropriate radio button for searching a drink.

All the results related to filter/search will be visible in table. You can sort the information by clicking its header.

If application shows error `Server or Internet problem` means Api call is getting complete due to either API server failure or low/no internet connectivity.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


