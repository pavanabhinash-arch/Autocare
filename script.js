// ======================================================
// AUTOCARE - MAIN JAVASCRIPT
// ======================================================


// ======================================================
// PAGE INITIALIZATION
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    // Show home page when website loads
    showHome();

    // Initialize all forms and dashboard buttons
    initializeBookingForm();
    initializeRegisterForm();
    initializeLoginForm();
    initializeSidebar();
    initializeAddVehicle();

});


// ======================================================
// NAVIGATION MENU
// ======================================================

function toggleMenu() {

    const navLinks = document.querySelector(".nav-links");

    if (navLinks) {
        navLinks.classList.toggle("active");
    }

}


// ======================================================
// HIDE ALL PAGES
// ======================================================

function hideAllPages() {

    const mainWebsite = document.getElementById("mainWebsite");
    const loginPage = document.getElementById("loginPage");
    const registerPage = document.getElementById("registerPage");
    const customerPage = document.getElementById("customerPage");

    if (mainWebsite) {
        mainWebsite.style.display = "none";
    }

    if (loginPage) {
        loginPage.style.display = "none";
    }

    if (registerPage) {
        registerPage.style.display = "none";
    }

    if (customerPage) {
        customerPage.style.display = "none";
    }

}


// ======================================================
// SHOW HOME PAGE
// ======================================================

