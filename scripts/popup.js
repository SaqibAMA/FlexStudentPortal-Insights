// code for extension

const FLEX_URL = "https://flexstudent.nu.edu.pk/Student/StudentMarks?semid="

// make a query to chrome api
chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
    // get the current tab
    let [currentTab] = tabs;
    // if current tab is a flex student page
    if (currentTab.url.includes(FLEX_URL)) {
        // extract the semid from the url
        let semid = currentTab.url.split("=")[1];

        // access the user-on-url element
        let userOnUrl = document.getElementsByClassName("user-on-url")[0];
        userOnUrl.classList.remove("d-none");

        // access the user-not-on-url element
        let userNotOnUrl = document.getElementsByClassName("user-not-on-url")[0];
        userNotOnUrl.classList.add("d-none");
    }
});