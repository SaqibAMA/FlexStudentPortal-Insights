load()

function load() {
    preload();
    let tabs = document.getElementsByClassName("nav-item m-tabs__item");
    // when any tab is clicked, console.log the tab's id
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", function () {
            preload();
        });
    }

}

function preload() {
    // extract the semid from the url
    let semid = window.location.href.split("=")[1];

    // for every tab-pane
    let tabPanes = document.getElementsByClassName("tab-pane");
    for (let i = 0; i < tabPanes.length; i++) {
        let innerHTML = tabPanes[i].innerHTML;
        let startIndex = innerHTML.indexOf("ftn_calculateMarks(");
        let endIndex = innerHTML.indexOf(");", startIndex);
        let substring = innerHTML.substring(startIndex, endIndex);
        let tabPaneID = parseInt(substring.replace("ftn_calculateMarks(", "").replaceAll("'", ""));

        // remove any button with id "get-insights-${tabPaneID}"
        let prevButton = document.getElementById(`get-insights-${tabPaneID}`);
        if (prevButton) {
            prevButton.remove();
        }

        // if previous insights exist, remove them
        let prevInsights = document.getElementsByClassName("insights")[0];
        if (prevInsights) {
            prevInsights.remove();
        }

        // prepend a button to the tab-pane called "Get Insights"
        tabPanes[i].innerHTML = `<button class="btn btn-primary" id="get-insights-${tabPaneID}" style="margin-bottom: 2rem">Get Insights</button>` + tabPanes[i].innerHTML;

        // add an event listener to the button
        let button = document.getElementById(`get-insights-${tabPaneID}`);
        button.addEventListener("click", function () {
                
                $.ajax
                    ({
                        type: "POST",
                        url: "../Student/GetClassAvg",
                        data: {
                            CourseId: tabPaneID, // nlp - 2034, is - 1472, pp - 1483, ir - 1932
                            SemID: semid
                        },
                        success: function (data) {
    
                            // remove any div with class name "insights"
                            let insights = document.getElementsByClassName("insights")[0];
                            if (insights) {
                                insights.remove();
                            }
    
                            let userInsights = data[0];
                            tabPanes[i].innerHTML = `
                                <div class="insights" style="margin-bottom: 2rem">
                                    <h5 style="margin-bottom: 1rem">Insights</h5>
                                    <p>Class Average: ${userInsights.CLASS_AVG}</p>
                                    <p>Class Minimum: ${userInsights.CLASS_MIN}</p>
                                    <p>Class Maximum: ${userInsights.CLASS_MAX}</p>
                                    <p>Class Standard Deviation: ${userInsights.CLASS_STD}</p>
                                    <p>Grand Total: ${userInsights.TOT_WEIGHT}</p>
                                </div>
                            ` + tabPanes[i].innerHTML;

                        }
                        
                    });

        });

    }
}
