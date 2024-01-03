import ClipLoader from "react-spinners/ClipLoader";
import DotLoader from "react-spinners/DotLoader";
const Spinner = () => {
  return (
    <div className="flex h-96 gap-10 items-center justify-center">
      <DotLoader color="#d63636" />
      <ClipLoader color="#36d7b7" />
      <DotLoader color="#d68836" />
    </div>
  );
};
export default Spinner;
