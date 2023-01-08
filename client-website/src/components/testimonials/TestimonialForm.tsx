import React, { FormEvent, SetStateAction, useRef } from 'react';
import defaultImage from '../../assets/blank-profile.jpg';
import { selectIsLoading } from '../../redux/features/testimonials/testimonialSlice';
import { useAppSelector } from '../../redux/hooks';
import Button from '../utility/Button';
import Loading from '../utility/Loading';
type Customer = {
  name: string;
  message: string;
};
type TestimonialFormProps = {
  customer: Customer | null;
  customerImage: SetStateAction<string> | File;
  imagePreview: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveReview: (e: FormEvent<HTMLFormElement>) => void;
};
const TestimonialForm = ({ customer, customerImage, imagePreview, handleInputChange, handleImageChange, saveReview }: TestimonialFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isLoading = useAppSelector(selectIsLoading);
  return (
    <form onSubmit={saveReview} className="py-2">
      <div className="flex flex-col mb-5">
        {/* image */}
        <label className="mb-2">Customer Image:</label>
        <div>
          <code className="bg-gray-200 inline p-2 rounded-md">Supported Formats: jpg, jpeg, png and webp</code>
        </div>
        <img
          src={imagePreview ? imagePreview : defaultImage}
          width={200}
          height={200}
          alt="user-profile"
          className="mt-3 cursor-pointer hover:opacity-80 rounded-md"
          onClick={(e) => {
            e.preventDefault();
            fileInputRef.current?.click();
          }}
        />
        <p className="mb-6">Upload customer image</p>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={isLoading ? true : false} />
        <label>Name:</label>
        <input name="name" value={customer?.name || ''} onChange={handleInputChange} type="text" placeholder="Customer name" required />
        <label>Message:</label>
        <input name="message" value={customer?.message || ''} onChange={handleInputChange} type="text" placeholder="Customer message" maxLength={200} required />
      </div>
      <div className="mt-6">
        {isLoading ? (
          <Button>
            <Loading />
          </Button>
        ) : (
          <Button type="submit">Add customer review</Button>
        )}
      </div>
    </form>
  );
};

export default TestimonialForm;
