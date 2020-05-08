const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

const axios = require("axios");

const readUsername = () => {
    readline.question("Enter your GitHub username: ", username => {
        axios.get("https://api.github.com/users/" + username)
            .then(response => {
                const profile = response.data;
                readline.question("Enter the title of your project: ", title => {
                    readline.question("Enter Description", description =>{

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
