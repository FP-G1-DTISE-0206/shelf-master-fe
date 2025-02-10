import { BiteshipArea } from "@/types/biteship";
import { FC, useCallback } from "react";
import AsyncSelect from "react-select/async";
import debounce from "lodash.debounce";
import axios from "axios";

export interface AreaOption extends BiteshipArea {
  readonly value: string;
  readonly label: string;
}

const BiteshipSearch: FC = () => {
  const fetchAreas = async (inputValue: string): Promise<AreaOption[]> => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BITESHIP_URL}/v1/maps/areas`,
        {
          headers: {
            authorization: `Bearer ${process.env.NEXT_PUBLIC_BITESHIP_KEY}`,
          },
          params: {
            countries: "ID",
            input: inputValue,
            type: "single",
          },
        }
      );
      return (
        data?.areas?.map((a: BiteshipArea) => ({
          value: a.id,
          label: a.name,
          ...a,
        })) ?? []
      );
    } catch (error) {
      console.error("Error fetching areas:", error);
      return [];
    }
  };

  const debouncedFetch = useCallback(
    debounce(
      (inputValue: string, callback: (options: AreaOption[]) => void) => {
        fetchAreas(inputValue).then(callback);
      },
      500
    ),
    []
  );

  const handleChange = (selectedOption: AreaOption | null) => {
    console.log("Selected area:", selectedOption);
  };
  return (
    <div>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={debouncedFetch}
        onChange={handleChange}
      />
    </div>
  );
};
export default BiteshipSearch;
