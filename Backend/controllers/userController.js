const User = require('../models/User');
const StrategicCoordinator = require('../models/StrategicCoordinator');
const President = require('../models/President');
const VicePresident = require('../models/VicePresident');
const Leader = require('../models/Leader');
const Member = require('../models/Member');
const bcrypt = require('bcryptjs');

// Crear un nuevo usuario y guardarlo en la colección correspondiente
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, student_id, phone } = req.body;

    if (!name || !email || !password || !role || !student_id || !phone) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario ya existe en la colección User
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario en la colección general
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      student_id,
      phone
    });
    await newUser.save();

    // Guardar el usuario en la colección correspondiente a su rol
    let roleSpecificUser;
    switch (role) {
      case 'strategic_coordinator':
        roleSpecificUser = new StrategicCoordinator({ _id: newUser._id });
        break;
      case 'president':
        roleSpecificUser = new President({ _id: newUser._id });
        break;
      case 'vice_president':
        roleSpecificUser = new VicePresident({ _id: newUser._id });
        break;
      case 'leader':
        roleSpecificUser = new Leader({ _id: newUser._id });
        break;
      case 'member':
        roleSpecificUser = new Member({ _id: newUser._id });
        break;
      default:
        return res.status(400).json({ message: "Rol inválido" });
    }

    await roleSpecificUser.save();

    res.status(201).json({ message: "Usuario creado exitosamente", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error: error.message });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
};

// Obtener usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
  }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario actualizado exitosamente", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error: error.message });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar usuario de la colección User
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Eliminar de la colección correspondiente a su rol
    switch (deletedUser.role) {
      case 'strategic_coordinator':
        await StrategicCoordinator.findByIdAndDelete(id);
        break;
      case 'president':
        await President.findByIdAndDelete(id);
        break;
      case 'vice_president':
        await VicePresident.findByIdAndDelete(id);
        break;
      case 'leader':
        await Leader.findByIdAndDelete(id);
        break;
      case 'member':
        await Member.findByIdAndDelete(id);
        break;
    }

    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
  }
};
