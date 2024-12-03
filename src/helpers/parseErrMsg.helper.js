export const parseErrorMessage = (responseHTMLString) => {
  
  const parser = new DOMParser();
  const responseDocument = parser.parseFromString(responseHTMLString, "text/html");
  const errorMessageElement = responseDocument.querySelector("pre");

  if (errorMessageElement) {
    // Extract the error message using regex
    const errorMessage = errorMessageElement.textContent.match(/^Error:\s*(.*?)(?=\s*at)/);
    if (errorMessage && errorMessage[1]) {
      return errorMessage[1].trim();
    }
  }

  return "Something went wrong 😕";
};
/*The regular expression matches a string that starts with "Error:", followed by any characters (non-greedy) 
until the first occurrence of "at" (indicating a stack trace).
The first element of the returned array (errorMessage[0]) is the entire matched string. The subsequent 
elements, if any, correspond to the captured groups within the regular expression. In our case, the first
captured group (errorMessage[1]) contains the specific error message we're interested in. */

//Searches the parsed HTML document for the first <pre> element. Often, error messages are displayed within <pre> tags in HTML responses.