function showHome() {

    hideAllPages();

    const mainWebsite = document.getElementById("mainWebsite");

    if (mainWebsite) {
        mainWebsite.style.display = "block";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ======================================================
// SHOW LOGIN PAGE
// ======================================================

function showLogin() {

    hideAllPages();

    const loginPage = document.getElementById("loginPage");

    if (loginPage) {
        loginPage.style.display = "block";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ======================================================
// SHOW REGISTER PAGE
// ======================================================

function showRegister() {

    hideAllPages();

    const registerPage = document.getElementById("registerPage");

    if (registerPage) {
        registerPage.style.display = "block";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ======================================================
// SHOW CUSTOMER DASHBOARD
// ======================================================

function showCustomer() {

    const storedUser = localStorage.getItem("loggedInUser");

    // User is not logged in
    if (!storedUser) {

        showLogin();

        return;
    }

    hideAllPages();

    const customerPage =
        document.getElementById("customerPage");

    if (customerPage) {

        customerPage.style.display = "block";

        loadCustomerData();
        loadSavedVehicles();
        loadCustomerBookings();

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ======================================================
// SCROLL TO BOOKING
// ======================================================

function scrollToBooking() {

    showHome();

    setTimeout(function () {

        const booking =
            document.getElementById("booking");

        if (booking) {

            booking.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 300);

}


// ======================================================
// SHOW SERVICES
// ======================================================

function showServices() {

    showHome();

    setTimeout(function () {

        const services =
            document.getElementById("services");

        if (services) {

            services.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 300);

}


// ======================================================
// SELECT SERVICE
// ======================================================

function selectService(serviceName) {

    scrollToBooking();

    setTimeout(function () {

        const service =
            document.getElementById("service");

        if (service) {

            service.value = serviceName;

        }

    }, 500);

}


// ======================================================
// BOOKING FORM
// ======================================================

function initializeBookingForm() {

    const bookingForm =
        document.getElementById("bookingForm");

    if (!bookingForm) {
        return;
    }

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // -----------------------------
        // GET VALUES
        // -----------------------------

        const name =
            document.getElementById("customerName")?.value.trim() || "";

        const phone =
            document.getElementById("phone")?.value.trim() || "";

        const vehicle =
            document.getElementById("vehicleNumber")?.value.trim() || "";

        const vehicleType =
            document.getElementById("vehicleType")?.value || "";

        const service =
            document.getElementById("service")?.value || "";

        const date =
            document.getElementById("date")?.value || "";

        const problem =
            document.getElementById("problem")?.value.trim() || "";


        // -----------------------------
        // VALIDATION
        // -----------------------------

        if (
            name === "" ||
            phone === "" ||
            vehicle === "" ||
            vehicleType === "" ||
            service === "" ||
            date === ""
        ) {

            showBookingMessage(
                "❌ Please fill all required fields.",
                "red"
            );

            return;
        }


        // -----------------------------
        // CREATE BOOKING
        // -----------------------------

        const booking = {

            bookingId:
                "AC" + Date.now(),

            customerName:
                name,

            phone:
                phone,

            vehicleNumber:
                vehicle.toUpperCase(),

            vehicleType:
                vehicleType,

            service:
                service,

            date:
                date,

            problem:
                problem,

            status:
                "Pending"

        };


        // -----------------------------
        // GET OLD BOOKINGS
        // -----------------------------

        let bookings =
            JSON.parse(
                localStorage.getItem("bookings")
            ) || [];


        // -----------------------------
        // SAVE BOOKING
        // -----------------------------

        bookings.push(booking);

        localStorage.setItem(
            "bookings",
            JSON.stringify(bookings)
        );


        // -----------------------------
        // SUCCESS MESSAGE
        // -----------------------------

        const message =
            document.getElementById("bookingMessage");

        if (message) {

            message.innerHTML = `
                ✅ Booking request submitted successfully!
                <br><br>

                <strong>Booking ID:</strong>
                ${booking.bookingId}
                <br>

                <strong>Customer:</strong>
                ${booking.customerName}
                <br>

                <strong>Vehicle:</strong>
                ${booking.vehicleNumber}
                <br>

                <strong>Service:</strong>
                ${booking.service}
                <br>

                <strong>Date:</strong>
                ${booking.date}
                <br>

                <strong>Status:</strong>
                ${booking.status}
            `;

            message.style.color = "green";
        }


        // -----------------------------
        // RESET FORM
        // -----------------------------

        bookingForm.reset();

    });

}


// ======================================================
// BOOKING MESSAGE
// ======================================================

function showBookingMessage(messageText, color) {

    const message =
        document.getElementById("bookingMessage");

    if (message) {

        message.textContent =
            messageText;

        message.style.color =
            color;

    }

}


// ======================================================
// LOAD CUSTOMER DATA
// ======================================================

function loadCustomerData() {

    const storedUser =
        localStorage.getItem("loggedInUser");


    if (!storedUser) {

        showLogin();

        return;
    }


    let user;

    try {

        user =
            JSON.parse(storedUser);

    } catch (error) {

        console.error(
            "Invalid logged-in user data.",
            error
        );

        localStorage.removeItem("loggedInUser");

        showLogin();

        return;
    }


    // -----------------------------
    // CUSTOMER NAME
    // -----------------------------

    const customerName =
        document.getElementById(
            "customerNameDisplay"
        );

    if (customerName) {

        customerName.textContent =
            user.name || "Customer";

    }


    // -----------------------------
    // NAVBAR USER NAME
    // -----------------------------

    const navUserName =
        document.getElementById(
            "navUserName"
        );

    if (navUserName) {

        navUserName.textContent =
            user.name || "Customer";

    }


    // -----------------------------
    // EMAIL
    // -----------------------------

    const customerEmail =
        document.getElementById(
            "customerEmail"
        );

    if (customerEmail) {

        customerEmail.textContent =
            user.email || "Not available";

    }


    // -----------------------------
    // PHONE
    // -----------------------------

    const customerPhone =
        document.getElementById(
            "customerPhone"
        );

    if (customerPhone) {

        customerPhone.textContent =
            user.phone || "Not available";

    }

}


// ======================================================
// CUSTOMER BOOKINGS
// ======================================================

function loadCustomerBookings() {

    const bookingContainer =
        document.querySelector(".booking-card");

    const storedUser =
        localStorage.getItem("loggedInUser");

    if (!storedUser) {
        return;
    }

    let user;

    try {

        user =
            JSON.parse(storedUser);

    } catch (error) {

        return;

    }


    const bookings =
        JSON.parse(
            localStorage.getItem("bookings")
        ) || [];


    // Find bookings for current customer
    const customerBookings =
        bookings.filter(function (booking) {

            return (
                booking.customerName === user.name ||
                booking.phone === user.phone
            );

        });


    // If no bookings
    if (
        customerBookings.length === 0 &&
        bookingContainer
    ) {

        bookingContainer.innerHTML = `
            <div class="booking-info">
                <h3>No Upcoming Booking</h3>
                <p>
                    You don't have any bookings yet.
                </p>
            </div>
        `;

        return;
    }


    // Show latest booking
    if (
        customerBookings.length > 0 &&
        bookingContainer
    ) {

        const booking =
            customerBookings[
                customerBookings.length - 1
            ];


        bookingContainer.innerHTML = `

            <div class="booking-info">

                <h3>
                    ${booking.service}
                </h3>

                <p>
                    🚗 ${booking.vehicleNumber}
                </p>

                <p>
                    📅 ${booking.date}
                </p>

                <p>
                    🆔 ${booking.bookingId}
                </p>

            </div>

            <div class="booking-status">

                <span>
                    ${booking.status}
                </span>

            </div>

        `;

    }

}


// ======================================================
// GO TO BOOKING FROM CUSTOMER PAGE
// ======================================================

function goToBooking() {

    showHome();

    setTimeout(function () {

        const booking =
            document.getElementById("booking");

        if (booking) {

            booking.scrollIntoView({
                behavior: "smooth"
            });

        }

    }, 300);

}


// ======================================================
// LOGOUT
// ======================================================

function logout() {

    localStorage.removeItem("loggedInUser");

    showHome();

}


// ======================================================
// REGISTER
// ======================================================

function initializeRegisterForm() {

    const registerForm =
        document.getElementById("registerForm");

    if (!registerForm) {
        return;
    }


    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "registerName"
                )?.value.trim() || "";


            const email =
                document.getElementById(
                    "registerEmail"
                )?.value.trim().toLowerCase() || "";


            const phone =
                document.getElementById(
                    "registerPhone"
                )?.value.trim() || "";


            const password =
                document.getElementById(
                    "registerPassword"
                )?.value || "";


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                )?.value || "";


            const message =
                document.getElementById(
                    "registerMessage"
                );


            // -----------------------------
            // VALIDATION
            // -----------------------------

            if (
                name === "" ||
                email === "" ||
                phone === "" ||
                password === "" ||
                confirmPassword === ""
            ) {

                if (message) {

                    message.textContent =
                        "❌ Please fill all fields.";

                    message.style.color =
                        "red";

                }

                return;
            }


            if (password.length < 6) {

                if (message) {

                    message.textContent =
                        "❌ Password must contain at least 6 characters.";

                    message.style.color =
                        "red";

                }

                return;
            }


            if (password !== confirmPassword) {

                if (message) {

                    message.textContent =
                        "❌ Passwords do not match.";

                    message.style.color =
                        "red";

                }

                return;
            }


            // -----------------------------
            // CREATE CUSTOMER
            // -----------------------------

            const customer = {

                name:
                    name,

                email:
                    email,

                phone:
                    phone,

                password:
                    password

            };


            // -----------------------------
            // SAVE CUSTOMER
            // -----------------------------

            localStorage.setItem(
                "customer",
                JSON.stringify(customer)
            );


            if (message) {

                message.textContent =
                    "✅ Account created successfully!";

                message.style.color =
                    "green";

            }


            // -----------------------------
            // GO TO LOGIN
            // -----------------------------

            setTimeout(function () {

                showLogin();

            }, 1000);

        }
    );

}


// ======================================================
// LOGIN
// ======================================================

function initializeLoginForm() {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }


    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                )?.value.trim().toLowerCase() || "";


            const password =
                document.getElementById(
                    "loginPassword"
                )?.value || "";


            const message =
                document.getElementById(
                    "loginMessage"
                );


            // -----------------------------
            // GET CUSTOMER
            // -----------------------------

            const storedCustomer =
                localStorage.getItem(
                    "customer"
                );


            if (!storedCustomer) {

                if (message) {

                    message.textContent =
                        "❌ Account not found. Please register first.";

                    message.style.color =
                        "red";

                }

                return;
            }


            let customer;

            try {

                customer =
                    JSON.parse(
                        storedCustomer
                    );

            } catch (error) {

                if (message) {

                    message.textContent =
                        "❌ Account data is corrupted.";

                    message.style.color =
                        "red";

                }

                return;
            }


            // -----------------------------
            // CHECK LOGIN
            // -----------------------------

            if (
                email === customer.email &&
                password === customer.password
            ) {

                // Save logged-in user
                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(customer)
                );


                if (message) {

                    message.textContent =
                        "✅ Login successful!";

                    message.style.color =
                        "green";

                }


                // Open dashboard
                setTimeout(function () {

                    showCustomer();

                }, 700);

            }

            else {

                if (message) {

                    message.textContent =
                        "❌ Invalid email or password.";

                    message.style.color =
                        "red";

                }

            }

        }
    );

}


// ======================================================
// CUSTOMER DASHBOARD SIDEBAR
// ======================================================

function initializeSidebar() {

    const sidebarLinks =
        document.querySelectorAll(
            ".sidebar a"
        );


    sidebarLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                // Remove active
                sidebarLinks.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                // Add active
                this.classList.add(
                    "active"
                );


                const text =
                    this.textContent.trim();


                // -----------------------------
                // DASHBOARD
                // -----------------------------

                if (
                    text.includes("Dashboard")
                ) {

                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });

                }


                // -----------------------------
                // MY VEHICLES
                // -----------------------------

                else if (
                    text.includes("My Vehicles")
                ) {

                    const section =
                        document.querySelector(
                            ".vehicle-grid"
                        );


                    if (section) {

                        const parent =
                            section.closest(
                                ".dashboard-section"
                            );


                        if (parent) {

                            parent.scrollIntoView({
                                behavior: "smooth"
                            });

                        }

                    }

                }


                // -----------------------------
                // MY BOOKINGS
                // -----------------------------

                else if (
                    text.includes("My Bookings")
                ) {

                    const section =
                        document.querySelector(
                            ".booking-card"
                        );


                    if (section) {

                        const parent =
                            section.closest(
                                ".dashboard-section"
                            );


                        if (parent) {

                            parent.scrollIntoView({
                                behavior: "smooth"
                            });

                        }

                    }

                }


                // -----------------------------
                // SERVICE HISTORY
                // -----------------------------

                else if (
                    text.includes("Service History")
                ) {

                    const section =
                        document.querySelector(
                            ".history-table"
                        );


                    if (section) {

                        const parent =
                            section.closest(
                                ".dashboard-section"
                            );


                        if (parent) {

                            parent.scrollIntoView({
                                behavior: "smooth"
                            });

                        }

                    }

                }


                // -----------------------------
                // INVOICES
                // -----------------------------

                else if (
                    text.includes("Invoices")
                ) {

                    alert(
                        "Invoice section will be connected to the backend."
                    );

                }


                // -----------------------------
                // PROFILE
                // -----------------------------

                else if (
                    text.includes("Profile")
                ) {

                    showProfile();

                }

            }
        );

    });

}


