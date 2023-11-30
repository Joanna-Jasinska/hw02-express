export const verify = async ({ user }) => {
  await user.verify();
  await user.save();
  return;
};
