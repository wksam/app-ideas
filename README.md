# JSON2CSV

**Tier:** 1-Beginner

Developers and end users are both experts in their own domains and as such, 
each speaks using a domain-specific language and terminology. This also extends
to the tools used to manipulate data. Developers have found JSON to be a
universally accepted method for transferring data between applications. End
Users, on the other hand, rely on spreadsheets to organize and analyze data.

The objective of JSON2CSV is to help bridge the gap between JSON and CSV by
converting JSON to CSV to make it easier to review data in a spreadsheet. It
allows the user to paste JSON into a text box to generate its equivalent CSV.

### Constraints ###

- You may not use any libraries or packages designed to perform this type of
conversion.
- If you choose to implement this in JavaScript don't use complicated looping
in your first implementation. Instead, use `Object.keys()` and `Object.values`
to generate CSV for the header and data rows.
- Nested JSON structures are not supported.

## User Stories

-   [x] User can paste JSON syntax into a text box
-   [x] User can click a 'Convert' button to validate the JSON text box and convert it to CSV
-   [x] User can see the converted CSV in another text box
-   [x] User can see an warning message if the JSON text box is empty or if it doesn't contain valid JSON
-   [x] User can click a 'Clear' button to clear the contents of both the JSON and CSV text boxes.

## Bonus features

-   [ ] User can enter the path to the JSON file on the local file system in a text box
-   [x] User can click a 'Open' button to load file containing the JSON into the text box
-   [x] User can see a warning message if the JSON file is not found
-   [ ] User can enter the path the CSV file is to be saved to in a text box
-   [x] User can click a 'Save' button to save the CSV file to the local file system
-   [x] User can see a warning message if the CSV text box is empty or if the save operation failed.
-   [ ] User can convert CSV data to JSON. See [CSV2JSON](./CSV2JSON-App.md)

## Useful links and resources

- [Comma Separated Values (CSV)](https://en.wikipedia.org/wiki/Comma-separated_values)
- [JavaScript Object Notation (JSON)](https://www.json.org/)
- [MDN Javascript Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [Saving a file with pure JS](https://codepen.io/davidelrizzo/pen/cxsGb)
- [Reading files in Javascript](https://codepen.io/jduprey/details/xbale)

## Example projects

Try to complete your JSON2CSV implementation before reviewing the example
project(s).

- [JSON to CSV Converter](https://codepen.io/JFarrow/pen/umjGF)
- [JSV Converter](https://gpaiva00.github.io/json-csv)

# CSV2JSON

**Tier:** 1-Beginner

In the [JSON2CSV](./JSON2CSV-App.md) application you translated JSON 
to a comma separated value (CSV) format. The objective of CSV2JSON is to 
reverse that process by converting a block of CSV text to JSON.

In CSV2JSON you'll start by copying the JSON2CSV app you created and then
modify it to allow CSV to JSON conversion as well the JSON to CSV conversion
that's already present. In additional to providing a useful function, this
challenge will also give you practice in modifying existing applications to
add new functionality.

### Constraints ###

- Read the user stories below carefully. Some of the functionality created
for JSON2CSV will need to be modified.
- You may not use any libraries or packages designed to perform this type of
conversion.
- Nested JSON structures are not supported.

## User Stories

-   [ ] User can paste CSV syntax into a text box
-   [ ] User can click a 'Convert to JSON' button to validate the CSV text box and convert it to JSON
-   [ ] User can see an warning message if the CSV text box is empty or if it doesn't contain valid CSV
-   [ ] User can see the converted CSV in the JSON text box

### Stories already implemented in JSON2CSV 
-   [ ] User can paste JSON syntax into a text box
-   [ ] User can click a 'Convert to CSV' button to validate the JSON text box and convert it to CSV
-   [ ] User can see an warning message if the JSON text box is empty or if it doesn't contain valid JSON
-   [ ] User can click a 'Clear' button to clear the contents of both the JSON and CSV text boxes.

## Bonus features

-   [ ] User can enter the path to the CSV file on the local file system in a text box
-   [ ] User can click a 'Open CSV' button to load file containing the CSV into the text box
-   [ ] User can see a warning message if the CSV file is not found
-   [ ] User can click a 'Save CSV' button to save the CSV file to the file entered in the same text box used for opening the CSV file
-   [ ] User can see a warning message if the CSV text box is empty or if the save operation failed.
-   [ ] User can enter the path to the JSON file on the local file system in a text box
-   [ ] User can click a 'Open JSON' button to load file containing the JSON into the text box
-   [ ] User can see a warning message if the JSON file is not found
-   [ ] User can click a 'Save JSON' button to save the JSON file to the  file entered in the same text box used for opening the JSON file
-   [ ] User can see a warning message if the JSON text box is empty or if the save operation failed.

## Useful links and resources

- [Comma Separated Values (CSV)](https://en.wikipedia.org/wiki/Comma-separated_values)
- [JavaScript Object Notation (JSON)](https://www.json.org/)
- [Saving a file with pure JS](https://codepen.io/davidelrizzo/pen/cxsGb)
- [Reading files in Javascript](https://codepen.io/jduprey/details/xbale)

## Example projects

- [CSV to JSON Converter](https://codepen.io/JFarrow/pen/CAwyo)
- [JSV Converter](https://gpaiva00.github.io/json-csv)

by [App Ideas](https://github.com/florinpop17)