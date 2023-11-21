export const logout = async ({ user }) => {
  await user.deleteToken();
  await user.save();
  return;
};
