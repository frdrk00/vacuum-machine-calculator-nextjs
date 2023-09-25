'use client'

import { Check, ChevronsUpDown, X } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import MainInput from './main-input';

interface FormValues {
  materials: {
    material: string;
    weight: string;
  }[];
  title: string;
}

export interface Material {
  id: string;
  type: string;
  title: string;
  weight: number;
}

const SelectorPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [materialTitle, setMaterialTitle] = useState('');
  const [materialWeight, setMaterialWeight] = useState('');
  const [materialId, setMaterialId] = useState('');

  const [materials, setMaterials] = useState<Material[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/materials');
      setMaterials(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<FormValues>({
    defaultValues: {
      materials: [
        {
          material: '',
          weight: '',
        },
      ],
      title: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'materials',
    control: form.control,
  });

  const onSubmit = async (data: FormValues) => {
    const toastData = {
      title: 'You submitted the following values:',
      description: data.materials.map((item, index) => {
        const selectedMaterial = materials.find(
          (material) => material.id === item.material
        );
        const materialTitle = selectedMaterial
          ? selectedMaterial.title
          : 'Unknown Material';
        const weight = item.weight ? `${item.weight} grams` : 'Unknown Weight';

        return (
          <div
            key={index}
            className="mt-2 w-[340px] rounded-md bg-slate-950 p-4"
          >
            <code className="text-white">
              Material {index + 1}: {materialTitle}, Weight: {weight}, _id: {item.material}
            </code>
          </div>
        );
      }),
    };

    try {
      setLoading(true);
      const postData = {
        title: recipeTitle,
        materials: data.materials.map((item) => ({
          title: materialTitle,
          weight: materialWeight,
          id: materialId, // Include the ID of the selected material
        })),
      };
      const response = await axios.post('/api/recipes', postData);

      form.reset();
      router.refresh();

      // Handle success response if needed
      console.log('Recipe created:', response.data);
    } catch (error) {
      console.log(error);
      // Handle error if needed
    } finally {
      setLoading(false);
      resetForm();
    }

    toast(toastData);
  };

  const resetForm = () => {
    form.reset({
      materials: [
        {
          material: '',
          weight: '',
        },
      ],
      title: '',
    });
    setRecipeTitle('');
    setMaterialTitle('');
    setMaterialWeight('');
    setMaterialId('');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
      >
        <FormLabel>Materials</FormLabel>
        <div className="flex flex-col w-full space-y-2">
          <MainInput
            onValueChange={(value) => {
              setRecipeTitle(value);
              form.setValue('title', value);
            }}
          />

          {fields.map((field, index) => (
            <div
              className="flex w-full justify-between space-x-2"
              key={field.id}
            >
              <FormField
                key={field.id}
                control={form.control}
                name={`materials.${index}.material` as const}
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <div className="flex space-x-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? materials.find(
                                    (material) => material.id === field.value
                                  )?.title
                                : 'Select material'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search material..." />
                            <CommandEmpty>No materials found.</CommandEmpty>
                            <CommandGroup>
                              {materials.map((material) => (
                                <CommandItem
                                  value={material.id}
                                  key={material.id}
                                  onSelect={() => {
                                    form.setValue(
                                      `materials.${index}.material` as const,
                                      material.id
                                    );
                                    setMaterialTitle(material.title);
                                    setMaterialWeight('');
                                    setMaterialId(material.id);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      material.id === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {material.title}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <div className="w-full flex justify-self-start text-center items-center">
                        <FormField
                          control={form.control}
                          name={`materials.${index}.weight` as const}
                          render={({ field }) => (
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter weight"
                                value={materialWeight}
                                onChange={(e) => {
                                  setMaterialWeight(e.target.value);
                                  field.onChange(e);
                                }}
                              />
                            </FormControl>
                          )}
                        />
                      </div>
                    </div>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    <X className="ml-[-6px] h-6 w-6 text-red" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => append({ material: '', weight: '' })}
            >
              Add Material
            </Button>
            <Button type="button" variant="destructive" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SelectorPage;