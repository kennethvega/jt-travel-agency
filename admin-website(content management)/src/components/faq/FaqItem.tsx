import React, { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { deleteFaq, getAllFaqs } from '../../redux/features/faq/faqSlice';
import { useAppDispatch } from '../../redux/hooks';
import { FaqType } from '../../ts/faqTypes';
import Button from '../utility/Button';
import Modal from '../utility/Modal';

type FaqItemProps = {
  faq: FaqType;
};

const FaqItem = ({ faq }: FaqItemProps) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await dispatch(deleteFaq(faq._id));
    await dispatch(getAllFaqs());
  };
  return (
    <div className="p-2 bg-gray-200 mt-3 relative">
      <p>
        <span className="font-bold">Question:</span> {faq?.question}
      </p>
      <p>
        <span className="font-bold">Answer:</span> {faq?.answer}
      </p>
      <div className="flex gap-3 text-2xl absolute top-2 right-2">
        <Link to={`/edit-faq/${faq._id}`}>
          <TbEdit className="text-green-700 cursor-pointer" title="edit" />
        </Link>

        <div onClick={() => setOpenModal(true)}>
          <MdDeleteForever className="text-red-700 cursor-pointer" title="delete" />
        </div>
      </div>
      {openModal && (
        <Modal openModal={openModal} onClose={() => setOpenModal(false)}>
          <div className="flex flex-col gap-10">
            <h2 className="text-2xl font-semibold text-red-600">{`Are you sure you want to delete this FAQ?`}</h2>

            <Button onClick={handleDelete}>Delete</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FaqItem;
