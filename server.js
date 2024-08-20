const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const path = require('path');

require('dotenv').config();

const app = express();
const port = 3000;

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use(session({
    secret: 'nerkartran',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/weddingPlanner',
        collectionName: 'sessions'
    })
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/rent/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'rent.html'));
});

app.get('/album/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'album.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

const gallerySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    cover: { type: String, required: true },
    images: { type: [String], required: true },
    name: { type: String, required: true },
    type: { type: String, required: true }
});

const rentSchema = new mongoose.Schema({
    group: { type: String, required: true },
    name: { type: [String], required: true },
    images: { type: [String], required: true },
    price: { type: [String], required: true }
});

const accountSchema = new mongoose.Schema({
    password: { type: String, required: true },
    secret: { type: String, required: true },
    loveland: { type: String, required: true }
});

const sectionImage = new mongoose.Schema({
    wpimg: { type: String, required: true },
    eimg: { type: String, required: true },
    mimg: { type: String, required: true },
    homevid: { type: String, require: true },
    images: { type: [String], required: true }
});

const contentSchema = new mongoose.Schema({
    AboutUsEn: { type: String, required: true },
    AboutUsVi: { type: String, required: true },
    WeddingPlanningEn: { type: String, required: true },
    WeddingPlanningVi: { type: String, required: true },
    EventEn: { type: String, required: true },
    EventVi: { type: String, required: true },
    MiceEn: { type: String, required: true },
    MiceVi: { type: String, required: true },
    TourEn: { type: String, required: true },
    TourVi: { type: String, required: true },
    DestinationEn: { type: String, required: true },
    DestinationVi: { type: String, required: true }
});

const SectionImage = mongoose.model('SectionImage', sectionImage);
const Account = mongoose.model('Account', accountSchema);
const Gallery = mongoose.model('Gallery', gallerySchema);
const Rent = mongoose.model('Rent', rentSchema);
const Content = mongoose.model('Content', contentSchema);

