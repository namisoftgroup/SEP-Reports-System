import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ModalImage = ({
  isOpenImageModal,
  setIsOpenImageModal,
  selectedImage,
}) => {
  return (
    <Dialog open={isOpenImageModal} onOpenChange={setIsOpenImageModal}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Preview Image</DialogTitle>
        </DialogHeader>

        {selectedImage && (
          <img src={selectedImage} className="w-full h-auto rounded" />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalImage;
