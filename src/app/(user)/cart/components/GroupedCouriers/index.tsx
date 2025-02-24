import { useState } from "react";
import { Pricing } from "@/types/biteship";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

type GroupedCouriersProps = {
  groupedCouriers: Record<string, Pricing[]>;
};

const GroupedCouriers: React.FC<GroupedCouriersProps> = ({
  groupedCouriers,
}) => {
  const [expandedCourier, setExpandedCourier] = useState<string | null>(null);

  const toggleExpand = (courierName: string) => {
    setExpandedCourier((prev) => (prev === courierName ? null : courierName));
  };

  return (
    <div className="mt-2 space-y-2">
      {Object.entries(groupedCouriers).map(([courierName, services]) => (
        <div key={courierName} className="border rounded-md p-3">
          <button
            onClick={() => toggleExpand(courierName)}
            className="w-full flex justify-between items-center text-left"
          >
            <span className="text-base font-semibold text-gray-800">
              {courierName}
            </span>
            {expandedCourier === courierName ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </button>

          {expandedCourier === courierName && (
            <div className="mt-2 space-y-2">
              {services.map((row, index) => (
                <div
                  key={index}
                  className="p-2 border rounded-md flex justify-between items-center cursor-pointer hover:bg-gray-100"
                >
                  <div className="text-sm text-gray-700">
                    {row.courier_service_name}
                  </div>
                  <div className="text-sm font-medium">{row.price}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GroupedCouriers;
