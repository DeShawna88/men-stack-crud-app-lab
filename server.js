// --------------- PACKAGES ------------------
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan')
const path = require("path");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Animal = require('./models/animal.js')

// --------------- MIDDLEWARE ------------------
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));


// --------------- ROUTES --------------------

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get('/animals', async (req, res) => {
    const allAnimals = await Animal.find();
    res.render('animals/toc.ejs', { animals: allAnimals })
})

app.get("/animals/new", (req, res) => {
    res.render("animals/new.ejs");
});

app.get('/animals/:animalId', async (req, res) => {
    const foundAnimal = await Animal.findById(req.params.animalId);
    res.render("animals/show.ejs", { animal: foundAnimal });
})




app.post('/animals', async (req, res) => {
    if (req.body.isMammal === 'on') {
        req.body.isMammal = true;
    } else {
        req.body.isMammal = false;
    }
    if (req.body.isBird === 'on') {
        req.body.isBird = true;
    } else {
        req.body.isBird = false;
    }
    if (req.body.isReptile === 'on') {
        req.body.isReptile = true;
    } else {
        req.body.isReptile = false;
    }
    if (req.body.isFish === 'on') {
        req.body.isFish = true;
    } else {
        req.body.isFish = false;
    }
    if (req.body.isAmphibian === 'on') {
        req.body.isAmphibian = true;
    } else {
        req.body.isAmphibian = false;
    }
    await Animal.create(req.body);
    res.redirect('/animals');
})

app.delete("/animals/:animalId", async (req, res) => {
    await Animal.findByIdAndDelete(req.params.animalId);
    res.redirect("/animals");
});

app.get("/animals/:animalId/edit", async (req, res) => {
    const foundAnimal = await Animal.findById(req.params.animalId);
    res.render("animals/edit.ejs", {
        animal: foundAnimal,
    });
});

app.put('/animals/:animalId', async (req, res) => {
    if (req.body.isMammal === 'on') {
        req.body.isMammal = true;
    } else {
        req.body.isMammal = false;
    }
    if (req.body.isBird === 'on') {
        req.body.isBird = true;
    } else {
        req.body.isBird = false;
    }
    if (req.body.isReptile === 'on') {
        req.body.isReptile = true;
    } else {
        req.body.isReptile = false;
    }
    if (req.body.isFish === 'on') {
        req.body.isFish = true;
    } else {
        req.body.isFish = false;
    }
    if (req.body.isAmphibian === 'on') {
        req.body.isAmphibian = true;
    } else {
        req.body.isAmphibian = false;
    }
    await Animal.findByIdAndUpdate(req.params.animalId, req.body);
    res.redirect(`/animals/${req.params.animalId}`);
});

app.listen(3001, () => {
    console.log('Listening on port 3001');
});
