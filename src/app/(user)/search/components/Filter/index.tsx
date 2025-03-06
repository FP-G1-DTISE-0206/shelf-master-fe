import { FC, Dispatch, SetStateAction, useState, useCallback } from 'react';
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { SimpleProductReq } from '@/hooks/product/useSimpleProduct';
import useSimpleCategory from '@/hooks/category/useSimpleCategory';
import debounce from "lodash.debounce";

interface FilterComponentProps {
  productParams: SimpleProductReq;
  setProductParams: Dispatch<SetStateAction<SimpleProductReq>>;
}

const FilterComponent: FC<FilterComponentProps> = ({
  productParams,
  setProductParams,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [filter, setfilter] = useState<string>("");
  const { params, setParams, categories } = useSimpleCategory();

  const handleCategorySearch = useCallback(debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setParams({ ...params, search: e.target.value });
    }, 500), []);

  const handleCheckboxChange = (
    categoryId: number, 
    setCategoryState: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    setCategoryState((prev) => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId) 
        : [...prev, categoryId]
    );
  };

  return (
    <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-bold text-lg mb-4">Filters</h2>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-md font-semibold mb-2">Category</h3>
          <TextInput onChange={(e)=>handleCategorySearch(e)} />
        </div>
        <div className="grid grid-cols-1 gap-2">
        { categories?.length > 0 ? categories.map((filter) => (
            <Label key={filter.id} className="flex items-center space-x-2">
              <Checkbox 
                checked={selectedCategories.includes(filter.id)}
                onChange={() => handleCheckboxChange(filter.id, setSelectedCategories)}
              />
              <span>{filter.name}</span>
            </Label>)) : ("No categories found")}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Order By:</h3>
        <Select className="w-full" id="countries" defaultValue={""}
          onChange={(e)=>setfilter(e.target.value)}>
          <option value="" disabled>All</option>
          <option value="price,asc">Lower Price</option>
          <option value="price,desc">Higher Price</option>
          <option value="name,asc">Name (A-Z)</option>
          <option value="name,desc">Name (Z-A)</option>
        </Select>
      </div>
      <div className="mt-4 flex justify-start">
        <Button onClick={()=>{
            if(filter) {
              setProductParams({ ...productParams, categories: selectedCategories, 
                field: filter.split(",")[0], order: filter.split(",")[1] })
            } else {
              setProductParams({ ...productParams, categories: selectedCategories })
            }
          }}>
          Apply
        </Button>
      </div>
    </div>
  )
}

export default FilterComponent;