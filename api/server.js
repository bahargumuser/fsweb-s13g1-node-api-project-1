// SUNUCUYU BU DOSYAYA KURUN
const express = require("express");
const userModel = require("./users/model");
const server = express();
server.use(express.json());

server.post("/api/users", (req, res) => {
  try {
    let user = req.body;
    if (!user.bio || !user.name)
      res
        .status(400)
        .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
    else {
      userModel.insert(user).then((newUser) => {
        res.status(201).json(newUser);
      });
      //model.js dosyasındaki hali obje olarak verildiği için userModel.insert({ bio: user.bio, name: user.name }). şeklinde de yazabilirdik.
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});
server.get("/api/users", async (req, res) => {
  try {
    let allUsers = await userModel.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    let user = await userModel.findById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
  }
});
server.put("/api/users/:id", async (req, res) => {
  try {
    let user = await userModel.findById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      let updatedRecord = req.body;
      if (!updatedRecord.name || !updatedRecord.bio) {
        res
          .status(400)
          .json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
      } else {
        let updatedUser = await userModel.update(req.params.id, updatedRecord);
        res.status(200).json(updatedUser);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" });
  }
});
server.delete("/api/users/:id", async (req, res) => {
  try {
    let willBeDeletedUser = await userModel.findById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      await userModel.remove(req.params.id);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı silinemedi" });
  }
});

module.exports = server; // SERVERINIZI EXPORT EDİN {}
