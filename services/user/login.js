export const login = async ({ user }) => {
  await user.generateToken();
  await user.save();
  return;
};