// ======================================================
// PROFILE
// ======================================================

function showProfile() {

    const storedUser =
        localStorage.getItem(
            "loggedInUser"
        );


    if (!storedUser) {

        alert(
            "Please login first."
        );

        return;
    }


    let user;

    try {

        user =
            JSON.parse(
                storedUser
            );

    } catch (error) {

        alert(
            "Unable to load profile."
        );

        return;
    }


    alert(
        "PROFILE\n\n" +
        "Name: " +
        (user.name || "Not available") +
        "\n" +
        "Email: " +
        (user.email || "Not available") +
        "\n" +
        "Phone: " +
        (user.phone || "Not available")
    );

}


// ======================================================
// ADD VEHICLE
// ======================================================

function initializeAddVehicle() {

    const buttons =
        document.querySelectorAll(
            ".section-heading button"
        );


    buttons.forEach(function (button) {

        if (
            button.textContent
                .trim()
                .includes("Add Vehicle")
        ) {

            button.addEventListener(
                "click",
                function () {

                    showAddVehicleForm();

                }
            );

        }

    });

}


// ======================================================
// SHOW ADD VEHICLE FORM
// ======================================================

function showAddVehicleForm() {

    const vehicleSection =
        document.querySelector(
            ".vehicle-grid"
        );


    if (!vehicleSection) {

        console.error(
            "Vehicle grid not found."
        );

        return;
    }


    // Prevent duplicate form
    const oldForm =
        document.getElementById(
            "addVehicleForm"
        );


    if (oldForm) {

        oldForm.scrollIntoView({
            behavior: "smooth"
        });

        return;
    }


    const form =
        document.createElement("div");


    form.id =
        "addVehicleForm";


    form.style.marginTop =
        "20px";

    form.style.padding =
        "25px";

    form.style.border =
        "1px solid #e5e7eb";

    form.style.borderRadius =
        "12px";

    form.style.background =
        "#ffffff";


    form.innerHTML = `

        <h3 style="margin-bottom:20px;">
            Add New Vehicle
        </h3>

        <div style="
            display:grid;
            grid-template-columns:repeat(2,1fr);
            gap:15px;
        ">

            <input
                id="newVehicleNumber"
                type="text"
                placeholder="Vehicle Number"
            >

            <input
                id="newVehicleBrand"
                type="text"
                placeholder="Brand"
            >

            <input
                id="newVehicleModel"
                type="text"
                placeholder="Model"
            >

            <input
                id="newVehicleYear"
                type="number"
                placeholder="Year"
            >

            <select id="newVehicleFuel">

                <option value="">
                    Select Fuel Type
                </option>

                <option value="Petrol">
                    Petrol
                </option>

                <option value="Diesel">
                    Diesel
                </option>

                <option value="Electric">
                    Electric
                </option>

                <option value="Hybrid">
                    Hybrid
                </option>

            </select>

        </div>

        <div style="margin-top:20px;">

            <button
                id="saveVehicleButton"
                style="
                    border:none;
                    background:#2563eb;
                    color:white;
                    padding:11px 18px;
                    border-radius:7px;
                    font-weight:700;
                    cursor:pointer;
                "
            >
                Save Vehicle
            </button>

            <button
                id="cancelVehicleButton"
                style="
                    border:1px solid #d1d5db;
                    background:white;
                    color:#374151;
                    padding:11px 18px;
                    border-radius:7px;
                    font-weight:700;
                    cursor:pointer;
                    margin-left:8px;
                "
            >
                Cancel
            </button>

        </div>

        <p
            id="vehicleMessage"
            style="
                margin-top:15px;
                font-weight:700;
            "
        ></p>

    `;


    const dashboardSection =
        vehicleSection.closest(
            ".dashboard-section"
        );


    if (dashboardSection) {

        dashboardSection.appendChild(
            form
        );

    }


    form.scrollIntoView({
        behavior: "smooth"
    });


    // ==================================================
    // SAVE VEHICLE
    // ==================================================

    document
        .getElementById(
            "saveVehicleButton"
        )
        .addEventListener(
            "click",
            function () {

                const number =
                    document
                        .getElementById(
                            "newVehicleNumber"
                        )
                        .value
                        .trim()
                        .toUpperCase();


                const brand =
                    document
                        .getElementById(
                            "newVehicleBrand"
                        )
                        .value
                        .trim();


                const model =
                    document
                        .getElementById(
                            "newVehicleModel"
                        )
                        .value
                        .trim();


                const year =
                    document
                        .getElementById(
                            "newVehicleYear"
                        )
                        .value
                        .trim();


                const fuel =
                    document
                        .getElementById(
                            "newVehicleFuel"
                        )
                        .value;


                const message =
                    document.getElementById(
                        "vehicleMessage"
                    );


                // Validation
                if (
                    number === "" ||
                    brand === "" ||
                    model === "" ||
                    year === "" ||
                    fuel === ""
                ) {

                    if (message) {

                        message.textContent =
                            "❌ Please fill all vehicle details.";

                        message.style.color =
                            "red";

                    }

                    return;
                }


                // Create vehicle object
                const vehicle = {

                    id:
                        Date.now(),

                    number:
                        number,

                    brand:
                        brand,

                    model:
                        model,

                    year:
                        year,

                    fuel:
                        fuel

                };


                // Get old vehicles
                let vehicles =
                    JSON.parse(
                        localStorage.getItem(
                            "vehicles"
                        )
                    ) || [];


                // Add vehicle
                vehicles.push(vehicle);


                // Save vehicles
                localStorage.setItem(
                    "vehicles",
                    JSON.stringify(
                        vehicles
                    )
                );


                // Create card
                createVehicleCard(
                    vehicle,
                    vehicleSection
                );


                if (message) {

                    message.textContent =
                        "✅ Vehicle added successfully!";

                    message.style.color =
                        "green";

                }


                setTimeout(function () {

                    form.remove();

                }, 800);

            }
        );


    // ==================================================
    // CANCEL
    // ==================================================

    document
        .getElementById(
            "cancelVehicleButton"
        )
        .addEventListener(
            "click",
            function () {

                form.remove();

            }
        );

}


