import { useState } from 'react';
import { TbEdit } from 'react-icons/tb';
import { MdDeleteForever } from 'react-icons/md';
import { ProductType } from '../../ts/productTypes';
import DOMPurify from 'dompurify';
import Modal from '../utility/Modal';
import Button from '../utility/Button';
import { deleteProduct, getAllProducts } from '../../redux/features/products/productSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Loading from '../utility/Loading';
import { Link } from 'react-router-dom';
type ProductItemProps = {
  product: ProductType;
};

const ProductItem = ({ product }: ProductItemProps) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.product);

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await dispatch(deleteProduct(product._id));
    await dispatch(getAllProducts());
  };

  return (
    <div className="mt-6 bg-gray-200 p-2 border rounded-md overflow-hidden word-break relative">
      <div className="grid product-grid">
        <img className="w-[250px] rounded-md xsm:w-[150px]" src={product?.image?.imageURL} />
        <div className="flex flex-col justify-between">
          <div className="">
            <h3>
              <span className="font-bold">Package:</span> {product?.country} | {product?.city} | {product?.price}
            </h3>
            <div className="flex gap-3 text-2xl absolute top-2 right-2">
              <Link to={`/edit-product/${product._id}`}>
                <TbEdit className="text-green-700 cursor-pointer" title="edit" />
              </Link>

              <div onClick={() => setOpenModal(true)}>
                <MdDeleteForever className="text-red-700 cursor-pointer" title="delete" />
              </div>
            </div>
          </div>

          <span className="font-bold">Description:</span>
          <div
            className="scrollbar"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description.substring(0, 200)),
            }}
          ></div>
          <p>
            <span className="font-bold">Tour Date:</span> {product?.date}
          </p>
        </div>
      </div>
      {openModal && (
        <Modal openModal={openModal} onClose={() => setOpenModal(false)}>
          <div className="flex flex-col gap-10">
            <h2 className="text-2xl font-semibold text-red-600">{`Are you sure you want to delete this product?`}</h2>
            <p className="text-xl font-semibold">
              {product?.country} | {product?.city} | {product?.price}
            </p>
            {isLoading ? (
              <Button>
                <Loading />
              </Button>
            ) : (
              <Button onClick={handleDelete}>Delete</Button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductItem;
