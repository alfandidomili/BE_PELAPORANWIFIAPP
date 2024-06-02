import express from "express";
import "dotenv/config";
import appMiddleware from "./middleware/index.js";
const app = express();
import bodyParser from "body-parser";
const PORT = process.env.PORT || 3001;

// export const oauth2Client = new google.auth.OAuth2(
// 	process.env.GOOGLE_CLIENT_ID,
// 	process.env.GOOGLE_CLIENT_SECRET,
// 	"http://localhost:3000/auth/google/callback"
// );

// // membuat scope premission to user
// const scopes = [
// 	"http://www.googleapis.com/auth/userinfo.email",
// 	"http://www.googleapis.com/auth/userinfo.profile",
// ];

// export const authorizationUrl =
// 	oauth2Client.generateAuthUrl({
// 		access_type: "offline",
// 		scope: scopes,
// 		include_granted_scopes: true,
// 	});

app.use(bodyParser.json());
app.use(appMiddleware);

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
