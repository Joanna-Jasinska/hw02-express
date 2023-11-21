export const setAvatar = async ({ user, avatarURL }) => {
  await user.setAvatar({ avatarURL });
  await user.save();
  return;
};
