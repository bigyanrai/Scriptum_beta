import { useContext } from "react";
import { UserContext } from "../../src/context/userContext";
import Modal from "../components/Modal";
import DeleteProfile from "./Profile/DeleteProfile";

function DeleteAccountModal() {
  const { openDeleteAccount, setOpenDeleteAccount } = useContext(UserContext);

  return (
    <Modal
      isOpen={openDeleteAccount}
      onClose={() => setOpenDeleteAccount(false)}
      title="Delete Account"
    >
      <DeleteProfile onClose={() => setOpenDeleteAccount(false)} />
    </Modal>
  );
}

export default DeleteAccountModal;
