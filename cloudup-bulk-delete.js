/**
 * Script to delete all media items in your Cloudup account.
 *
 * How to use:
 * 1. Log into cloudup.com in a browser
 * 2. Make sure you're on the https://cloudup.com/dashboard page
 * 3. Open the browser console, paste in this entire script and hit <Enter>
 * 4. Leave browser tab open. Updates will be logged to the console.
 * 
 * If the script fails at any point, repeat steps 2-4 until all items
 * have been deleted.
 */
(function() {
    let totalItems      = 0
    let totalDeleted    = 0
    let currentItem     = null
    let collectionsList = null

    const printKickoffMessages = () => {
        totalItems = parseInt( collectionsList.getAttribute('count') )

        console.log('🚀 Kicking off the Cloudup bulk delete script.')
        console.log(`👀 Looks like you have ${totalItems} items to be deleted.`)
        totalItems > 0 && console.log('🏎 Let\'s roll!')
    }

    const printKickoffErrorMessage = () =>
        console.log('🤷‍ Unable to find the list of media items. Please make sure you\'re logged in and on the https://cloudup.com/dashboard page.')

    const updateCurrentItem = () => {
        const nextItem = collectionsList.querySelector('.col')

        // Make sure the next item has an ID and is not merely a placeholder.
        currentItem = nextItem && nextItem.id ? nextItem : null
    }

    const clickElement = (id, selector, elementType, timeoutDuration) => {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector)
        
            if (!element) {
                reject(`🚫 Unable to click ${elementType} for item ${id} – skipping.`)
            }
    
            element.click()

            // Resolve after a delay to give the browser time to process this action.
            setTimeout( () => resolve(true), timeoutDuration)
        })
    }

    const clickItemThumbnail = id => clickElement(id, '.thumb-item', 'thumbnail', 1000)
    const clickDeleteLink    = id => clickElement(id, '.delete', '"Delete" link', 50)
    const clickDeleteConfirm = id => clickElement(id, 'form[method="delete"] button', '"Delete" confirmation button', 50)

    const clickCloseLink = () => {
        return new Promise((resolve, reject) => {
            const closeLink = document.querySelector('.options .close')

            if (!closeLink) resolve(true)

            // Sometimes a few clicks are required to close the modal.
            closeLink.click()
            closeLink.click()
            closeLink.click()

            // Resolve after a delay to give the browser time to process this action.
            setTimeout( () => resolve(true), 500)
        })
    }

    // Scroll page to trigger infinite scroll functionality & loading of more items.
    const scrollPage = () => {
        return new Promise(resolve => {
            scroll(0, 100)

            setTimeout( ()  => {
                scroll(0, -100)
                resolve(true)
            }, 500)
        })
    }

    const logSuccessfulDeletion = id => console.log(`🗑 Item ${id} was deleted successfully.`)

    const incrementTotal = () => totalDeleted++

    const bulkDeleteItems = async () => {
        collectionsList = document.querySelector('.collections-list')

        if (!collectionsList) {
            printKickoffErrorMessage()
            return // Bail early if we have no media items.
        }

        printKickoffMessages()
        updateCurrentItem()

        while(currentItem) {
            try {
                await clickCloseLink()
                await clickItemThumbnail(currentItem.id)
                await clickDeleteLink(currentItem.id)
                await clickDeleteConfirm(currentItem.id)
                await clickCloseLink()
                await scrollPage()
                logSuccessfulDeletion(currentItem.id)
                incrementTotal()
            } catch(error) {
                console.log(error)
            }

            updateCurrentItem()
        }

        console.log(`✅ Reached end of script. ${totalDeleted} out of ${totalItems} items were deleted.`)
        clickCloseLink()
    }

    bulkDeleteItems()
})()