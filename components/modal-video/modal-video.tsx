"use client";

import useModalVideo from "@/hooks/useModalVideo";
import Modal from "../modal/modal";
import ReactPlayer from "react-player/youtube";

const ModalVideo = () => {
  const { isOpen, onClose, videoKey } = useModalVideo();
  const onChange = async (open: boolean) => {
    if (!open) onClose();
  };
  return (
    <Modal isOpen={isOpen} onChange={onChange}>
      <div className='flex items-center justify-center relative'>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoKey}`}
          controls
          fullscreen={true}
          style={{ position: "absolute" }}
        />
      </div>
    </Modal>
  );
};

export default ModalVideo;
