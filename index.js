const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

const axios = require("axios");
const fs = require("fs");
const readUsername = () => {
    readline.question("Enter your GitHub username: ", username => {
        axios.get("https://api.github.com/users/" + username)
            .then(response => {
                const profile = response.data;
                readline.question("Enter the title of your project: ", title => {
                    readline.question("Enter Description: ", description =>{
                        readline.question("Enter project license: ", license =>{
                            readline.question("Enter command to install dependencies: ", dependencyCommand =>{
                                readline.question("Enter command to run test: ", testCommand =>{
                                    readline.question("What does the user need to know about using the repo? ", usage => {
                                        readline.question("What does the user need to know about contributing to the repo? ", contributing =>{
                                            let fileData = ""; 
                                            fileData += "# " + title +"\n\n\n";
                                            fileData += "## Description\n\n" + description + "\n\n";
                                            fileData += "## Table of Contents\n\n";
                                            fileData += "* [Installation](#installation)\n\n";   
                                            fileData += "* [Usage](#usage)\n\n";   
                                            fileData += "* [License](#license)\n\n";   
                                            fileData += "* [Contributing](#contributing)\n\n";   
                                            fileData += "* [Tests](#tests)\n\n";   
                                            fileData += "* [Questions](#questions)\n\n";   
                                            fileData += "## Installation\n\n```\n" + dependencyCommand + "\n```\n\n";
                                            fileData += "## Usage\n\n" + usage + "\n\n";
                                            fileData += "## License\n\nThis project is licensed under the " + license + " license.\n\n";
                                            fileData += "## Contributing\n\n" + contributing + "\n\n";
                                            fileData += "## Tests\n\n```\n" + testCommand + "\n```\n\n";
                                            fileData += "## Questions\n\n";
                                            fileData += "<img src=\""+ profile.avatar_url + "\" alt=\"avatar\" style=\"border-radius: 16px\" width=\"30\"/>\n\n";
                                            fileData += "If you have any questions, open an issue or contact [" + profile.login + "](" + profile.html_url + ") directly at " + profile.email + ".\n\n\n";
                                            fs.writeFile("README.md", fileData, err => {
                                                if(err){
                                                    console.log(error);
                                                }
                                                readline.close();
                                                process.exit();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            })
            .catch(error => {
                console.log("Could not find that user please try again.");
                readUsername();
            });
    });
};
readUsername();
