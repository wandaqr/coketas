const loginModel = require('../models/loginModel');
const objloginModel = new loginModel();

module.exports = {
    loguearAdministrador: (req, res) => {
        const { email, pass } = req.body;
        objloginModel.loguear(email, pass)
            .then(user => {
                if (user) {
                    res.json({ success: true, message: "Se logueó correctamente" });
                } else {
                    res.status(401).json({ success: false, message: "Credenciales incorrectas o no es administrador" });
                }
            })
            .catch(error => {
                console.error("Error al intentar loguear:", error);
                res.status(500).json({ success: false, message: "Error al procesar la solicitud de login" });
            });
    }

};
