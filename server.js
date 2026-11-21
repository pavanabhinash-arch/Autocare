require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const Service = require("./models/Service");

const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/bookings", bookingRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("AutoCare Backend is Running");
});

// ======================================================
// SERVICE ROUTES
// ======================================================

// Create Service
app.get("/create-service", async (req, res) => {
    try {
        const service = await Service.create({
            serviceName: "Oil Change",
            description: "Engine oil replacement",
            price: 1500,
            duration: "1 hour",
            category: "Maintenance",
            isAvailable: true
        });

        res.json(service);

    } catch (error) {
        res.status(500).json({
            message: "Error creating service",
            error: error.message
        });
    }
});

// Get All Services
app.get("/services", async (req, res) => {
    try {
        const services = await Service.find();

        res.json(services);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching services",
            error: error.message
        });
    }
});

// Update Service
app.put("/services/:id", async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        res.json(service);

    } catch (error) {
        res.status(500).json({
            message: "Error updating service",
            error: error.message
        });
    }
});

// Delete Service
app.delete("/services/:id", async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(
            req.params.id
        );

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        res.json({
            message: "Service deleted successfully",
            service: service
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting service",
            error: error.message
        });
    }
});

// ======================================================
// START SERVER
// ======================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `AutoCare server running on http://localhost:${PORT}`
    );
});