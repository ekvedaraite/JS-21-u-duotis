let data = []
const API_URL = "https://sophisticated-humane-dandelion.glitch.me"
const productsElement = document.querySelector(".products")

const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${API_URL}/${productId}`, {
            method: "DELETE",
        })

        if (response.ok) {
            alert("Product successfully deleted!")
            setTimeout(() => {
                updateDataAfterDelete(productId)
                window.location.href = "index.html"
            }, 100)
        } else {
            console.error("Error deleting product:", response.statusText)
        }
    } catch (error) {
        console.error("Error deleting product:", error)
    }
}

const updateDataAfterDelete = (deletedProductId) => {
    data = data.filter(product => product.id !== deletedProductId)
}

const updateProductsList = () => {
    productsElement.innerHTML = ""

    data.forEach(product => {
        const productElement = document.createElement("div")
        productElement.classList.add("product")

        productElement.innerHTML = `
            <img src="${product.image}" alt="">
            <p>${product.title}</p>
            <h1>€${product.price.toFixed(2)}</h1>
            <button class="deleteButton" data-id="${product.id}">Ištrinti</button>
        `

        const deleteButton = productElement.querySelector(".deleteButton")
        deleteButton.addEventListener("click", () => {
            const productId = deleteButton.getAttribute("data-id")
            deleteProduct(productId)
        })

        productsElement.appendChild(productElement)
    })
}
const loadData = async () => {
    try {
        const response = await fetch(API_URL)
        data = await response.json()

        updateProductsList()
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}

loadData()
