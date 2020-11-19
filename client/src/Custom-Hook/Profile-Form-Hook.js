import { useState, useEffect } from "react";

const emptyProfile = {
  website: "",
  location: "",
  status: "",
  skills: "",
  gitHubUsername: "",
  bio: "",
  twitter: "",
  facebook: "",
  instagram: "",
  linkedin: "",
  youtube: "",
  company: "",
};
export function useEmptyProfileForm() {
  const [formData, setFormData] = useState(emptyProfile);
  return [formData, setFormData];
}
export function useFilledProfileForm(
  getCurrentProfile,
  { loading, profile },
  isAuthenticated
) {
  const [formData, setFormData] = useState(emptyProfile);
  useEffect(() => {
    if (isAuthenticated) {
      getCurrentProfile();
      const profileData = {
        status: loading || !profile.status ? "" : profile.status,
        website: loading || !profile.website ? "" : profile.website,
        location: loading || !profile.location ? "" : profile.location,
        skills: loading || !profile.skills ? "" : profile.skills.join(", "),
        gitHubUsername:
          loading || !profile.gitHubUsername ? "" : profile.gitHubUsername,
        bio: loading || !profile.bio ? "" : profile.bio,
        company: loading || !profile.company ? "" : profile.company,
        twitter: loading || !profile.social ? "" : profile.social.twitter,
        facebook: loading || !profile.social ? "" : profile.social.facebook,
        instagram: loading || !profile.social ? "" : profile.social.instagram,
        linkedin: loading || !profile.social ? "" : profile.social.linkedin,
        youtube: loading || !profile.social ? "" : profile.social.youtube,
      };
      setFormData(profileData);
    }
  }, [isAuthenticated, loading]);
  console.log(formData);
  return [formData, setFormData];
}
