document.addEventListener("DOMContentLoaded", function() {
    // Get the elements needed
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popupTitle");
    const popupMessage = document.getElementById("popupMessage");
    const popupButton = document.getElementById("popupButton");
    const closePopupBtn = document.getElementById("closePopupBtn");

    // Function to show the popup
    function showPopup(title, message, buttonText, buttonAction) {
        popupTitle.textContent = title;
        popupMessage.textContent = message;
        popupButton.textContent = buttonText;

        // If a button action is provided, assign it; otherwise, close the popup on button click
        if (buttonAction) {
            popupButton.onclick = function() {
                window.location.href = buttonAction;
            };
        } else {
            popupButton.onclick = function() {
                popup.style.display = "none";
            };
        }

        popup.style.display = "block";
    }

    // Function to check if all required fields are filled
    function areRequiredFieldsFilled() {
        const requiredFields = document.querySelectorAll("input[required]");
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                return false;
            }
        }
        return true;
    }

    // Add event listener to all buttons with specified classes
    document.querySelectorAll(".action-btn").forEach(button => {
        button.addEventListener("click", function(event) {
            // Prevent default form submission
            event.preventDefault();

            // Check if all required fields are filled
            if (!areRequiredFieldsFilled()) {
                alert("Please fill in all required fields.");
                return;
            }

            if (button.classList.contains("btn-fav")) {
                showPopup("Favourites Saved", "Your favourites have been saved.", "Okay");
            } else if (button.classList.contains("btn-load-fav")) {
                showPopup("Favourites Loaded", "Your favourites have been loaded.", "Okay");
            } else if (button.classList.contains("btn-pcd")) {
                showPopup("Order Placed!", "Your order has been placed. It will arrive in 2-3 business days.", "Back To Home", "./main.html");
            }
        });
    });

    // Close the popup when the close button is clicked
    closePopupBtn.addEventListener("click", function() {
        popup.style.display = "none";
    });
});
