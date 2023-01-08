import { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { deleteTestimonial, getAllTestimonial, selectIsLoading } from '../../redux/features/testimonials/testimonialSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { CustomerType } from '../../ts/testimonialTypes';
import Button from '../utility/Button';
import Loading from '../utility/Loading';
import Modal from '../utility/Modal';
type TestimonialItemProps = {
  testimonial: CustomerType;
};
const TestimonialItem = ({ testimonial }: TestimonialItemProps) => {
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await dispatch(deleteTestimonial(testimonial._id));

    await dispatch(getAllTestimonial());
  };
  return (
    <div className="mt-3 bg-gray-200 p-2 rounded-md overflow-hidden word-break relative">
      <div className="absolute top-1 right-2 flex gap-3 text-2xl">
        <Link to={`/edit-customer-review/${testimonial._id}`}>
          <TbEdit className="text-green-700 cursor-pointer" title="edit" />
        </Link>

        <div onClick={() => setOpenModal(true)}>
          <MdDeleteForever className="text-red-700 cursor-pointer" title="delete" />
        </div>
      </div>
      <div className="flex gap-3 xmd:flex-col">
        <img src={testimonial?.image?.imageURL} className="w-20 rounded-full h-20" />
        <div>
          <h3>
            <span className="font-semibold">Name: </span> {testimonial?.name}
          </h3>
          <p>
            <span className="font-semibold">Message: </span> {testimonial?.message}
          </p>
        </div>
      </div>
      {openModal && (
        <Modal openModal={openModal} onClose={() => setOpenModal(false)}>
          <div className="flex flex-col gap-10">
            <h2 className="text-2xl font-semibold text-red-600">{`Are you sure you want to delete this customer review?`}</h2>

            <Button onClick={handleDelete}>Delete</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TestimonialItem;
