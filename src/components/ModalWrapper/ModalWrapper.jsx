import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../store/uiReducer";
import styles from "./ModalWrapper.module.css";

export default function ModalWrapper({ children }) {
  const modalActive = useSelector((state) => state.ui.modalActive);
  const dispatch = useDispatch();
  return (
    <div
      className={
        modalActive ? `${styles.modal} ${styles.active}` : styles.modal
      }
      onClick={() => dispatch(toggleModal())}
    >
      <div
        className={
          modalActive
            ? `${styles.modal_content} ${styles.active}`
            : styles.modal_content
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
