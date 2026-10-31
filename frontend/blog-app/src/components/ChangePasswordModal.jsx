import { useContext } from "react";
import { UserContext } from "../../src/context/userContext";
import Modal from "../components/Modal";

import ChangePassword from "./Profile/ChangePassword";

function ChangePasswordModal() {
  const { openChangePassword, setOpenChangePassword } = useContext(UserContext);

  return (
    <Modal
      isOpen={openChangePassword}
      onClose={() => setOpenChangePassword(false)}
      title="Change Password"
    >
      <ChangePassword onClose={() => setOpenChangePassword(false)} />
    </Modal>
  );
}

export default ChangePasswordModal;