// ======================================================
// CREATE VEHICLE CARD
// ======================================================

function createVehicleCard(
    vehicle,
    vehicleSection
) {

    const card =
        document.createElement("div");


    card.className =
        "vehicle-card";


    card.innerHTML = `

        <div class="vehicle-image">
            🚗
        </div>

        <h3>
            ${vehicle.brand}
            ${vehicle.model}
        </h3>

        <p>
            Registration:
            ${vehicle.number}
        </p>

        <p>
            ${vehicle.fuel}
        </p>

        <p>
            Year:
            ${vehicle.year}
        </p>

        <button>
            View Details
        </button>

    `;


    vehicleSection.appendChild(
        card
    );

}


// ======================================================
// LOAD SAVED VEHICLES
// ======================================================

function loadSavedVehicles() {

    const vehicleSection =
        document.querySelector(
            ".vehicle-grid"
        );


    if (!vehicleSection) {
        return;
    }


    const vehicles =
        JSON.parse(
            localStorage.getItem(
                "vehicles"
            )
        ) || [];


    // Remove dynamically generated
    // cards before rebuilding
    const dynamicCards =
        vehicleSection.querySelectorAll(
            ".dynamic-vehicle"
        );


    dynamicCards.forEach(function (card) {

        card.remove();

    });


    vehicles.forEach(function (vehicle) {

        const card =
            document.createElement("div");


        card.className =
            "vehicle-card dynamic-vehicle";


        card.innerHTML = `

            <div class="vehicle-image">
                🚗
            </div>

            <h3>
                ${vehicle.brand}
                ${vehicle.model}
            </h3>

            <p>
                Registration:
                ${vehicle.number}
            </p>

            <p>
                ${vehicle.fuel}
            </p>

            <p>
                Year:
                ${vehicle.year}
            </p>

            <button>
                View Details
            </button>

        `;


        vehicleSection.appendChild(
            card
        );

    });

}


// ======================================================
// VIEW VEHICLE DETAILS
// ======================================================

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.tagName === "BUTTON" &&
            event.target.textContent
                .trim() === "View Details"
        ) {

            const card =
                event.target.closest(
                    ".vehicle-card"
                );


            if (!card) {
                return;
            }


            const vehicleName =
                card
                    .querySelector("h3")
                    ?.textContent
                    .trim() ||
                "Unknown Vehicle";


            const details =
                card.querySelectorAll("p");


            let registration =
                "";

            let fuel =
                "";

            let year =
                "";


            if (details[0]) {

                registration =
                    details[0]
                        .textContent
                        .trim();

            }


            if (details[1]) {

                fuel =
                    details[1]
                        .textContent
                        .trim();

            }


            if (details[2]) {

                year =
                    details[2]
                        .textContent
                        .trim();

            }


            alert(

                "VEHICLE DETAILS\n\n" +

                "Vehicle: " +
                vehicleName +
                "\n" +

                registration +
                "\n" +

                "Fuel Type: " +
                fuel +
                "\n" +

                year

            );

        }

    }
);