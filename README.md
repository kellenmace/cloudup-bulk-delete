# Cloudup Bulk Delete
This is a script that can be run in your browser to bulk delete all the media items in your Cloudup account. Since Cloudup doesn't offer a bulk delete feature, this script basically automates the process of deleting them one-by-one from the web interface. Specifically, it loops through each media item and:
1. Clicks its thumbnail to open the single media item view
1. Clicks the "Delete" link for that item
1. Clicks the "Delete" confirmation button for that item
1. Returns to the main Dashboard page

This process is a bit clunky and you may need to run the script a couple times, but it does the job.

## How to Use

 1. Log into [Cloudup](https://cloudup.com/) in a browser
 1. Make sure you're on the https://cloudup.com/dashboard page.
 1. Open the browser console, paste in the entire contents of the `cloudup-bulk-delete.js` file and hit `Enter`.
 1. Leave browser tab open and let it run. Updates will be logged to the console.
 
If the script fails at any point, reload the browser tab and repeat steps 2-4 until all items have been deleted.
