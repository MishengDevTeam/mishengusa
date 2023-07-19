import useRentNotiModal from '../hooks/useRentNotiModal';
import Modal from './Modal';

interface RentNotiModalProps {}

const RentNotiModal: React.FC<RentNotiModalProps> = ({}) => {
  const rentNotiModal = useRentNotiModal();
  return (
    <Modal
      isOpen={rentNotiModal.isOpen}
      onClose={rentNotiModal.onClose}
      title='ff'
      body={'ff'}
      footer={'ff'}
    />
  );
};
export default RentNotiModal;
