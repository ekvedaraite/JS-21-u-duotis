const API_URL = "https://sophisticated-humane-dandelion.glitch.me"
const addProductForm = document.getElementById("addProductForm")

addProductForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const title = document.getElementById("title").value
    const priceInput = document.getElementById("price").value
    
    const price = parseFloat(priceInput.replace(",", "."))

    const image = document.getElementById("image").value

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                price,
                image,
            }),
        })

        if (response.ok) {
            alert("Product successfully added!")
            window.location.href = "index.html"
        } else {
            console.error("Error adding product:", response.statusText)
        }
    } catch (error) {
        console.error("Error adding product:", error)
    }
})