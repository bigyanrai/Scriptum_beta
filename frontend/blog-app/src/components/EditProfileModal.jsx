import { useContext } from "react";
import { UserContext } from "../../src/context/userContext";
import Modal from "../components/Modal";
import EditProfile from "./Profile/EditProfile";

function EditProfileModal() {
  const { openEditProfile, setOpenEditProfile } = useContext(UserContext);

  return (
    <Modal
      isOpen={openEditProfile}
      onClose={() => setOpenEditProfile(false)}
      title="Edit Profile"
    >
      <EditProfile
        onClose={() => setOpenEditProfile(false)}
        onSuccess={() => {
          // You'll add fetchUser() here later if needed
        }}
      />
    </Modal>
  );
}

export default EditProfileModal;
