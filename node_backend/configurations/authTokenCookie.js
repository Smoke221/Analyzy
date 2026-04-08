/** Options for JWT cookie set on Google OAuth; must match clearCookie in logout. */
const tokenCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
  path: "/",
};

module.exports = { tokenCookieOptions };
