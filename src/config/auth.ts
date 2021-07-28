export default {
  jwt: {
    secret: (process.env.JWT_SECRET as string) ?? "test",
    expiresIn: "2d",
  },
};
