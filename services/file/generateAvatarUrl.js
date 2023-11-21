import gravatar from "gravatar";

export const generateAvatarUrl = ({ email }) => {
  const secureUrl = gravatar.url(
    email,
    { s: "100", r: "x", d: "wavatar" },
    true
  );
  return secureUrl;
};
