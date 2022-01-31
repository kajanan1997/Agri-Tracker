import auth from "../auth/auth-helper";

const bookmark = {
    itemTotal() {
        if (typeof window !== "undefined") {
            if (localStorage.getItem('bookmark'+auth.isAuthenticated().user._id)) {
                return Object.keys(JSON.parse(localStorage.getItem('bookmark'+auth.isAuthenticated().user._id))).length
            }
        }
        return 0
    },
    addItem(item) {
        let cart = {}
        console.log(item)
        if (typeof window !== "undefined") {
            if (localStorage.getItem('bookmark'+auth.isAuthenticated().user._id)) {
                cart = JSON.parse(localStorage.getItem('bookmark'+auth.isAuthenticated().user._id))
            }
            cart[item._id] = {
                ...item
            }
            localStorage.setItem('bookmark'+auth.isAuthenticated().user._id, JSON.stringify(cart))

        }
    },
    updateStore(itemIndex, quantity) {
        let cart = {}
        if (typeof window !== "undefined") {
            if (localStorage.getItem('bookmark'+auth.isAuthenticated().user._id)) {
                cart = JSON.parse(localStorage.getItem('bookmark'+auth.isAuthenticated().user._id))
            }
            cart[itemIndex].quantity = quantity
            localStorage.setItem('bookmark', JSON.stringify(cart))
        }
    },
    getStore() {
        if (typeof window !== "undefined") {
            if (localStorage.getItem('bookmark'+auth.isAuthenticated().user._id)) {
                return JSON.parse(localStorage.getItem('bookmark'+auth.isAuthenticated().user._id))
            }
        }
        return {}
    },
    checkPresent(id) {
        let store = {}
        if (typeof window !== "undefined") {
            if (localStorage.getItem('bookmark'+auth.isAuthenticated().user._id)) {
                store = JSON.parse(localStorage.getItem('bookmark'+auth.isAuthenticated().user._id))
            }
            return Object.keys(store).indexOf(id) >= 0
        }
        return false
    },
    removeItem(itemId) {
        let cart = {}
        if (typeof window !== "undefined") {
            if (localStorage.getItem('bookmark'+auth.isAuthenticated().user._id)) {
                cart = JSON.parse(localStorage.getItem('bookmark'+auth.isAuthenticated().user._id))
            }
            delete cart[itemId]
            localStorage.setItem('bookmark'+auth.isAuthenticated().user._id, JSON.stringify(cart))
        }
        return cart
    },
    emptyStore() {
        if (typeof window !== "undefined") {
            localStorage.removeItem('bookmark'+auth.isAuthenticated().user._id)

        }
    }
}

export default bookmark