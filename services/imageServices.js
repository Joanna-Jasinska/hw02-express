import gravatar from "gravatar";

const generateAvatar = ({ email }) => {
  const secureUrl = gravatar.url(
    email,
    { s: "100", r: "x", d: "wavatar" },
    true
  );
  return secureUrl;
};

const avatarImg = ({ imagePath }) => {
  return `<img
    src="${imagePath}"
    style="height:300px;"/>`;
};

export default {
  generateAvatar,
  avatarImg,
};
