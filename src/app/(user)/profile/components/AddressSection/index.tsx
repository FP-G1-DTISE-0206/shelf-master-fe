import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC } from "react";

const AddressSection: FC = () => {
  return (
    <div className="bg-shelf-white rounded-xl w-full">
      <div className="mx-6 my-6 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="text-lg font-medium text-shelf-black">Address</div>
          <Link
            href="/profile/create-address"
            className="text-lg font-medium text-shelf-white bg-shelf-blue rounded-lg py-1 px-2"
          >
            Create Address
          </Link>
        </div>

        <div className="border rounded-lg border-shelf-grey p-2 flex justify-between">
          <div>
            <div>John Doe</div>
            <div>+123456789</div>
            <div>123 Main St, Anytown, USA, 12345</div>
          </div>
          <FontAwesomeIcon icon={faCheck} className="text-shelf-orange " />
        </div>
        <div className="border rounded-lg border-shelf-light-grey p-2">
          <div>John Doe</div>
          <div>+123456789</div>
          <div>123 Main St, Anytown, USA, 12345</div>
        </div>
        <div className="border rounded-lg border-shelf-light-grey p-2">
          <div>John Doe</div>
          <div>+123456789</div>
          <div>123 Main St, Anytown, USA, 12345</div>
        </div>
      </div>
    </div>
  );
};
export default AddressSection;
