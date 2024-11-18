// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { toast } from "@/components/ui/use-toast";

// const formSchema = z.object({
//   address: z.string().min(1, "Address is required"),
//   propertyType: z.string().min(1, "Property type is required"),
//   occupied: z.boolean(),
//   size: z.number().positive("Size must be a positive number"),
//   rooms: z
//     .number()
//     .int()
//     .positive("Number of rooms must be a positive integer"),
//   pricePerSqm: z
//     .number()
//     .positive("Price per square meter must be a positive number"),
//   rentPerMonth: z.number().positive("Rent per month must be a positive number"),
//   documents: z.array(z.string()).optional(),
//   tenants: z.array(z.string()),
// });

// type FormValues = z.infer<typeof formSchema>;

// export default function PropertyForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       address: "",
//       propertyType: "",
//       occupied: false,
//       size: 0,
//       rooms: 0,
//       pricePerSqm: 0,
//       rentPerMonth: 0,
//       documents: [],
//       tenants: [],
//     },
//   });

//   async function onSubmit(data: FormValues) {
//     setIsSubmitting(true);
//     try {
//       const response = await fetch("/api/properties", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to submit property data");
//       }

//       toast({
//         title: "Success",
//         description: "Property data has been saved.",
//       });
//       form.reset();
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast({
//         title: "Error",
//         description: "Failed to save property data. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="address"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Address</FormLabel>
//               <FormControl>
//                 <Input placeholder="123 Main St, City, Country" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="propertyType"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Property Type</FormLabel>
//               <FormControl>
//                 <Input placeholder="Apartment, House, etc." {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="occupied"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//               <FormControl>
//                 <Checkbox
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel>Occupied</FormLabel>
//                 <FormDescription>
//                   Is this property currently occupied?
//                 </FormDescription>
//               </div>
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="size"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Size (sqm)</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   {...field}
//                   onChange={(e) => field.onChange(+e.target.value)}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="rooms"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Number of Rooms</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   {...field}
//                   onChange={(e) => field.onChange(+e.target.value)}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="pricePerSqm"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Price per Square Meter</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   {...field}
//                   onChange={(e) => field.onChange(+e.target.value)}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="rentPerMonth"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Rent per Month</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   {...field}
//                   onChange={(e) => field.onChange(+e.target.value)}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="tenants"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Tenants (comma-separated)</FormLabel>
//               <FormControl>
//                 <Input
//                   {...field}
//                   onChange={(e) =>
//                     field.onChange(
//                       e.target.value.split(",").map((s) => s.trim())
//                     )
//                   }
//                 />
//               </FormControl>
//               <FormDescription>
//                 Enter tenant names separated by commas
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? "Saving..." : "Save Property"}
//         </Button>
//       </form>
//     </Form>
//   );
// }
