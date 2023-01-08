import React, { FormEvent } from 'react';
import { selectIsLoading } from '../../redux/features/faq/faqSlice';
import { useAppSelector } from '../../redux/hooks';
import { Faq } from '../../ts/faqTypes';
import Button from '../utility/Button';
import Loading from '../utility/Loading';

type FaqFormProps = {
  faq: Faq | null | undefined;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveFaq: (e: FormEvent<HTMLFormElement>) => void;
};

const FaqForm = ({ faq, handleInputChange, saveFaq }: FaqFormProps) => {
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <form onSubmit={saveFaq} className="py-2">
      <div className="flex flex-col mb-5">
        <label>Question:</label>
        <input name="question" value={faq?.question} onChange={handleInputChange} type="text" placeholder="Question" required />
        <label>Answer:</label>
        <input name="answer" value={faq?.answer} onChange={handleInputChange} type="text" placeholder="Input answer" required />
      </div>
      <div className="mt-6">
        {isLoading ? (
          <Button>
            <Loading />
          </Button>
        ) : (
          <Button type="submit">Save frequently asked question</Button>
        )}
      </div>
    </form>
  );
};

export default FaqForm;
