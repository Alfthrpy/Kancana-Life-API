import authService from "./../services/authService.js";

const loginAdmin = async (req, res) => {
  const body = req.body;
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email dan password wajib diisi" });
  }
  try {
    const result = await authService.loginAdmin(body);
    if (result.success) {
      return res.status(200).json({ accessToken: result.session.session.access_token });
    } else {
      return res.status(401).json({ message: result.message });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const body = req.body;
  if (!req.body.device_id || !req.body.coordinate) {
    return res
      .status(400)
      .json({ message: "Device ID dan koordinat wajib diisi" });
  }
  try {
    const result = await authService.loginUser(body);
    if (result.success) {
      return res
        .status(200)
        .json({ message: result.message, token: result.token });
    } else {
      return res.status(401).json({ message: result.message });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const controller = { loginAdmin, loginUser };

export default controller;
