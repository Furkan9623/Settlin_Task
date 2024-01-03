import { Card, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleEntrie } from "../api/expenses-api";
import { toast } from "react-toastify";
function ViewCard({ id, setIsOpen }) {
  const [entry, setEntri] = useState({});
  //   const { id } = useParams();
  const singleEntry = async () => {
    const result = await singleEntrie(id);
    console.log(result);
    const error = result?.response?.data?.message;
    return result?.status === 200
      ? (toast.success("fetch single entry", { theme: "colored" }),
        setEntri(result?.data?.single_entry))
      : error
      ? toast.error(error)
      : toast.error(result?.message, { theme: "colored" });
  };
  useEffect(() => {
    singleEntry();
  }, []);
  return (
    <Card
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={
        entry?.category === "food"
          ? "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
          : "https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80"
      }
    >
      <h5 className="text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
        {entry?.title}
      </h5>
      <p className="font-normal text-center text-gray-700 dark:text-gray-400">
        Amount : ₹ {entry?.amount}
      </p>
      <p className="font-normal text-center text-gray-700 dark:text-gray-400">
        Date : {entry?.date}
      </p>
      <p className="font-normal text-center text-gray-700 dark:text-gray-400">
        Category : {entry?.category}
      </p>
      <Button
        gradientDuoTone="purpleToBlue"
        size="small"
        onClick={() => setIsOpen(false)}
      >
        CANCEL
      </Button>
    </Card>
  );
}

export default ViewCard;
