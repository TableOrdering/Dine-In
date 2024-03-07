import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const authorizationHeader = req.headers.authorization;

    // Check if the Authorization header exists
    if (!authorizationHeader) {
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });
    }

    const token = authorizationHeader.split(" ")[1];

    // Check if the token exists
    if (!token) {
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });
    }

    // Verify the token using the provided JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the verification is successful
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Token verification failed, authorization denied" });
    }

    // if (decoded.userType === "user") {
    //   req.user = { userId: decoded.id };
    // } else if (decoded.userType === "restaurant") {
    //   req.restaurant = { restaurantId: decoded.id };
    // } else if (decoded.userType === "admin") {
    //   req.admin = { adminId: decoded.id };
    // } else {
    //   return res.status(401).json({ message: "Invalid user type" });
    // }
    switch (decoded.userType) {
      case "user":
        req.user = { userId: decoded.id };
        break;
      case "restaurant":
        req.restaurant = { restaurantId: decoded.id };
        break;
      case "admin":
        req.admin = { adminId: decoded.id };
        break;
      default:
        return res.status(401).json({ message: "Invalid user type" });
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "jwt expired") {
      return res.status(401).json({ message: "Token expired" });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export default auth;