//Thêm album mới
app.post('/api/galleries/addAlbum', async (req, res) => {
    try {
        const { password, secret, loveland } = req.body;
        const account = await Account.findOne({
            password,
            secret,
            loveland
        });

        if (!account) {
            return res.status(401).json({ error: 'Mật khẩu không chính xác' });
        }

        const newGallery = new Gallery({
            id: req.body.id,
            cover: req.body.cover,
            images: req.body.images,
            name: req.body.name,
            type: req.body.type,
        });

        await newGallery.save();

        res.status(201).json({ message: 'Gallery created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
//Edit content
app.put('/updateContent', async (req, res) => {
    try {
        const { password, secret, loveland } = req.body;
        const account = await Account.findOne({
            password,
            secret,
            loveland
        });

        if (!account) {
            return res.status(401).json({ error: 'Mật khẩu không chính xác' });
        }

        const {
            AboutUsEn, AboutUsVi, WeddingPlanningEn, WeddingPlanningVi,
            EventEn, EventVi, MiceEn, MiceVi, TourEn, TourVi,
            DestinationEn, DestinationVi
        } = req.body;

        let content = await Content.findOne();
        if (!content) {
            content = new Content();
        }

        const updateData = {};
        if (AboutUsEn) updateData.AboutUsEn = AboutUsEn;
        if (AboutUsVi) updateData.AboutUsVi = AboutUsVi;
        if (WeddingPlanningEn) updateData.WeddingPlanningEn = WeddingPlanningEn;
        if (WeddingPlanningVi) updateData.WeddingPlanningVi = WeddingPlanningVi;
        if (EventEn) updateData.EventEn = EventEn;
        if (EventVi) updateData.EventVi = EventVi;
        if (MiceEn) updateData.MiceEn = MiceEn;
        if (MiceVi) updateData.MiceVi = MiceVi;
        if (TourEn) updateData.TourEn = TourEn;
        if (TourVi) updateData.TourVi = TourVi;
        if (DestinationEn) updateData.DestinationEn = DestinationEn;
        if (DestinationVi) updateData.DestinationVi = DestinationVi;

        if (Object.keys(updateData).length > 0) {
            await content.updateOne(updateData);
        } else {
            return res.status(400).json({ message: 'No data to update' });
        }

        res.json({ message: 'Content updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
//Lấy content
app.get("/api/contents", async (req, res) => {
    try {
        const response = await Content.find();
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi lấy content" });
    }
});
//Lấy img
app.get("/api/section", async (req, res) => {
    try {
        const response = await SectionImage.find();
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi lấy sectionImage" });
    }
});
//Lấy list album
app.get('/api/galleries', async (req, res) => {
    try {
        const galleries = await Gallery.find();
        res.json(galleries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách gallery' });
    }
});
//Lấy list rents
app.get('/api/rents', async (req, res) => {
    try {
        const rents = await Rent.find();
        res.json(rents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách rents' });
    }
});
//Xóa album
app.delete('/api/galleries/deleteAlbum', async (req, res) => {
    try {
        const { password, secret, loveland } = req.body;
        const account = await Account.findOne({
            password,
            secret,
            loveland
        });

        if (!account) {
            return res.status(401).json({ error: 'Mật khẩu không chính xác' });
        }

        const { id } = req.body;
        const gallery = await Gallery.findOne({ id });
        if (!gallery) {
            return res.status(404).json({ error: 'Album not found' });
        }

        await gallery.deleteOne();

        res.json({ message: 'Album deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
//Thêm hình cho album
app.post('/api/galleries/addImage', async (req, res) => {
    try {
        const { password, secret, loveland, id, imageLink } = req.body;

        const account = await Account.findOne({
            password,
            secret,
            loveland
        });

        if (!account) {
            return res.status(401).json({ error: 'Mật khẩu không chính xác' });
        }

        const gallery = await Gallery.findOne({ id });

        if (!gallery) {
            return res.status(404).json({ error: 'Album không tồn tại' });
        }

        gallery.images.push(imageLink);

        await gallery.save();

        res.json({ message: 'Thêm ảnh thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
});
//Thêm item cho rent
app.post('/api/rents/addItem', async (req, res) => {
    try {
        const { password, secret, loveland } = req.body;
        const account = await Account.findOne({
            password,
            secret,
            loveland
        });

        if (!account) {
            return res.status(401).json({ error: 'Mật khẩu không chính xác' });
        }

        const { imageLink, name, price, groupName } = req.body;
        // Tìm rent theo groupName
        const rent = await Rent.findOne({ group: groupName });
        if (!rent) {
            return res.status(404).json({ error: 'Không tìm thấy rent' });
        }
        // Thêm các giá trị vào cuối các mảng
        rent.images.push(imageLink);
        rent.name.push(name);
        rent.price.push(price);
        // Lưu lại thay đổi
        await rent.save();
        res.json({ message: 'Thêm item thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
});
//Xóa item thứ nth của rent
app.delete('/api/rents/delete', async (req, res) => {
    try {
        const { password, secret, loveland } = req.body;
        const account = await Account.findOne({
            password,
            secret,
            loveland
        });

        if (!account) {
            return res.status(401).json({ error: 'Mật khẩu không chính xác' });
        }

        const { groupName, itemNumber } = req.body;
        const rent = await Rent.findOne({ group: groupName });
        if (!rent) {
            return res.status(404).json({ error: 'Không tìm thấy rent' });
        }
        if (itemNumber < 0 || itemNumber >= rent.name.length) {
            return res.status(400).json({ error: 'Số thứ tự item không hợp lệ' });
        }
        rent.name.splice(itemNumber, 1);
        rent.images.splice(itemNumber, 1);
        rent.price.splice(itemNumber, 1);
        await rent.save();
        res.json({ message: 'Xóa item thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
});
//Xóa hình thứ nth của album
app.delete('/api/galleries/deleteImage', async (req, res) => {
    try {
        const { password, secret, loveland } = req.body;
        const account = await Account.findOne({
            password,
            secret,
            loveland
        });

        if (!account) {
            return res.status(401).json({ error: 'Mật khẩu không chính xác' });
        }

        const { id, imageId } = req.body;

        const gallery = await Gallery.findOne({ id });

        if (!gallery) {
            return res.status(404).json({ error: 'Album không tồn tại' });
        }

        gallery.images.splice(imageId, 1);

        await gallery.save();
        res.json({ message: 'Xóa hình ảnh thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
});



