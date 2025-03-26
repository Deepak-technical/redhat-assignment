import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { characterSchema, Character } from "@/lib/schema";
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HouseAutocomplete } from "@/components/ui/house-autocomplete";
import { Badge } from "@/components/ui/badge";

interface CharacterFormProps {
  initialValues?: Partial<Character>;
  onSubmit: (values: Character) => void;
  onReset?: () => void;
  onCancel?: () => void;
}

export default function CharacterForm({
  initialValues = {},
  onSubmit,
  onReset,
  onCancel,
}: CharacterFormProps) {
  const form = useForm<Character>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: "",
      gender: undefined,
      born: undefined,
      died: undefined,
      allegiances: [],
      aliases: [],
      ...initialValues,
    },
  });

  const [currentAlias, setCurrentAlias] = useState("");

  const addAlias = () => {
    if (currentAlias) {
      const current = form.getValues("aliases") || [];
      if (!current.includes(currentAlias)) {
        form.setValue("aliases", [...current, currentAlias]);
        setCurrentAlias("");
      }
    }
  };

  const removeAlias = (alias: string) => {
    form.setValue(
      "aliases",
      form.getValues("aliases").filter(a => a !== alias)
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Character Information
        </CardTitle>
        <p className="text-sm text-gray-500">
          Fill out the form to create or update a character
        </p>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Character name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender Field */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gender *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Male" />
                          </FormControl>
                          <FormLabel className="font-normal">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Female" />
                          </FormControl>
                          <FormLabel className="font-normal">Female</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Other" />
                          </FormControl>
                          <FormLabel className="font-normal">Other</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="born"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Born</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="w-full pl-3 text-left font-normal"
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => date && field.onChange(date.toISOString())}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="died"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Died</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="w-full pl-3 text-left font-normal"
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => date && field.onChange(date.toISOString())}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Allegiances and Aliases - Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Allegiances */}
                <FormField
                  control={form.control}
                  name="allegiances"
                  render={() => (
                    <FormItem>
                      <FormLabel>Allegiances</FormLabel>
                      <div className="space-y-2">
                        <HouseAutocomplete
                          selectedHouses={form.watch("allegiances")}
                          onSelect={(house) => {
                            const current = form.getValues("allegiances") || [];
                            if (!current.includes(house)) {
                              form.setValue("allegiances", [...current, house]);
                            }
                          }}
                          onRemove={(house) => {
                            form.setValue(
                              "allegiances",
                              form.getValues("allegiances").filter(a => a !== house)
                            );
                          }}
                        />
                      
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Aliases */}
                <FormItem>
                  <FormLabel>Aliases</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={currentAlias}
                        onChange={(e) => setCurrentAlias(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAlias())}
                        placeholder="Add alias"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addAlias}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {form.watch("aliases").map((alias) => (
                        <Badge
                          key={alias}
                        //   variant="secondary"
                            variant="outline"
            className="cursor-pointer hover:bg-red-100"
                        //   className="px-3 py-1 text-sm"
                        >
                          {alias}
                          <span
                          
                            // type="button"
                            onClick={() => removeAlias(alias)}
                            // className="ml-2 text-gray-500 hover:text-red-500"
                          >
                            ×
                          </span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </FormItem>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  onReset?.();
                }}
              >
                Reset
              </Button>
              <Button type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}